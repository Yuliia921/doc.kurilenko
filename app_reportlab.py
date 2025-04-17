from fastapi import FastAPI, Form
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import os
from datetime import datetime

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

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
    pdf_path = "/mnt/data/consultation.pdf"
    c = canvas.Canvas(pdf_path, pagesize=A4)
    width, height = A4

    y = height - 50
    line_height = 20

    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(width / 2, y, "🌸 Консультативное заключение")

    c.setFont("Helvetica", 12)
    y -= line_height * 2
    c.drawString(50, y, f"ФИО: {full_name}")
    y -= line_height
    c.drawString(50, y, f"Возраст: {age}")
    y -= line_height
    c.drawString(50, y, f"Диагноз:")
    for line in diagnosis.splitlines():
        y -= line_height
        c.drawString(70, y, line)

    y -= line_height
    c.drawString(50, y, f"Обследование:")
    for line in examination.splitlines():
        y -= line_height
        c.drawString(70, y, line)

    y -= line_height
    c.drawString(50, y, f"Рекомендации:")
    for line in recommendations.splitlines():
        y -= line_height
        c.drawString(70, y, line)

    y -= line_height * 2
    c.drawString(50, y, "Врач Куриленко Ю.С.")
    y -= line_height
    c.drawString(50, y, "📞 +37455987715")
    y -= line_height
    c.drawString(50, y, "🔗 t.me/ginekolog_doc")

    y -= line_height
    date_str = datetime.now().strftime("%d.%m.%Y")
    c.drawString(50, y, f"Дата: {date_str}")

    c.save()
    return FileResponse(pdf_path, media_type="application/pdf", filename="consultation.pdf")
