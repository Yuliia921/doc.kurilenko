from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fpdf import FPDF
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/generate")
async def generate(
    full_name: str = Form(...),
    age: str = Form(...),
    diagnosis: str = Form(...),
    examination: str = Form(...),
    recommendations: str = Form(...)
):
    pdf = FPDF()
    pdf.add_page()
    pdf.add_font("DejaVu", "", "fonts/DejaVuSans.ttf", uni=True)
    pdf.set_font("DejaVu", "", 14)

    pdf.cell(0, 10, "🌸 Консультативное заключение", ln=True, align="C")
    pdf.ln(10)
    pdf.multi_cell(0, 10, f"ФИО: {full_name}")
    pdf.multi_cell(0, 10, f"Возраст: {age}")
    pdf.multi_cell(0, 10, f"Диагноз: {diagnosis}")
    pdf.multi_cell(0, 10, f"Обследование: {examination}")
    pdf.multi_cell(0, 10, f"Рекомендации: {recommendations}")
    pdf.ln(10)
    pdf.cell(0, 10, "Врач Куриленко Ю.С.", ln=True)
    pdf.cell(0, 10, "📞 +37455987715", ln=True)
    pdf.cell(0, 10, "🔗 t.me/ginekolog_doc", ln=True)

    output_path = "/mnt/data/consultation.pdf"
    pdf.output(output_path)

    return FileResponse(output_path, media_type='application/pdf', filename="consultation.pdf")
