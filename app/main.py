# app/main.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
import os

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017'))
db = client['chat_app']
messages_collection = db['messages']

class Message(BaseModel):
    user: str
    text: str

@app.get("/messages")
async def get_messages():
    messages = list(messages_collection.find({}, {"_id": 0}))
    return messages

@app.post("/messages")
async def post_message(message: Message):
    messages_collection.insert_one(message.dict())
    return message

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message = Message(**eval(data))
            messages_collection.insert_one(message.dict())
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
