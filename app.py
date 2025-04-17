from fastapi import FastAPI, Form
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os
from datetime import datetime

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

# Подключаем основной шрифт
pdfmetrics.registerFont(TTFont("DejaVu", "fonts/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "fonts/DejaVuSans.ttf"))

@app.get("/", response_class=HTMLResponse)
async def read_form():
    with open("index.html", "r", encoding="utf-8") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)

@app.post("/generate")
async def generate(
    full_name: str = Form(...),
    age: str = Form(...),
    diagnosis: str = Form(...),
    examination: str = Form(...),
    recommendations: str = Form(...)
):
    pdf_path = "consultation.pdf"
    c = canvas.Canvas(pdf_path, pagesize=A4)
    width, height = A4

    y = height - 40
    line_height = 16

    def draw_title(text):
        nonlocal y
        c.setFont("DejaVu-Bold", 16)
        c.drawCentredString(width / 2, y, text)
        y -= line_height * 1.5

    def draw_label(label):
        nonlocal y
        c.setFont("DejaVu-Bold", 12)
        c.drawString(50, y, label)
        underline_len = c.stringWidth(label, "DejaVu-Bold", 12)
        c.line(50, y - 2, 50 + underline_len, y - 2)
        y -= line_height

    def draw_text_block(text):
        nonlocal y
        c.setFont("DejaVu", 12)
        for line in text.splitlines():
            c.drawString(70, y, line)
            y -= line_height
        y -= 4  # отступ

    draw_title("Консультативное заключение")

    draw_label("ФИО")
    c.setFont("DejaVu", 12)
    c.drawString(70, y, full_name)
    y -= line_height * 1.2

    draw_label("Возраст")
    c.drawString(70, y, age)
    y -= line_height * 1.2

    draw_label("Диагноз")
    draw_text_block(diagnosis)

    draw_label("Обследование")
    draw_text_block(examination)

    draw_label("Рекомендации")
    draw_text_block(recommendations)

    y -= line_height * 1.5
    c.setFont("DejaVu", 12)
    c.drawString(50, y, "Врач Куриленко Ю.С.")
    y -= line_height
    c.drawString(50, y, "Телефон: +37455987715")
    y -= line_height
    c.drawString(50, y, "Telegram: t.me/ginekolog_doc")
    y -= line_height
    c.drawString(50, y, f"Дата: {datetime.now().strftime('%d.%m.%Y')}")

    c.save()
    return FileResponse(pdf_path, media_type="application/pdf", filename="consultation.pdf")
