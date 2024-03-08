from pydantic import BaseModel
from typing import Optional
from .device import Device


class User(BaseModel):
    _id: Optional[str]
    username: str
    password: str


class UserDeviceData(BaseModel):
    user: User
    device: Device
