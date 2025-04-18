
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateConsultation");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const form = document.getElementById("consultationForm");
    const inputs = form.querySelectorAll("input, textarea");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
    doc.setFont("helvetica");
    doc.setFontSize(14);
    doc.text("🌸 Консультативное заключение", 10, y);
    y += 10;
    inputs.forEach(input => {
      const label = input.previousElementSibling?.textContent || input.name;
      const value = input.value || "-";
      doc.text(doc.splitTextToSize(`${label}: ${value}`, 180), 10, y);
      y += 8;
    });
    y += 5;
    doc.text("врач акушер-гинеколог Куриленко Юлия Сергеевна", 10, y);
    doc.save("consultation.pdf");
  });
});
