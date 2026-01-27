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

/* ===============================
   POPUP FORM – EMAIL + WHATSAPP
================================ */
const sendEmailBtn = qs("#modalSendEmailBtn");
const modalWhatsApp = qs("#modalWhatsApp");

function buildPopupMsg(){
  return `
Name: ${qs("#mName")?.value || ""}
Phone: ${qs("#mPhone")?.value || ""}
Email: ${qs("#mEmail")?.value || ""}
Trip Type: ${qs("#mType")?.value || ""}

Travel Plan:
${qs("#mPlan")?.value || ""}`;
}

sendEmailBtn?.addEventListener("click",()=>{
  window.location.href =
  `mailto:cogotrtr@gmail.com?subject=New Travel Enquiry&body=${encodeURIComponent(buildPopupMsg())}`;
});

["mName","mPhone","mEmail","mType","mPlan"].forEach(id=>{
  qs("#"+id)?.addEventListener("input",()=>{
    modalWhatsApp.href = `https://wa.me/919884066830?text=${encodeURIComponent(buildPopupMsg())}`;
  });
});

/* ===============================
   BOTTOM CONTACT FORM
================================ */
const bottomEmailBtn = qs("#bottomSendEmailBtn");
const bottomWhatsAppBtn = qs("#bottomWhatsAppBtn");

function buildBottomMsg(){
  return `
Name: ${qs("#contactName")?.value || ""}
Phone: ${qs("#contactPhone")?.value || ""}
Email: ${qs("#contactEmail")?.value || ""}

Travel Plan:
${qs("#contactPlan")?.value || ""}`;
}

bottomEmailBtn?.addEventListener("click",()=>{
  window.location.href =
  `mailto:cogotrtr@gmail.com?subject=New Travel Enquiry&body=${encodeURIComponent(buildBottomMsg())}`;
});

bottomWhatsAppBtn?.addEventListener("click",()=>{
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(buildBottomMsg())}`,"_blank");
});
/* ===============================
   📧 EMAIL + WHATSAPP — BOTH FORMS
=================================*/

/* ---------- POPUP FORM ---------- */
const modalSendEmailBtn = document.getElementById("modalSendEmailBtn");
const modalWhatsAppBtn = document.getElementById("modalWhatsApp");

if (modalSendEmailBtn) {
  modalSendEmailBtn.addEventListener("click", () => {
    const name = document.getElementById("mName").value;
    const phone = document.getElementById("mPhone").value;
    const email = document.getElementById("mEmail").value;
    const type = document.getElementById("mType").value;
    const plan = document.getElementById("mPlan").value;

    const subject = "New Travel Enquiry - Cogo Tours";
    const body =
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nTrip Type: ${type}\n\nTravel Plan:\n${plan}`;

    window.location.href = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function updateModalWhatsApp() {
  if (!modalWhatsAppBtn) return;

  const name = document.getElementById("mName").value;
  const phone = document.getElementById("mPhone").value;
  const email = document.getElementById("mEmail").value;
  const type = document.getElementById("mType").value;
  const plan = document.getElementById("mPlan").value;

  const msg =
    `Hi Cogo Tours 😊%0A%0AName: ${name}%0APhone: ${phone}%0AEmail: ${email}%0ATrip Type: ${type}%0A%0ATravel Plan:%0A${plan}`;

  modalWhatsAppBtn.href = `https://wa.me/919884066830?text=${msg}`;
}

["mName","mPhone","mEmail","mType","mPlan"].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener("input", updateModalWhatsApp);
});
updateModalWhatsApp();


/* ---------- BOTTOM FORM ---------- */
const bottomSendEmailBtn = document.getElementById("bottomSendEmailBtn");
const bottomWhatsAppBtn = document.getElementById("bottomWhatsAppBtn");

if (bottomSendEmailBtn) {
  bottomSendEmailBtn.addEventListener("click", () => {
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const email = document.getElementById("contactEmail").value;
    const plan = document.getElementById("contactPlan").value;

    const subject = "New Travel Enquiry - Cogo Tours";
    const body =
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nTravel Plan:\n${plan}`;

    window.location.href = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function updateBottomWhatsApp() {
  if (!bottomWhatsAppBtn) return;

  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const email = document.getElementById("contactEmail").value;
  const plan = document.getElementById("contactPlan").value;

  const msg =
    `Hi Cogo Tours 😊%0A%0AName: ${name}%0APhone: ${phone}%0AEmail: ${email}%0A%0ATravel Plan:%0A${plan}`;

  bottomWhatsAppBtn.href = `https://wa.me/919884066830?text=${msg}`;
}

["contactName","contactPhone","contactEmail","contactPlan"].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener("input", updateBottomWhatsApp);
});
updateBottomWhatsApp();

