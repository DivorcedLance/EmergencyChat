from fastapi import APIRouter, Response, status, HTTPException
from config.db import db
from schemas.user import userEntity, usersEntity
from models.user import User
from passlib.hash import sha256_crypt
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT

user = APIRouter()


@user.get("/find-all", response_model=list[User], tags=["Users"])
def find_all_users():
    return usersEntity(db.users.find())


@user.post("/sing-up", response_model=User, tags=["Users"])
def create_user(user: User):
    new_user = dict(user)
    new_user["password"] = sha256_crypt.encrypt(new_user["password"])
    try:
        id = db.users.insert_one(new_user).inserted_id
    except:
        return {"message": "Error: User not created"}
    try:
        user_r = db.users.find_one({"_id": id})
    except:
        return {"message": "Error: User not found"}
    return userEntity(user_r)


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
    userEntity(db.users.find_one_and_delete({"_id": ObjectId(_id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)


@user.get("/sing-in", tags=["Users"])
def sing_in(username: str, password: str):
    user = db.users.find_one({"username": username})
    if user:
        if sha256_crypt.verify(password, user["password"]):
            return userEntity(user)
    return HTTPException(status_code=404, detail="User not found or password incorrect")
