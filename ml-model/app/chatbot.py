from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM

# Load embedding model
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Load DB
db = Chroma(
    persist_directory="../vectorstore/chroma_db",
    embedding_function=embedding
)

retriever = db.as_retriever(search_kwargs={"k": 3})

# Load LLM
llm = OllamaLLM(model="llama3")

#add memory list
chat_history = []

while True:
    query = input("You: ").strip()

    if query.lower() in ["exit", "quit"]:
        break

    docs = retriever.invoke(query)
    context = "\n\n".join([doc.page_content for doc in docs])

    # 🧠 include chat history
    history_text = "\n".join(chat_history[-4:])  # last 2 exchanges

    prompt = f"""
You are a Sri Lankan tourism assistant.

Chat history:
{history_text}

Context:
{context}

Question:
{query}
"""

    response = llm.invoke(prompt)

    print("Bot:", response)

    # ✅ store conversation
    chat_history.append(f"User: {query}")
    chat_history.append(f"Bot: {response}")



#run first = $env:OLLAMA_NO_GPU=1