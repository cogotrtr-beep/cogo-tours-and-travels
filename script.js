function buildMessage(name, phone, email, plan) {
  return `Hi Cogo Tours & Travels 😊

I would like to enquire about a trip.

Name: ${name}
Phone: ${phone}
${email ? "Email: " + email : ""}

Travel Plan:
${plan}

Please share package details.`;
}

/* ================= MODAL FORM ================= */
const sendEmailBtn = document.getElementById("sendEmailBtn");
const modalWhatsAppBtn = document.getElementById("modalWhatsAppBtn");

sendEmailBtn?.addEventListener("click", () => {
  const name = document.getElementById("mName").value;
  const phone = document.getElementById("mPhone").value;
  const email = document.getElementById("mEmail").value;
  const plan = document.getElementById("mPlan").value;

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

modalWhatsAppBtn?.addEventListener("click", () => {
  const name = document.getElementById("mName").value;
  const phone = document.getElementById("mPhone").value;
  const email = document.getElementById("mEmail").value;
  const plan = document.getElementById("mPlan").value;

  const msg = buildMessage(name, phone, email, plan);
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});

/* ================= BOTTOM FORM ================= */
const bottomEmailBtn = document.getElementById("bottomSendEmailBtn");
const bottomWhatsAppBtn = document.getElementById("bottomWhatsAppBtn");

bottomEmailBtn?.addEventListener("click", () => {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const email = document.getElementById("contactEmail").value;
  const plan = document.getElementById("contactPlan").value;

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

bottomWhatsAppBtn?.addEventListener("click", () => {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const email = document.getElementById("contactEmail").value;
  const plan = document.getElementById("contactPlan").value;

  const msg = buildMessage(name, phone, email, plan);
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});
function buildMessage(name, phone, email, plan) {
  return `Hi Cogo Tours & Travels 😊

I would like to enquire about a trip.

Name: ${name}
Phone: ${phone}
${email ? "Email: " + email : ""}

Travel Plan:
${plan}

Please share package details.`;
}

/* ================= MODAL FORM ================= */
const sendEmailBtn = document.getElementById("sendEmailBtn");
const modalWhatsAppBtn = document.getElementById("modalWhatsAppBtn");

sendEmailBtn?.addEventListener("click", () => {
  const name = document.getElementById("mName").value;
  const phone = document.getElementById("mPhone").value;
  const email = document.getElementById("mEmail").value;
  const plan = document.getElementById("mPlan").value;

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

modalWhatsAppBtn?.addEventListener("click", () => {
  const name = document.getElementById("mName").value;
  const phone = document.getElementById("mPhone").value;
  const email = document.getElementById("mEmail").value;
  const plan = document.getElementById("mPlan").value;

  const msg = buildMessage(name, phone, email, plan);
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});
/* ===============================
   BOTTOM FORM → EMAIL + WHATSAPP
================================= */

document.addEventListener("DOMContentLoaded", function () {

  const emailBtn = document.getElementById("bottomSendEmailBtn");
  const waBtn = document.getElementById("bottomWhatsAppBtn");

  if (emailBtn) {
    emailBtn.addEventListener("click", function () {
      const name = document.getElementById("contactName")?.value || "";
      const phone = document.getElementById("contactPhone")?.value || "";
      const email = document.getElementById("contactEmail")?.value || "";
      const plan = document.getElementById("contactPlan")?.value || "";

      const subject = "New Travel Enquiry - Cogo Tours";

      const body =
`Hi Cogo Tours & Travels,

I would like to enquire about a trip.

Name: ${name}
Phone: ${phone}
Email: ${email}

Travel Plan:
${plan}

Please share package details.`;

      window.location.href =
        "mailto:cogotrtr@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }

  if (waBtn) {
    waBtn.addEventListener("click", function () {
      const name = document.getElementById("contactName")?.value || "";
      const phone = document.getElementById("contactPhone")?.value || "";
      const email = document.getElementById("contactEmail")?.value || "";
      const plan = document.getElementById("contactPlan")?.value || "";

      const msg =
`Hi Cogo Tours & Travels 😊

I would like to enquire about a trip.

Name: ${name}
Phone: ${phone}
Email: ${email}

Travel Plan:
${plan}

Please share package details.`;

      window.open(
        "https://wa.me/919884066830?text=" + encodeURIComponent(msg),
        "_blank"
      );
    });
  }

});

