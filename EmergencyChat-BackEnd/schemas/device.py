from models.device import Device


def deviceEntity(item) -> dict:
    return {
        "_id": str(item["_id"]),
        "district": item["district"],
        "latitude": item["latitude"],
        "longitude": item["longitude"],
        "device_token": item["device_token"],
        "user_id": item["user_id"],
        "district_id": item["district_id"],
    }


def devicesEntity(entity) -> list:
    return [deviceEntity(item) for item in entity]
