from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from routes.user import user
from config.docs import tags_metadata
from starlette.middleware.cors import CORSMiddleware
from routes.device import device

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.active_connections:
            self.active_connections[room] = []
        self.active_connections[room].append(websocket)

        

        await self.broadcast(f"A new client has joined the room {room}", room)

    def disconnect(self, websocket: WebSocket, room: str):
        self.active_connections[room].remove(websocket)
        if not self.active_connections[room]:
            del self.active_connections[room]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, room: str):
        for connection in self.active_connections[room]:
            await connection.send_text(message)


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
    await manager.connect(websocket, room)
    try: 
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client #{client_id} says: {data}", room)
    except WebSocketDisconnect:
        manager.disconnect(websocket, room)
        await manager.broadcast(f"Client #{client_id} has left the chat", room)
