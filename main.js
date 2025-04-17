
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
script.onload = async () => {
    const { jsPDF } = window.jspdf;

    const fontUrl = "https://unpkg.com/pdf-lib-fontkit@0.0.4/fonts/dejavu/DejaVuSans.ttf";
    const fontResponse = await fetch(fontUrl);
    const fontData = await fontResponse.arrayBuffer();

    document.getElementById("ultrasoundForm").addEventListener("submit", async function (e) {
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
        doc.setFontSize(12);
        doc.text("врач акушер-гинеколог Куриленко Юлия Сергеевна", 10, y);

        doc.save("uzi_beremennost.pdf");
    });
};
document.body.appendChild(script);
