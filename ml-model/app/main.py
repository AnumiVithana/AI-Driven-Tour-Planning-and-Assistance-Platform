from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import ChatRequest, ChatResponse, RecommendRequest, RecommendResponse, RecommendedPlace, DayPlan
from app.chatbot_service import ask_chatbot
from app.recommender import recommend_places
from app.planner import build_itinerary
from app.llm_formatter import format_itinerary_with_llm

#how to run the fastapi backend
  #$env:OLLAMA_NO_GPU=1 (only if needed)
  #ollama run llama3 "hello"
  #venv/Scripts/activate(activate VENV)
  #uvicorn app.main:app --reload(Run fastAPI backend)



app = FastAPI(title="Sri Lanka Tourism Chatbot API")

# Allow Spring Boot / frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later, replace with your real frontend/backend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Sri Lanka Tourism Chatbot API is running"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        result = ask_chatbot(
            question=request.question,
            chat_history=request.chat_history
        )
        return ChatResponse(
            answer=result["answer"],
            sources=result["sources"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend", response_model=RecommendResponse)
def recommend_trip(request: RecommendRequest):
    try:
        user_input = request.model_dump()

        selected_places = recommend_places(user_input)
        itinerary = build_itinerary(
            selected_places=selected_places,
            days=user_input["days"],
            travel_pace=user_input["travel_pace"]
        )
        summary = format_itinerary_with_llm(user_input, selected_places, itinerary)

        response_places = [
            RecommendedPlace(
                name=place["name"],
                category=place["category"],
                location=place["location"],
                averageRating=float(place.get("averageRating", 0) or 0),
                estimated_cost_per_person=float(place.get("cost_per_person(USD)", 0) or 0),
                score=float(place["final_score"])
            )
            for place in selected_places
        ]

        response_itinerary = [
            DayPlan(
                day=item["day"],
                places=item["places"],
                note=item["note"]
            )
            for item in itinerary
        ]

        return RecommendResponse(
            summary=summary,
            selected_places=response_places,
            itinerary=response_itinerary
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))