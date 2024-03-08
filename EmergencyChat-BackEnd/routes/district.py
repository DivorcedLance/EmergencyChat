from config.db import db
from fastapi import APIRouter

dist = APIRouter()


@dist.get("/districts")
async def get_districts():
    return await db.districts.find()
