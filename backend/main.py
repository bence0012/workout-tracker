from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.routes import Router


server = FastAPI()
server.include_router(Router)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000",
]

server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
