from fastapi import APIRouter, Response, status, HTTPException
from config.db import db
from schemas.user import *
from models.user import *
from models.device import Device
from passlib.hash import sha256_crypt
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
from .device import *
from schemas.district import *

user = APIRouter()


@user.get("/find-all", response_model=list[User], tags=["Users"])
def find_all_users():
    return usersEntity(db.users.find())


@user.post("/sign-up", tags=["Users"])
async def create_user(data: UserDeviceData):
    user = data.user
    new_user = dict(user)
    new_user["password"] = sha256_crypt.encrypt(new_user["password"])
    dev = {}
    try:
        id = db.users.insert_one(new_user).inserted_id
        dev = await process_device(data.device, str(id))
        if not dev:
            return HTTPException(status_code=404, detail="Device not created")
    except:
        return HTTPException(status_code=404, detail="User not created")
    try:
        user_r = db.users.find_one({"_id": id})
    except:
        return HTTPException(status_code=404, detail="User not created")
    return userDeviceEntity(user_r, dev)


@user.get("/find-user/{id}", response_model=User, tags=["Users"])
def find_user(_id: str):
    return userEntity(db.users.find_one({"_id": ObjectId(_id)}))


@user.put("/update-user/{id}", response_model=User, tags=["Users"])
def update_user(id: str, user: User):
    user.password = sha256_crypt.encrypt(user.password)
    db.users.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(user)})
    return userEntity(db.users.find_one({"_id": ObjectId(id)}))


@user.delete(
    "/delete-user/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Users"]
)
def delete_user(_id: str):
    db.users.find_one_and_delete({"_id": ObjectId(_id)})
    delete_devices(_id)
    return Response(status_code=HTTP_204_NO_CONTENT)


@user.post("/sign-in", tags=["Users"])
async def sign_in(username: str, password: str, device: Device):
    user = db.users.find_one({"username": username})
    div = {}
    if user:
        div = await process_device(device, str(user["_id"]))
        if not div:
            return HTTPException(status_code=404, detail="Device not created")
        if sha256_crypt.verify(password, user["password"]):
            return userDeviceEntity(user, div)
    return HTTPException(status_code=404, detail="User not found or password incorrect")


@user.get("/find_all_districts", tags=["Users"])
def get_districts():
    return districtsEntity(db.districts.find())



def getTokensFromDistric(distric_id):
    data = db.devices.find({"district_id": distric_id})
    tokens = []
    for d in data:
        tokens.append(sha256_crypt.decrypt(d["device_token"]))
    return tokens

    

