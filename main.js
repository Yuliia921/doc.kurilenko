
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
script.onload = () => {
    const { jsPDF } = window.jspdf;

    window.addEventListener("DOMContentLoaded", () => {
        const button = document.getElementById("generatePdfBtn");
        if (button) {
            button.addEventListener("click", () => {
                const form = document.getElementById("ultrasoundForm");
                const inputs = form.querySelectorAll("input, textarea");
                const doc = new jsPDF();
                let y = 10;

                doc.setFontSize(14);
                doc.text("🌸 УЗИ малого таза (беременность)", 10, y);
                y += 10;

                inputs.forEach(input => {
                    const label = input.name.charAt(0).toUpperCase() + input.name.slice(1);
                    const value = input.value || "-";
                    doc.text(doc.splitTextToSize(`${label}: ${value}`, 180), 10, y);
                    y += 8;
                });

                y += 5;
                doc.text("врач акушер-гинеколог Куриленко Юлия Сергеевна", 10, y);
                doc.save("uzi_beremennost.pdf");
            });
        }
    });
};
document.body.appendChild(script);
