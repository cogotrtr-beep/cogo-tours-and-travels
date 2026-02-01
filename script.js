/* ===============================
   OPEN / CLOSE ENQUIRY MODAL
================================= */
const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryBtn = document.getElementById("openEnquiryModal");
const closeEnquiryBtn = document.getElementById("closeEnquiryModal");

openEnquiryBtn?.addEventListener("click", () => {
  enquiryModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

closeEnquiryBtn?.addEventListener("click", closeEnquiry);
enquiryModal?.addEventListener("click", e => { if (e.target === enquiryModal) closeEnquiry(); });

function closeEnquiry() {
  enquiryModal.classList.remove("show");
  document.body.style.overflow = "";
}


/* ===============================
   COMMON MESSAGE BUILDER
================================= */
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


/* ===============================
   MODAL FORM BUTTONS
================================= */
document.getElementById("modalSendEmailBtn")?.addEventListener("click", () => {
  const name = mName.value;
  const phone = mPhone.value;
  const email = mEmail.value;
  const plan = mPlan.value;

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("modalWhatsAppBtn")?.addEventListener("click", () => {
  const msg = buildMessage(mName.value, mPhone.value, mEmail.value, mPlan.value);
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});


/* ===============================
   BOTTOM FORM BUTTONS
================================= */
document.getElementById("bottomSendEmailBtn")?.addEventListener("click", () => {
  const name = contactName.value;
  const phone = contactPhone.value;
  const email = contactEmail.value;
  const plan = contactPlan.value;

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("bottomWhatsAppBtn")?.addEventListener("click", () => {
  const msg = buildMessage(contactName.value, contactPhone.value, contactEmail.value, contactPlan.value);
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});
/* =================================
   🌍 TRAVEL ENQUIRY – GLOBAL LOGIC
================================= */

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

/* ===============================
   📩 EMAIL FROM MODAL
================================= */
document.getElementById("modalSendEmailBtn")?.addEventListener("click", () => {
  const name = document.getElementById("mName").value;
  const phone = document.getElementById("mPhone").value;
  const email = document.getElementById("mEmail").value;
  const plan = document.getElementById("mPlan").value;

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* ===============================
   📲 WHATSAPP FROM MODAL
================================= */
document.getElementById("modalWhatsAppBtn")?.addEventListener("click", () => {
  const name = document.getElementById("mName").value;
  const phone = document.getElementById("mPhone").value;
  const email = document.getElementById("mEmail").value;
  const plan = document.getElementById("mPlan").value;

  const msg = buildMessage(name, phone, email, plan);

  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});

/* ===============================
   📩 EMAIL FROM BOTTOM FORM
================================= */
document.getElementById("bottomSendEmailBtn")?.addEventListener("click", () => {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const email = document.getElementById("contactEmail").value;
  const plan = document.getElementById("contactPlan").value;

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* ===============================
   📲 WHATSAPP FROM BOTTOM FORM
================================= */
document.getElementById("bottomWhatsAppBtn")?.addEventListener("click", () => {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const email = document.getElementById("contactEmail").value;
  const plan = document.getElementById("contactPlan").value;

  const msg = buildMessage(name, phone, email, plan);

  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});

