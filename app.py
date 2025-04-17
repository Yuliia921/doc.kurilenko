
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

app.mount("/", StaticFiles(directory=".", html=True), name="static")

@app.get("/")
async def get_index():
    return FileResponse("index.html")

@app.get("/pregnancy.html")
async def get_pregnancy():
    return FileResponse("pregnancy.html")

@app.get("/consultation.html")
async def get_consultation():
    return FileResponse("consultation.html")

@app.get("/main.js")
async def get_main_js():
    return FileResponse("main.js")

@app.get("/consultation.js")
async def get_consultation_js():
    return FileResponse("consultation.js")

@app.get("/styles.css")
async def get_styles():
    return FileResponse("styles.css")

@app.get("/fonts/DejaVuSans.ttf")
async def get_font():
    return FileResponse("fonts/DejaVuSans.ttf")
