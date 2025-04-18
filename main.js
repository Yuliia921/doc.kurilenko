
document.getElementById("emailForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch("/send_email", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    alert(result.message || result.error);
});
