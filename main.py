
from fastapi import FastAPI, UploadFile, Form, File
from fastapi.responses import JSONResponse
import smtplib
from email.message import EmailMessage

app = FastAPI()

@app.post("/send_email")
async def send_email(email: str = Form(...), file: UploadFile = File(...)):
    try:
        msg = EmailMessage()
        msg["Subject"] = "Ваш протокол из Док Куриленко"
        msg["From"] = "yuliya-durnina@yandex.ru"
        msg["To"] = email
        msg.set_content("Здравствуйте! Во вложении — ваш протокол в формате PDF.

С уважением,
Куриленко Ю.С.")

        content = await file.read()
        msg.add_attachment(content, maintype="application", subtype="pdf", filename=file.filename)

        with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as smtp:
            smtp.login("yuliya-durnina@yandex.ru", "oayngkgxvyaylnre")
            smtp.send_message(msg)

        return JSONResponse(content={"message": f"Email sent to {email}"}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
