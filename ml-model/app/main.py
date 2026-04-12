from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import ChatRequest, ChatResponse
from app.chatbot_service import ask_chatbot

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