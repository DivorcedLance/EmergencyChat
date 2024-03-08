from config.db import db
from fastapi import APIRouter

dist = APIRouter()


@dist.get("/districts")
def get_districts():
    return db.districts.find()
