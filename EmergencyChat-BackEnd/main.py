from fastapi import FastAPI
from routes.user import user
from config.docs import tags_metadata
from starlette.middleware.cors import CORSMiddleware
from routes.device import device

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
