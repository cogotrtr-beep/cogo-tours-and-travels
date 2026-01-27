/* ✅ Enquiry Form Submit Message */
function showMessage(event) {
  event.preventDefault();
  alert("✅ Thank you! We received your enquiry. Our team will contact you shortly.");
  event.target.reset();
}

/* ✅ Back to Top Button */
const topBtn = document.getElementById("topBtn");
if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ✅ Smooth Scroll */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetID = this.getAttribute("href");
    if (!targetID || targetID === "#") return;
    const targetEl = document.querySelector(targetID);
    if (!targetEl) return;
    e.preventDefault();
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ✅ Sticky Navbar */
window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  if (window.scrollY > 120) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

/* ✅ Hide top CTA buttons when scrolling down */
const callBtn = document.querySelector(".call-link");
const planBtn = document.querySelector(".plan-btn-top");

window.addEventListener("scroll", () => {
  const hidePoint = 120;

  if (window.scrollY > hidePoint) {
    callBtn?.classList.add("hide-cta");
    planBtn?.classList.add("hide-cta");
  } else {
    callBtn?.classList.remove("hide-cta");
    planBtn?.classList.remove("hide-cta");
  }
});

/* ✅ Hamburger */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");
if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open");
    hamburgerBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
      hamburgerBtn.textContent = "☰";
    });
  });
}

/* ✅ Tour Filter Buttons */
const filterButtons = document.querySelectorAll(".filter-btn");
const tourCards = document.querySelectorAll(".tour-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    tourCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) card.classList.remove("hide");
      else card.classList.add("hide");
    });

    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ✅ WhatsApp Buttons */
document.querySelectorAll(".wa-quote").forEach((btn) => {
  btn.addEventListener("click", () => {
    const place = btn.dataset.place || "Tour Package";
    const days = btn.dataset.days || "";
    const price = btn.dataset.price || "";

    const msg =
      `Hi Cogo Tours & Travels 😊%0A%0A` +
      `I am interested in *${place}*%0A` +
      (days ? `Duration: ${days}%0A` : "") +
      (price ? `Price: ${price}%0A` : "") +
      `%0APlease share full itinerary & best offer.`;

    window.open(`https://wa.me/919884066830?text=${msg}`, "_blank");
  });
});

/* ===============================
   ✅ VIEW DETAILS POPUP
================================ */
const detailsModal = document.getElementById("detailsModal");
const detailsTitle = document.getElementById("detailsTitle");
const detailsDescription = document.getElementById("detailsDescription");
const detailsItinerary = document.getElementById("detailsItinerary");

document.querySelectorAll(".details-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    detailsTitle.textContent = btn.dataset.title || "Package Details";
    detailsDescription.textContent = btn.dataset.description || "";
    detailsItinerary.innerHTML = (btn.dataset.itinerary || "").replace(/\n/g,"<br>");
    detailsModal.classList.add("show");
    document.body.style.overflow="hidden";
  });
});

function closeDetails(){
  detailsModal.classList.remove("show");
  document.body.style.overflow="";
}

document.querySelector(".details-close")?.addEventListener("click",closeDetails);
document.querySelector(".details-backdrop")?.addEventListener("click",closeDetails);
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeDetails(); });
/* ===============================
   ENQUIRY MODAL OPEN/CLOSE
================================ */

const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryModalBtn = document.getElementById("openEnquiryModal");
const closeEnquiryModalBtn = document.getElementById("closeEnquiryModal");

function openModal() {
  enquiryModal?.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  enquiryModal?.classList.remove("show");
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
   Bottom Form WhatsApp Link
================================ */
const contactWhatsAppBtn = document.getElementById("contactWhatsAppBtn");

function updateContactWhatsApp() {
  if (!contactWhatsAppBtn) return;

  const name = document.querySelector("#contactForm input[type='text']")?.value || "";
  const phone = document.querySelector("#contactForm input[type='tel']")?.value || "";
  const email = document.querySelector("#contactForm input[type='email']")?.value || "";
  const plan = document.querySelector("#contactForm textarea")?.value || "";

  const msg =
    `Hi Cogo Tours 😊%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    (email ? `Email: ${email}%0A` : "") +
    `%0ATravel Plan:%0A${plan}`;

  contactWhatsAppBtn.href = `https://wa.me/919884066830?text=${msg}`;
}

document.querySelectorAll("#contactForm input, #contactForm textarea").forEach(el=>{
  el.addEventListener("input", updateContactWhatsApp);
});
updateContactWhatsApp();
/* ===============================
   Email Send Logic (Popup Form)
================================ */
const modalSendEmailBtn = document.getElementById("modalSendEmailBtn");

modalSendEmailBtn?.addEventListener("click", () => {
  const name = document.getElementById("mName")?.value || "";
  const phone = document.getElementById("mPhone")?.value || "";
  const email = document.getElementById("mEmail")?.value || "";
  const plan = document.getElementById("mPlan")?.value || "";

  const subject = encodeURIComponent("New Travel Enquiry - Cogo Tours");
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nTravel Plan:\n${plan}`
  );

  window.location.href = `mailto:cogotrtr@gmail.com?subject=${subject}&body=${body}`;
});
/* ===============================
   Email Send Logic (Bottom Form)
================================ */
const sendEmailBtn = document.getElementById("sendEmailBtn");

sendEmailBtn?.addEventListener("click", () => {
  const form = document.getElementById("contactForm");
  const name = form.querySelector("input[type='text']")?.value || "";
  const phone = form.querySelector("input[type='tel']")?.value || "";
  const email = form.querySelector("input[type='email']")?.value || "";
  const plan = form.querySelector("textarea")?.value || "";

  const subject = encodeURIComponent("New Travel Enquiry - Cogo Tours");
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nTravel Plan:\n${plan}`
  );

  window.location.href = `mailto:cogotrtr@gmail.com?subject=${subject}&body=${body}`;
});




