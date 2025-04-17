
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
script.onload = () => {
    const { jsPDF } = window.jspdf;

    document.getElementById("ultrasoundForm").addEventListener("submit", function (e) {
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
        doc.text("🌸 УЗИ малого таза (беременность)", 10, y);
        y += 10;

        writeBlock("ФИО", formData.get("fio"));
        writeBlock("Последняя менструация", formData.get("lmp"));
        writeBlock("Матка", formData.get("uterus"));
        writeBlock("Плодное яйцо (ВДЯ)", formData.get("gestationalSac") + " мм");
        writeBlock("КТР", formData.get("crl") + " мм");
        writeBlock("Срок", formData.get("term") + " недель");
        writeBlock("Желточный мешок", formData.get("yolkSac") + " мм");
        writeBlock("Сердцебиение", formData.get("heartbeat"));
        writeBlock("ЧСС", formData.get("hr") + " в мин.");
        writeBlock("Хорион", formData.get("chorion"));
        writeBlock("Желтое тело", formData.get("corpusLuteum") + " мм");
        writeBlock("Дополнение", formData.get("additional"));
        writeBlock("Заключение", formData.get("conclusion"));
        writeBlock("Рекомендации", formData.get("recommendations"));

        y += 10;
        doc.setFont("Helvetica", "bold");
        doc.text("врач акушер-гинеколог Куриленко Юлия Сергеевна", 10, y);

        doc.save("uzi_beremennost.pdf");
    });
};
document.body.appendChild(script);
