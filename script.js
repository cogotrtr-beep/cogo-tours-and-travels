document.addEventListener("DOMContentLoaded", function () {
/* ===============================
   STICKY NAVBAR + HIDE TOP BUTTONS
================================= */
const nav = document.getElementById("mainNav");
const callBtn = document.querySelector(".call-link");
const planBtn = document.querySelector(".plan-btn-top");

window.addEventListener("scroll", () => {
  if (!nav) return;

  if (window.scrollY > 120) {
    nav.classList.add("sticky");
    if (callBtn) callBtn.style.opacity = "0";
    if (planBtn) planBtn.style.opacity = "0";
  } else {
    nav.classList.remove("sticky");
    if (callBtn) callBtn.style.opacity = "1";
    if (planBtn) planBtn.style.opacity = "1";
  }
});


/* ===============================
   HAMBURGER MENU
================================= */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open");
  hamburgerBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    hamburgerBtn.textContent = "☰";
  });
});


/* ===============================
   TOUR FILTER
================================= */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    document.querySelectorAll(".tour-card").forEach(card => {
      card.style.display =
        filter === "all" || card.dataset.category === filter ? "block" : "none";
    });

    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
  });
});


/* ===============================
   VIEW DETAILS MODAL
================================= */
const detailsModal = document.getElementById("detailsModal");

document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("detailsTitle").textContent = btn.dataset.title || "Package Details";
    document.getElementById("detailsDescription").textContent = btn.dataset.description || "";
    document.getElementById("detailsItinerary").innerHTML =
      (btn.dataset.itinerary || "").replace(/\n/g, "<br>");

    detailsModal?.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

function closeDetails() {
  detailsModal?.classList.remove("show");
  document.body.style.overflow = "";
}

document.getElementById("detailsClose")?.addEventListener("click", closeDetails);
detailsModal?.addEventListener("click", e => { if (e.target === detailsModal) closeDetails(); });


/* ===============================
   TRAVEL ENQUIRY MODAL (TOP)
================================= */
const enquiryModal = document.getElementById("enquiryModal");

document.getElementById("openEnquiryModal")?.addEventListener("click", () => {
  enquiryModal?.classList.add("show");
  document.body.style.overflow = "hidden";
});

document.getElementById("closeEnquiryModal")?.addEventListener("click", closeEnquiry);
enquiryModal?.addEventListener("click", e => { if (e.target === enquiryModal) closeEnquiry(); });

function closeEnquiry() {
  enquiryModal?.classList.remove("show");
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
   TOP MODAL → EMAIL
================================= */
document.getElementById("sendEmailBtn")?.addEventListener("click", () => {
  const name = document.getElementById("mName")?.value || "";
  const phone = document.getElementById("mPhone")?.value || "";
  const email = document.getElementById("mEmail")?.value || "";
  const plan = document.getElementById("mPlan")?.value || "";

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});


/* ===============================
   TOP MODAL → WHATSAPP
================================= */
document.getElementById("modalWhatsAppBtn")?.addEventListener("click", () => {
  const name = document.getElementById("mName")?.value || "";
  const phone = document.getElementById("mPhone")?.value || "";
  const email = document.getElementById("mEmail")?.value || "";
  const plan = document.getElementById("mPlan")?.value || "";

  const msg = buildMessage(name, phone, email, plan);
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});


/* ===============================
   BOTTOM FORM → EMAIL
================================= */
document.getElementById("bottomSendEmailBtn")?.addEventListener("click", () => {
  const name = document.getElementById("contactName")?.value || "";
  const phone = document.getElementById("contactPhone")?.value || "";
  const email = document.getElementById("contactEmail")?.value || "";
  const plan = document.getElementById("contactPlan")?.value || "";

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});


/* ===============================
   BOTTOM FORM → WHATSAPP
================================= */
document.getElementById("bottomWhatsAppBtn")?.addEventListener("click", () => {
  const name = document.getElementById("contactName")?.value || "";
  const phone = document.getElementById("contactPhone")?.value || "";
  const email = document.getElementById("contactEmail")?.value || "";
  const plan = document.getElementById("contactPlan")?.value || "";

  const msg = buildMessage(name, phone, email, plan);
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
document.addEventListener("DOMContentLoaded", function () {

});

