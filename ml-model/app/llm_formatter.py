from langchain_ollama import OllamaLLM

llm = OllamaLLM(model="llama3")


def format_itinerary_with_llm(user_input: dict, selected_places: list, itinerary: list) -> str:
    place_names = [p["name"] for p in selected_places]

    prompt = f"""
You are a Sri Lanka tour planning assistant.

Create a short, clear recommendation summary for this trip.

User details:
- Days: {user_input['days']}
- People: {user_input['people']}
- Budget level: {user_input['budget_level']}
- Travel pace: {user_input['travel_pace']}
- Preferences: {", ".join(user_input['preferences'])}
- Must visit places: {", ".join(user_input['must_visit_places'])}

Selected places:
{place_names}

Day-by-day itinerary:
{itinerary}

Write:
1. A short trip summary
2. Why these places match the user's needs
3. Keep it easy to read
"""
    return llm.invoke(prompt)