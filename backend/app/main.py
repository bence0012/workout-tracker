from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .routes.routes import Router
from starlette.concurrency import iterate_in_threadpool




server = FastAPI()
server.include_router(Router)

origins = [
    "http://localhost:8000",
    "http://192.168.0.15:8000"
]

server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@server.middleware("http")
async def middleware(request: Request, call_next):
    try:
        req_body = await request.json()
    except Exception:
        req_body = None

    response = await call_next(request)

    res_body = [section async for section in response.body_iterator]
    response.body_iterator = iterate_in_threadpool(iter(res_body))
    return response
