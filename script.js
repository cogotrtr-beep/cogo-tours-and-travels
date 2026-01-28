/* ===============================
   GLOBAL HELPERS
================================ */
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return document.querySelectorAll(sel); }

/* ===============================
   BACK TO TOP
================================ */
const topBtn = qs("#topBtn");
if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });
  topBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

/* ===============================
   STICKY NAVBAR
================================ */
window.addEventListener("scroll", () => {
  const nav = qs("#mainNav");
  if (!nav) return;
  window.scrollY > 120 ? nav.classList.add("sticky") : nav.classList.remove("sticky");
});

/* Hide top CTA buttons on scroll */
const callBtn = qs(".call-link");
const planBtn = qs(".plan-btn-top");
window.addEventListener("scroll", () => {
  const hide = window.scrollY > 120;
  callBtn?.classList.toggle("hide-cta", hide);
  planBtn?.classList.toggle("hide-cta", hide);
});

/* ===============================
   HAMBURGER
================================ */
const hamburgerBtn = qs("#hamburgerBtn");
const navLinks = qs("#navLinks");
if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open");
    hamburgerBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
  });
}

/* ===============================
   TOUR FILTER
================================ */
qsa(".filter-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    qsa(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    qsa(".tour-card").forEach(card=>{
      const cat = card.dataset.category;
      card.classList.toggle("hide", filter!=="all" && cat!==filter);
    });
  });
});

/* ===============================
   WHATSAPP (PACKAGE CARDS)
================================ */
qsa(".wa-quote").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const place = btn.dataset.place || "Tour Package";
    const days = btn.dataset.days || "";
    const price = btn.dataset.price || "";
    const msg =
`Hi Cogo Tours 😊

I am interested in *${place}*
${days ? "Duration: "+days : ""}
${price ? "Price: "+price : ""}

Please share full itinerary & best offer.`;

    window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`,"_blank");
  });
});

/* ===============================
   VIEW DETAILS MODAL
================================ */
const detailsModal = qs("#detailsModal");
if(detailsModal){
  const title = qs("#detailsTitle");
  const desc = qs("#detailsDescription");
  const iti = qs("#detailsItinerary");

  qsa(".details-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      title.textContent = btn.dataset.title || "Package Details";
      desc.textContent = btn.dataset.description || "";
      iti.innerHTML = (btn.dataset.itinerary||"").replace(/\n/g,"<br>");
      detailsModal.classList.add("show");
      document.body.style.overflow="hidden";
    });
  });

  qs(".details-close")?.addEventListener("click",closeDetails);
  qs(".details-backdrop")?.addEventListener("click",closeDetails);
  function closeDetails(){
    detailsModal.classList.remove("show");
    document.body.style.overflow="";
  }
}

/* ===============================
   ENQUIRY POPUP MODAL
================================ */
const enquiryModal = qs("#enquiryModal");
qs("#openEnquiryModal")?.addEventListener("click",()=> enquiryModal.classList.add("show"));
qs("#closeEnquiryModal")?.addEventListener("click",()=> enquiryModal.classList.remove("show"));
/* =========================================
   🧳 PLAN YOUR JOURNEY MODAL + FORMS
========================================= */

const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryModal = document.getElementById("openEnquiryModal");
const closeEnquiryModal = document.getElementById("closeEnquiryModal");

/* Open Modal */
openEnquiryModal?.addEventListener("click", () => {
  enquiryModal?.classList.add("show");
  document.body.style.overflow = "hidden";
});

/* Close Modal */
closeEnquiryModal?.addEventListener("click", closeEnquiry);
enquiryModal?.addEventListener("click", e => {
  if (e.target === enquiryModal) closeEnquiry();
});

function closeEnquiry() {
  enquiryModal?.classList.remove("show");
  document.body.style.overflow = "";
}

/* -------- POPUP FORM -------- */
const popupEmailBtn = document.getElementById("modalSendEmailBtn");
const popupWhatsAppBtn = document.getElementById("modalWhatsApp");

function popupMessage() {
  return `Name: ${mName.value}
Phone: ${mPhone.value}
Email: ${mEmail.value}
Trip Type: ${mType.value}

Travel Plan:
${mPlan.value}`;
}

popupEmailBtn?.addEventListener("click", () => {
  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=New Travel Enquiry&body=${encodeURIComponent(popupMessage())}`;
});

