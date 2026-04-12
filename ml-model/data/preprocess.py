import json

def load_data(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def create_text(place):
    name = place.get("name", "")
    category = place.get("category", "")
    description = place.get("description", "").strip()
    highlights = ", ".join(place.get("highlights", []))
    activities = ", ".join(place.get("activities", []))
    location = place.get("location", "")
    rating = place.get("averageRating", 0)
    reviews = place.get("reviews", [])
    best_time = place.get("bestTime", "")
    cost = place.get("cost_per_person(USD)", 0)

    text = f"{name} is a {category} located in {location}. "

    if description:
        text += f"{description} "

    if highlights:
        text += f"Highlights include {highlights}. "

    if activities:
        text += f"Activities include {activities}. "

    if best_time:
        text += f"The best time to visit is {best_time}. "

    if cost:
        text += f"The average cost per person is {cost} USD. "

    if rating:
        text += f"It has an average rating of {rating}. "

    if reviews:
        text += "Visitor reviews mention: " + ", ".join(reviews[:2]) + ". "

    return text.strip()

def preprocess(data):
    processed = []

    for place in data:
        text = create_text(place)

        processed.append({
            "id": place.get("place_id"),
            "text": text,
            "metadata": {
                "name": place.get("name"),
                "category": place.get("category"),
                "location": place.get("location"),
                "bestTime": place.get("bestTime"),
                "cost_per_person": place.get("cost_per_person(USD)", 0),
                "averageRating": place.get("averageRating", 0)
            }
        })

    return processed

def save_data(data, file_path):
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    input_file = "places.json"
    output_file = "processed_places.json"

    data = load_data(input_file)
    processed = preprocess(data)
    save_data(processed, output_file)

    print("✅ Preprocessing complete!")