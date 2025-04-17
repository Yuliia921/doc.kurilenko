
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
script.onload = async () => {
    const { jsPDF } = window.jspdf;

    const fontUrl = "https://unpkg.com/pdf-lib-fontkit@0.0.4/fonts/dejavu/DejaVuSans.ttf";
    const fontResponse = await fetch(fontUrl);
    const fontData = await fontResponse.arrayBuffer();

    document.getElementById("consultationForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const doc = new jsPDF();
        const font = await doc.addFileToVFS("DejaVuSans.ttf", fontData);
        doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
        doc.setFont("DejaVuSans");
        let y = 10;

        function writeBlock(label, value) {
            doc.setFont("DejaVuSans", "normal");
            doc.setFontSize(12);
            doc.text(label + ":", 10, y);
            y += 6;
            const lines = doc.splitTextToSize(value || "-", 180);
            doc.text(lines, 10, y);
            y += lines.length * 6 + 2;
        }

        doc.setFontSize(14);
        doc.text("🌸 Консультативное заключение", 10, y);
        y += 10;

        writeBlock("Дата", formData.get("date"));
        writeBlock("ФИО", formData.get("fio"));
        writeBlock("Возраст", formData.get("age"));
        writeBlock("Диагноз", formData.get("diagnosis"));
        writeBlock("Обследование", formData.get("examination"));
        writeBlock("Рекомендации", formData.get("recommendations"));

        y += 10;
        doc.setFontSize(12);
        doc.text("врач акушер-гинеколог Куриленко Юлия Сергеевна", 10, y);

        doc.save("consultation.pdf");
    });
};
document.body.appendChild(script);
