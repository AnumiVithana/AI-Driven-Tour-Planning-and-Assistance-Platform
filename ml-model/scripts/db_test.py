from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings()

db = Chroma(
    persist_directory="../vectorstore/chroma_db",
    embedding_function=embedding
)

results = db.similarity_search("best beaches in Sri Lanka", k=1)

for r in results:
    print(r.page_content)
    print(r.metadata)
    print("------")