["mName","mPhone","mEmail","mType","mPlan"].forEach(id=>{
  document.getElementById(id)?.addEventListener("input",()=>{
    popupWhatsAppBtn.href =
      `https://wa.me/919884066830?text=${encodeURIComponent(popupMessage())}`;
  });
});

/* -------- BOTTOM FORM -------- */
const bottomEmailBtn = document.getElementById("bottomSendEmailBtn");
const bottomWhatsAppBtn = document.getElementById("bottomWhatsAppBtn");

function bottomMessage() {
  return `Name: ${contactName.value}
Phone: ${contactPhone.value}
Email: ${contactEmail.value}

Travel Plan:
${contactPlan.value}`;
}

bottomEmailBtn?.addEventListener("click", () => {
  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=New Travel Enquiry&body=${encodeURIComponent(bottomMessage())}`;
});

bottomWhatsAppBtn?.addEventListener("click", () => {
  window.open(
    `https://wa.me/919884066830?text=${encodeURIComponent(bottomMessage())}`,
    "_blank"
  );
});
/* ===============================
   ENQUIRY MODAL OPEN / CLOSE
================================ */

const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryModalBtn = document.getElementById("openEnquiryModal");
const closeEnquiryModalBtn = document.getElementById("closeEnquiryModal");
const modalEnquiryForm = document.getElementById("modalEnquiryForm");
const modalWhatsAppBtn = document.getElementById("modalWhatsAppBtn");

function openModal() {
  if (!enquiryModal) return;
  enquiryModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!enquiryModal) return;
  enquiryModal.classList.remove("show");
  document.body.style.overflow = "";
}

openEnquiryModalBtn?.addEventListener("click", openModal);
closeEnquiryModalBtn?.addEventListener("click", closeModal);

enquiryModal?.addEventListener("click", (e) => {
  if (e.target === enquiryModal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ===============================
   WHATSAPP PREFILL (USING YOUR FIELDS)
================================ */

function updateModalWhatsApp() {
  if (!modalWhatsAppBtn) return;

  const name = document.getElementById("mName")?.value || "";
  const phone = document.getElementById("mPhone")?.value || "";
  const email = document.getElementById("mEmail")?.value || "";
  const type = document.getElementById("mType")?.value || "";

  const msg =
    `Hi Cogo Tours 😊%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    (email ? `Email: ${email}%0A` : "") +
    (type ? `Trip Type: ${type}%0A` : "");

  modalWhatsAppBtn.href = `https://wa.me/919884066830?text=${msg}`;
}

["mName","mPhone","mEmail","mType"].forEach(id=>{
  document.getElementById(id)?.addEventListener("input", updateModalWhatsApp);
});

updateModalWhatsApp();

/* Form Submit */
modalEnquiryForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Thank you! We received your enquiry. Our team will contact you shortly.");
  modalEnquiryForm.reset();
  updateModalWhatsApp();
  closeModal();
});
/* ✅ Modal WhatsApp Button (Plan Your Journey) */
const modalWAButton = document.getElementById("modalWhatsAppBtn");

function updateModalWhatsApp() {
  if (!modalWAButton) return;

  const name = document.getElementById("mName")?.value || "";
  const phone = document.getElementById("mPhone")?.value || "";
  const email = document.getElementById("mEmail")?.value || "";
  const type = document.getElementById("mType")?.value || "";

  const msg =
    `Hi Cogo Tours & Travels 👋%0A%0A` +
    `I submitted an enquiry from your website.%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    (email ? `Email: ${email}%0A` : "") +
    (type ? `Trip Type: ${type}%0A` : "") +
    `%0APlease share package details. Thank you!`;

  modalWAButton.href = `https://wa.me/919884066830?text=${msg}`;
}

["mName", "mPhone", "mEmail", "mType"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", updateModalWhatsApp);
});

updateModalWhatsApp();
/* ✅ OPEN / CLOSE PLAN YOUR JOURNEY MODAL */
const openBtn = document.getElementById("openEnquiryModal");
const modal = document.getElementById("enquiryModal");
const closeBtn = document.getElementById("closeEnquiryModal");

if (openBtn && modal) {
  openBtn.addEventListener("click", () => {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  });
}

/* close when clicking outside box */
modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
});


