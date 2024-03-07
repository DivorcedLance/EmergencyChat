def userEntity(item) -> dict:
    return {
        "_id": str(item["_id"]),
        "username": item["username"],
        "password": item["password"],
    }


def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]
