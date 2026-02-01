/* ===============================
   STICKY NAVBAR + HIDE TOP BUTTONS
================================ */
const nav = document.getElementById("mainNav");
const callBtn = document.querySelector(".call-link");
const planBtn = document.querySelector(".plan-btn-top");

window.addEventListener("scroll", () => {
  if (!nav) return;

  if (window.scrollY > 120) {
    nav.classList.add("sticky");
    callBtn && (callBtn.style.opacity = "0");
    planBtn && (planBtn.style.opacity = "0");
  } else {
    nav.classList.remove("sticky");
    callBtn && (callBtn.style.opacity = "1");
    planBtn && (planBtn.style.opacity = "1");
  }
});


/* ===============================
   OPEN / CLOSE TRAVEL ENQUIRY MODAL
================================ */
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
   HELPER → BUILD MESSAGE
================================ */
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
   MODAL → EMAIL + WHATSAPP
================================ */
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
   BOTTOM FORM → EMAIL + WHATSAPP
================================ */
document.getElementById("bottomSendEmailBtn")?.addEventListener("click", () => {
  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(
    contactName.value,
    contactPhone.value,
    contactEmail.value,
    contactPlan.value
  );

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("bottomWhatsAppBtn")?.addEventListener("click", () => {
  const msg = buildMessage(
    contactName.value,
    contactPhone.value,
    contactEmail.value,
    contactPlan.value
  );

  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});
