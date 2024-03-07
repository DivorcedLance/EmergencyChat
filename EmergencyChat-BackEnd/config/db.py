from pymongo import MongoClient
from pymongo.server_api import ServerApi

USER = "UserPy"
PASSWORD = "UserPy"
URI = f"mongodb+srv://{USER}:{PASSWORD}@cluster0.vy3lxkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

DATABASE_NAME = "EmergencyChat"

conn = MongoClient(URI, server_api=ServerApi("1"))
db = conn.get_database(DATABASE_NAME)
