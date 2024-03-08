from fastapi import APIRouter, Response, status, HTTPException
from config.db import db
from schemas.device import deviceEntity, devicesEntity
from models.device import Device
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
from passlib.hash import sha256_crypt
from config.location import locate_device_d

device = APIRouter()


@device.get("/{user_id}/devices", response_model=list[Device], tags=["Devices"])
def find_all_devices(user_id: str):
    return devicesEntity(db.devices.find({"user_id": user_id}))


async def process_device(device: Device, user_id: str):
    try:
        device_r = db.devices.find_one(
            {"device_token": sha256_crypt.encrypt(device.device_token)}
        )
        if device_r:
            device.district = await locate_device_d(device.latitude, device.longitude)
            if device.district == "NOT IN ANY DISTRICT":
                return None
            device._id = device_r["_id"]
            device.user_id = user_id
            return update_device(device._id, device)
        return await register_device(device, user_id)
    except:
        return None


def update_device(id: str, device: Device):
    db.devices.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(device)})
    return db.devices.find_one({"_id": ObjectId(id)})


async def register_device(device: Device, user_id: str):
    device.district = await locate_device_d(device.latitude, device.longitude)
    if device.district == "NOT IN ANY DISTRICT":
        return None
    device.user_id = user_id
    device.device_token = sha256_crypt.encrypt(device.device_token)
    try:
        id = db.devices.insert_one(dict(device)).inserted_id
    except:
        return None
    return db.devices.find_one({"_id": id})


def delete_devices(user_id: str):
    db.devices.delete_many({"user_id": user_id})


@device.delete("/sign-out", status_code=status.HTTP_204_NO_CONTENT, tags=["Devices"])
def delete_device(device_token: str):
    data = db.devices.find()
    for d in data:
        if sha256_crypt.verify(device_token, d["device_token"]):
            dev = db.devices.find_one_and_delete({"_id": d["_id"]})
            return Response(status_code=HTTP_204_NO_CONTENT)
    return HTTPException(status_code=404, detail="Device not found")
