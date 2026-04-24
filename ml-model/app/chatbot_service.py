from pathlib import Path
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM

BASE_DIR = Path(__file__).resolve().parent.parent
VECTOR_DB_DIR = BASE_DIR / "vectorstore" / "chroma_db"

# Load once at startup
embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = Chroma(
    persist_directory=str(VECTOR_DB_DIR),
    embedding_function=embedding
)

retriever = db.as_retriever(search_kwargs={"k": 3})
llm = OllamaLLM(model="llama3")


def format_history(chat_history):
    if not chat_history:
        return ""

    lines = []
    for item in chat_history[-6:]:
        role = item.get("role", "user")
        content = item.get("content", "")
        lines.append(f"{role.capitalize()}: {content}")
    return "\n".join(lines)


def ask_chatbot(question: str, chat_history=None):
    chat_history = chat_history or []

    docs = retriever.invoke(question)
    context = "\n\n".join(doc.page_content for doc in docs)
    history_text = format_history(chat_history)

    prompt = f"""
You are a helpful Sri Lankan tourism assistant.

Keep your answer short, concise, and no longer than 2 to 3 sentences.
Use only the provided context to answer.
If the answer is not available in the context, say you do not have enough information.

Conversation history:
{history_text}

Context:
{context}

Question:
{question}
"""

    answer = llm.invoke(prompt)

    sources = []
    for doc in docs:
        sources.append({
            "name": doc.metadata.get("name"),
            "category": doc.metadata.get("category"),
            "location": doc.metadata.get("location"),
            "bestTime": doc.metadata.get("bestTime"),
            "cost_per_person": doc.metadata.get("cost_per_person"),
            "averageRating": doc.metadata.get("averageRating"),
        })

    return {
        "answer": answer,
        "sources": sources
    }