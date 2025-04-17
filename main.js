
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

    let content = `🌸 УЗИ малого таза (беременность)\n\n`;
    content += `ФИО: ${fio}\n`;
    content += `Последняя менструация: ${lmp}\n\n`;

    content += `Описание:\n`;
    content += `Матка: ${uterus}\n`;
    content += `В полости матки визуализируется плодное яйцо, ВДЯ ${gestationalSac} мм.\n`;
    content += `В нем эмбрион, КТР ${crl} мм, что соответствует сроку ${term} недель.\n`;
    content += `Желточный мешок: ${yolkSac} мм.\n`;
    content += `Сердцебиение: ${heartbeat}.\n`;
    content += `ЧСС: ${hr} в мин., ритмичное.\n`;
    content += `Хорион расположен: ${chorion}.\n`;
    content += `Желтое тело: ${corpusLuteum} мм.\n\n`;

    content += `Дополнение: ${additional}\n\n`;
    content += `Заключение: ${conclusion}\n\n`;
    content += `Рекомендации: ${recommendations}\n\n`;

    content += `врач акушер-гинеколог Куриленко Юлия Сергеевна`;

    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    if (confirm("Открыть PDF в новой вкладке? (Отмена — скачать)")) {
        window.open(url, "_blank");
    } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = "uzi_beremennost.pdf";
        link.click();
    }
});
