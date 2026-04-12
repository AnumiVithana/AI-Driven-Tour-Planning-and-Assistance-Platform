import json
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

# Load processed data
def load_data(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

# Main function
def build_vector_db():
    data = load_data("../data/processed_places.json")

    texts = []
    metadatas = []
    ids = []

    for item in data:
        texts.append(item["text"])
        metadatas.append(item["metadata"])
        ids.append(str(item["id"]))

    # Load embedding model
    embedding = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    # Create Chroma DB
    db = Chroma.from_texts(
        texts=texts,
        embedding=embedding,
        metadatas=metadatas,
        ids=ids,
        persist_directory="../vectorstore/chroma_db"
    )

#     db.persist()
    print("✅ Vector DB created successfully!")

if __name__ == "__main__":
    build_vector_db()