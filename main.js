
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
script.onload = () => {
    const { jsPDF } = window.jspdf;

    window.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("ultrasoundForm");
        if (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                const formData = new FormData(this);
                const doc = new jsPDF();
                let y = 10;

                doc.setFontSize(14);
                doc.text("🌸 УЗИ малого таза (беременность)", 10, y);
                y += 10;

                for (const [key, value] of formData.entries()) {
                    const line = key.charAt(0).toUpperCase() + key.slice(1) + ": " + value;
                    doc.text(doc.splitTextToSize(line, 180), 10, y);
                    y += 8;
                }

                y += 5;
                doc.text("врач акушер-гинеколог Куриленко Юлия Сергеевна", 10, y);
                doc.save("uzi_beremennost.pdf");
            });
        }
    });
};
document.body.appendChild(script);
