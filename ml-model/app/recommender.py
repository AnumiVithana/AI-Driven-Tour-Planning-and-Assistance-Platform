import json
from pathlib import Path
from typing import List, Dict

BASE_DIR = Path(__file__).resolve().parent.parent
PLACES_FILE = BASE_DIR / "data" / "places.json"


def load_places() -> List[Dict]:
    with open(PLACES_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def normalize_text_list(values):
    return [str(v).strip().lower() for v in values if str(v).strip()]


def build_place_search_text(place: Dict) -> str:
    name = place.get("name", "")
    category = place.get("category", "")
    description = place.get("description", "")
    highlights = ", ".join(place.get("highlights", []))
    activities = ", ".join(place.get("activities", []))
    location = place.get("location", "")
    reviews = " ".join(place.get("reviews", [])[:2])

    return (
        f"{name} is a {category} destination in {location}. "
        f"{description} "
        f"Highlights include {highlights}. "
        f"Activities include {activities}. "
        f"Visitor reviews mention {reviews}."
    ).strip()


def get_budget_match_score(user_budget: str, cost: float) -> float:
    if user_budget == "low":
        if cost <= 10:
            return 1.0
        if cost <= 20:
            return 0.5
        return 0.0

    if user_budget == "medium":
        if cost <= 30:
            return 1.0
        if cost <= 40:
            return 0.6
        return 0.2

    if user_budget == "high":
        return 1.0

    return 0.0




from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

VECTOR_DB_DIR = BASE_DIR / "vectorstore" / "chroma_db"

embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vector_db = Chroma(
    persist_directory=str(VECTOR_DB_DIR),
    embedding_function=embedding
)


def build_semantic_query(preferences: List[str], budget_level: str, travel_pace: str) -> str:
    prefs = ", ".join(preferences)
    return (
        f"Sri Lanka tour places for {prefs}. "
        f"Budget level is {budget_level}. "
        f"Travel pace is {travel_pace}."
    )


def get_semantic_scores(preferences: List[str], budget_level: str, travel_pace: str) -> Dict[str, float]:
    query = build_semantic_query(preferences, budget_level, travel_pace)
    docs = vector_db.similarity_search_with_score(query, k=15)

    semantic_scores = {}
    for doc, distance in docs:
        name = doc.metadata.get("name")
        similarity = max(0.0, 1.0 - float(distance))
        if name:
            semantic_scores[name.lower()] = similarity

    return semantic_scores



def get_preference_match_score(place: Dict, preferences: List[str]) -> float:
    preferences_lower = normalize_text_list(preferences)

    searchable_parts = []
    searchable_parts.append(place.get("category", ""))
    searchable_parts.extend(place.get("activities", []))
    searchable_parts.extend(place.get("highlights", []))
    searchable_parts.append(place.get("description", ""))

    searchable_text = " ".join(str(x).lower() for x in searchable_parts)

    matches = 0
    for pref in preferences_lower:
        if pref in searchable_text:
            matches += 1

    if not preferences_lower:
        return 0.0

    return matches / len(preferences_lower)


def get_must_visit_bonus(place: Dict, must_visit_places: List[str]) -> float:
    must_visit_lower = normalize_text_list(must_visit_places)
    place_name = str(place.get("name", "")).strip().lower()

    if place_name in must_visit_lower:
        return 1.0
    return 0.0


def get_rating_score(place: Dict) -> float:
    rating = float(place.get("averageRating", 0) or 0)
    return min(rating / 5.0, 1.0)

def score_place(place: Dict, user_input: Dict, semantic_scores: Dict[str, float]) -> float:
    preference_score = get_preference_match_score(place, user_input["preferences"])
    budget_score = get_budget_match_score(user_input["budget_level"], float(place.get("cost_per_person(USD)", 0) or 0))
    rating_score = get_rating_score(place)
    must_visit_bonus = get_must_visit_bonus(place, user_input["must_visit_places"])
    semantic_score = semantic_scores.get(place.get("name", "").lower(), 0.0)

    final_score = (
        0.40 * preference_score +
        0.20 * budget_score +
        0.15 * rating_score +
        0.15 * semantic_score +
        0.10 * must_visit_bonus
    )

    return round(final_score, 4)


#Select top places

from app.planner import get_total_places


def recommend_places(user_input: Dict) -> List[Dict]:
    places = load_places()
    semantic_scores = get_semantic_scores(
        preferences=user_input["preferences"],
        budget_level=user_input["budget_level"],
        travel_pace=user_input["travel_pace"]
    )

    scored_places = []
    for place in places:
        score = score_place(place, user_input, semantic_scores)
        place_copy = dict(place)
        place_copy["final_score"] = score
        scored_places.append(place_copy)

    scored_places.sort(key=lambda x: x["final_score"], reverse=True)

    total_places = get_total_places(user_input["days"], user_input["travel_pace"])
    return scored_places[:total_places]