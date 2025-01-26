from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from sentence_transformers import SentenceTransformer
from qdrant_client.http.models import PointStruct
import uuid

qdrant_client = None
encoder = None


def qdrant_init():
    global qdrant_client, encoder
    VECTOR_SIZE = 384

    qdrant_client = QdrantClient(port=6333, host="127.0.0.1")

    encoder = SentenceTransformer("all-MiniLM-L6-v2")

    try:
        qdrant_client.create_collection(
            collection_name="documents",
            vectors_config=VectorParams(size=VECTOR_SIZE, distance=Distance.COSINE),
        )
    except Exception as e:
        pass


def add_vector(id: int, description: str) -> None:
    global qdrant_client, encoder
    if qdrant_client is None:
        qdrant_init()
    vector = encoder.encode(description)
    vector = PointStruct(id=str(uuid.uuid4()), vector=vector, payload={"id": id})
    qdrant_client.upsert(collection_name="documents", wait=True, points=[vector])


def search_vector(query: str) -> int:
    print(">>>> search: ", query)
    global qdrant_client, encoder
    if qdrant_client is None:
        qdrant_init()
    vector = encoder.encode(query)
    print(">>>> vector: ", vector)
    response = qdrant_client.search(
        collection_name="documents", query_vector=vector, limit=1
    )
    print(">>>> response: ", response, response[0].payload["id"])
    return response[0].payload["id"]
