document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     BOTTOM TRAVEL ENQUIRY FORM
  ================================= */

  const emailBtn = document.getElementById("bottomSendEmailBtn");
  const whatsappBtn = document.getElementById("bottomWhatsAppBtn");

  function getFormData() {
    return {
      name: document.getElementById("contactName")?.value.trim() || "",
      phone: document.getElementById("contactPhone")?.value.trim() || "",
      email: document.getElementById("contactEmail")?.value.trim() || "",
      plan: document.getElementById("contactPlan")?.value.trim() || ""
    };
  }

  function buildMessage({ name, phone, email, plan }) {
    return `Hi Cogo Tours & Travels 😊

I would like to enquire about a trip.

Name: ${name}
Phone: ${phone}
${email ? "Email: " + email : ""}

Travel Plan:
${plan}

Please share package details.`;
  }

  /* 📧 EMAIL BUTTON */
  if (emailBtn) {
    emailBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const data = getFormData();
      const subject = "New Travel Enquiry - Cogo Tours";
      const body = buildMessage(data);

      const mailURL =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=cogotrtr@gmail.com" +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.open(mailURL, "_blank");
    });
  }

  /* 💬 WHATSAPP BUTTON */
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const data = getFormData();
      const message = buildMessage(data);

      const waURL =
        "https://wa.me/919884066830?text=" + encodeURIComponent(message);

      window.open(waURL, "_blank");
    });
  }

});
