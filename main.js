
// Подключение библиотеки jsPDF через CDN
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
script.onload = () => {
    const { jsPDF } = window.jspdf;

    document.getElementById("ultrasoundForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        const fio = formData.get("fio");
        const lmp = formData.get("lmp");
        const uterus = formData.get("uterus");
        const gestationalSac = formData.get("gestationalSac");
        const crl = formData.get("crl");
        const term = formData.get("term");
        const yolkSac = formData.get("yolkSac");
        const heartbeat = formData.get("heartbeat");
        const hr = formData.get("hr");
        const chorion = formData.get("chorion");
        const corpusLuteum = formData.get("corpusLuteum");
        const additional = formData.get("additional");
        const conclusion = formData.get("conclusion");
        const recommendations = formData.get("recommendations");

        const doc = new jsPDF();
        let y = 10;

        doc.setFont("Helvetica", "bold");
        doc.text("🌸 УЗИ малого таза (беременность)", 10, y);
        y += 10;

        doc.setFont("Helvetica", "normal");
        doc.text(`ФИО: ${fio}`, 10, y); y += 8;
        doc.text(`Последняя менструация: ${lmp}`, 10, y); y += 8;
        doc.text("Описание:", 10, y); y += 8;
        doc.text(`Матка: ${uterus}`, 10, y); y += 8;
        doc.text(`Плодное яйцо (ВДЯ): ${gestationalSac} мм`, 10, y); y += 8;
        doc.text(`КТР: ${crl} мм`, 10, y); y += 8;
        doc.text(`Срок: ${term} недель`, 10, y); y += 8;
        doc.text(`Желточный мешок: ${yolkSac} мм`, 10, y); y += 8;
        doc.text(`Сердцебиение: ${heartbeat}`, 10, y); y += 8;
        doc.text(`ЧСС: ${hr} в мин.`, 10, y); y += 8;
        doc.text(`Хорион: ${chorion}`, 10, y); y += 8;
        doc.text(`Желтое тело: ${corpusLuteum} мм`, 10, y); y += 8;

        doc.text("Дополнение:", 10, y); y += 8;
        doc.text(`${additional}`, 10, y); y += 10;
        doc.text("Заключение:", 10, y); y += 8;
        doc.text(`${conclusion}`, 10, y); y += 10;
        doc.text("Рекомендации:", 10, y); y += 8;
        doc.text(`${recommendations}`, 10, y); y += 10;

        doc.setFont("Helvetica", "bold");
        doc.text("врач акушер-гинеколог Куриленко Юлия Сергеевна", 10, y);

        doc.save("uzi_beremennost.pdf");
    });
};
document.body.appendChild(script);
