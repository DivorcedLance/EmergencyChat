from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from routes.user import user
from config.docs import tags_metadata
from starlette.middleware.cors import CORSMiddleware
from routes.device import device

import json

app = FastAPI(
    title="EmergencyChat-BackEnd",
    description="EmergencyChat-BackEnd API",
    version="0.1.0",
    openapi_tags=tags_metadata,
)

app.include_router(user)
app.include_router(device)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.active_connections:
            self.active_connections[room] = []
        self.active_connections[room].append(websocket)

    def disconnect(self, websocket: WebSocket, room: str):
        self.active_connections[room].remove(websocket)
        if not self.active_connections[room]:
            del self.active_connections[room]

    async def conectionActions(self, data: dict, room: str):
        print("conectionActions", data)
        await self.broadcast({
            "event": "connection",
            "username": data["sesion"]["usuario"]["username"],
            "client_id": data["sesion"]["usuario"]["id"],
            "room": room
        }, room)

    async def disconectionActions(self, data: dict, room: str):
        print("disconectionActions", data)
        await  self.broadcast({
            "event": "disconnection",
            "username": data["sesion"]["usuario"]["username"],
            "client_id": data["sesion"]["usuario"]["id"],
            "room": room
        }, room)

    async def messageActions(self, data: dict, room: str):
        print("messageActions", data)
        await self.broadcast({
            "event": "message",
            "username": data["sesion"]["usuario"]["username"],
            "client_id": data["sesion"]["usuario"]["id"],
            "message": data["message"],
            "room": room
        }, room)
        print("messageActionsF")

    async def send_personal_message(self, data: dict, websocket: WebSocket):
        await websocket.send_json(data)

    async def broadcast(self, data: dict, room: str):
        print("broadcast: ", data)
        for connection in self.active_connections[room]:
            await connection.send_json(data)

manager = ConnectionManager()

@app.websocket("/ws/{room}")
async def websocket_endpoint(websocket: WebSocket, room: str):
    await manager.connect(websocket, room)
    try:
        while True:
            data = await websocket.receive_json()
            if data["event"] == "message":
                await manager.messageActions(data, room)
            elif data["event"] == "connection":
                await manager.conectionActions(data, room)
                
    except WebSocketDisconnect:
        manager.disconnect(websocket, room)
        await manager.disconectionActions(data, room)