from fastapi import FastAPI
from routes.user import user
from config.docs import tags_metadata

app = FastAPI(
    title="EmergencyChat-BackEnd",
    description="EmergencyChat-BackEnd API",
    version="0.1.0",
    openapi_tags=tags_metadata,
)

app.include_router(user)
