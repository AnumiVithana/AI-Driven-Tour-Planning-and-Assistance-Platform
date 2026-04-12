from pydantic import BaseModel
from typing import List, Dict, Any


class ChatRequest(BaseModel):
    question: str
    chat_history: List[Dict[str, str]] = []


class ChatResponse(BaseModel):
    answer: str
    sources: List[Dict[str, Any]] = []