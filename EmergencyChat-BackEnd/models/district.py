from pydantic import BaseModel
from typing import Optional


class District(BaseModel):
    id: Optional[str]
    name: str
