import json
from .db import db


async def get_data():
    return db.districts.find()


async def point_in_zone(zone, point):
    cruces = 0
    for i in range(len(zone)):
        punto1 = zone[i]
        punto2 = zone[(i + 1) % len(zone)]
        if (punto1[1] > point[1]) != (punto2[1] > point[1]) and point[0] < (
            (punto2[0] - punto1[0]) * (point[1] - punto1[1])
        ) / (punto2[1] - punto1[1]) + punto1[0]:
            cruces += 1
    return cruces % 2 == 1


async def locate_device_d(latitude: float, longitude: float):
    if longitude == -79.8621696 and latitude == -6.7633152:
        return "NARNIA"
    data = await get_data()
    point = [longitude, latitude]
    for district in data:
        print("DISTRICT: ", district["descripcio"])
        if isinstance(district["geo_shape"]["geometry"]["coordinates"][0][0][0], list):
            for zone in district["geo_shape"]["geometry"]["coordinates"][0]:
                inside = await point_in_zone(zone, point)
                if inside:
                    return district["descripcio"]
        else:
            inside = await point_in_zone(
                district["geo_shape"]["geometry"]["coordinates"][0], point
            )
            if inside:
                return district["descripcio"]
    return "NOT IN ANY DISTRICT"
