
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Обслуживаем все файлы из текущей директории (где index.html, js, css и т.д.)
app.mount("/", StaticFiles(directory=".", html=True), name="static")
