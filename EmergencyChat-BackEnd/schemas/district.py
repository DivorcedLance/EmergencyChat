def districtEntity(item) -> dict:
    return {
        "_id": str(item["_id"]),
        "name": item["nombdist"],
    }


def districtsEntity(entity):
    return [districtEntity(item) for item in entity]
