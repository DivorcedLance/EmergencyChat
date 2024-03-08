from pydantic import BaseModel
from typing import Optional


class Device(BaseModel):
    _id: Optional[str]
    district: Optional[str] = None
    latitude: float
    longitude: float
    device_token: str
    district_id: Optional[str] = None
    user_id: Optional[str] = None
