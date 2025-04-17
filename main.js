document.getElementById("ultrasoundForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    let content = "🌸 УЗИ беременных\n\n";
    for (let [key, value] of formData.entries()) {
        content += key.charAt(0).toUpperCase() + key.slice(1) + ": " + value + "\n";
    }
    content += "\nврач акушер-гинеколог Куриленко Юлия Сергеевна";

    const blob = new Blob([content], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "uzi_beremennost.pdf";
    link.click();
});
