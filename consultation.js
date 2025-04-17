
document.getElementById("consultationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const date = formData.get("date");
    const fio = formData.get("fio");
    const age = formData.get("age");
    const diagnosis = formData.get("diagnosis");
    const examination = formData.get("examination");
    const recommendations = formData.get("recommendations");

    let content = `🌸 Консультативное заключение\n\n`;
    content += `Дата: ${date}\n`;
    content += `ФИО: ${fio}\n`;
    content += `Возраст: ${age}\n`;
    content += `Диагноз: ${diagnosis}\n\n`;
    content += `Обследование: ${examination}\n\n`;
    content += `Рекомендации: ${recommendations}\n\n`;
    content += `врач акушер-гинеколог Куриленко Юлия Сергеевна`;

    const blob = new Blob([content], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "consultation.pdf";
    link.click();
});
