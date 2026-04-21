from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional, Literal


class ChatRequest(BaseModel):
    question: str
    chat_history: List[Dict[str, str]] = []


class ChatResponse(BaseModel):
    answer: str
    sources: List[Dict[str, Any]] = []



class RecommendRequest(BaseModel):
    days: int = Field(..., ge=1, le=30)
    people: int = Field(..., ge=1, le=20)
    budget_level: Literal["low", "medium", "high"]
    travel_pace: Literal["relaxed", "balanced", "fast-paced"]
    preferences: List[str] = Field(default_factory=list)
    must_visit_places: List[str] = Field(default_factory=list)


class RecommendedPlace(BaseModel):
    name: str
    category: str
    location: str
    averageRating: float
    estimated_cost_per_person: float
    score: float


class DayPlan(BaseModel):
    day: int
    places: List[str]
    note: str


class RecommendResponse(BaseModel):
    summary: str
    selected_places: List[RecommendedPlace]
    itinerary: List[DayPlan]