from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    _id: Optional[str]
    username: str
    password: str
