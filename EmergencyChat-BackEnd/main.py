from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from routes.user import user
from config.docs import tags_metadata
from starlette.middleware.cors import CORSMiddleware
from routes.device import device
import json

import json

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, room: str, client_id: str):
        await websocket.accept()
        if room not in self.active_connections:
            self.active_connections[room] = []
        self.active_connections[room].append(websocket)
        # On connect actions
        await self.broadcast({
            "event": "connection",
            "room": room,
            "client": client_id,
            "message": f"Client #{client_id} has joined the room {room}"
        }, room)

    def disconnect(self, websocket: WebSocket, room: str, client_id: str):
        self.active_connections[room].remove(websocket)
        if not self.active_connections[room]:
            del self.active_connections[room]
        # On disconnect actions
        self.broadcast({
            "event": "disconnection",
            "room": room,
            "client": client_id,
            "message": f"Client #{client_id} has left the room {room}"
        }, room)

    async def send_personal_message(self, data: dict, websocket: WebSocket):
        await websocket.send_json(data)

    async def broadcast(self, data: dict, room: str):
        for connection in self.active_connections[room]:
            await connection.send_json(data)



manager = ConnectionManager()

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

@app.websocket("/ws/{room}/{client_id}")
async def websocket_endpoint(websocket: WebSocket, room: str, client_id: str):
    await manager.connect(websocket, room, client_id)
    try:
        while True:
            data = await websocket.receive_json()
            data["event"] = "message"
            data["room"] = room
            data["client"] = client_id
            await manager.broadcast(data, room)
    except WebSocketDisconnect:
        manager.disconnect(websocket, room, client_id)
