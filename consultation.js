
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
script.onload = () => {
    const { jsPDF } = window.jspdf;

    document.getElementById("consultationForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const doc = new jsPDF();
        let y = 10;

        function writeBlock(label, value) {
            doc.setFont("Helvetica", "bold");
            doc.text(label, 10, y);
            y += 6;
            doc.setFont("Helvetica", "normal");
            doc.text(doc.splitTextToSize(value || "-", 180), 10, y);
            y += doc.getTextDimensions(value || "-").h + 4;
        }

        doc.setFont("Helvetica", "bold");
        doc.text("🌸 Консультативное заключение", 10, y);
        y += 10;

        writeBlock("Дата", formData.get("date"));
        writeBlock("ФИО", formData.get("fio"));
        writeBlock("Возраст", formData.get("age"));
        writeBlock("Диагноз", formData.get("diagnosis"));
        writeBlock("Обследование", formData.get("examination"));
        writeBlock("Рекомендации", formData.get("recommendations"));

        y += 10;
        doc.setFont("Helvetica", "bold");
        doc.text("врач акушер-гинеколог Куриленко Юлия Сергеевна", 10, y);

        doc.save("consultation.pdf");
    });
};
document.body.appendChild(script);
