def get_places_per_day(travel_pace: str) -> float:
    if travel_pace == "relaxed":
        return 1.0
    if travel_pace == "balanced":
        return 1.5
    return 2.0


def get_total_places(days: int, travel_pace: str) -> int:
    places_per_day = get_places_per_day(travel_pace)
    return max(1, round(days * places_per_day))


#Build day-by-day itinerary in Python

from typing import List, Dict


def build_itinerary(selected_places: List[Dict], days: int, travel_pace: str) -> List[Dict]:
    itinerary = []
    if not selected_places:
        return itinerary

    places_per_day = get_places_per_day(travel_pace)

    index = 0
    for day in range(1, days + 1):
        daily_places = []

        if travel_pace == "relaxed":
            if index < len(selected_places):
                daily_places.append(selected_places[index]["name"])
                index += 1

        elif travel_pace == "balanced":
            for _ in range(2 if day % 2 == 1 else 1):
                if index < len(selected_places):
                    daily_places.append(selected_places[index]["name"])
                    index += 1

        else:
            for _ in range(2):
                if index < len(selected_places):
                    daily_places.append(selected_places[index]["name"])
                    index += 1

        if not daily_places and selected_places:
            daily_places.append(selected_places[-1]["name"])

        itinerary.append({
            "day": day,
            "places": daily_places,
            "note": f"Day {day} is planned as a {travel_pace} travel day."
        })

    return itinerary