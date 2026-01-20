/* =========================
   COGO TOURS - SCRIPT.JS
========================= */

/* ✅ 2) Enquiry Form Submit Message */
function showMessage(event) {
  event.preventDefault();
  alert("✅ Thank you! We received your enquiry. Our team will contact you shortly.");
  event.target.reset();
}

/* ✅ 3) Back to Top Button */
const topBtn = document.getElementById("topBtn");

if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ✅ 4) Reveal Animation on Scroll */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerPoint = window.innerHeight - 120;
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerPoint) el.classList.add("active");
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ✅ 5) Smooth Scroll */
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

/* ✅ Sticky Navbar on Scroll */
window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  if (window.scrollY > 120) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

/* ✅ Mobile Hamburger Menu Toggle */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open");

    if (navLinks.classList.contains("open")) hamburgerBtn.textContent = "✕";
    else hamburgerBtn.textContent = "☰";
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
  });
});
/* ✅ Sticky Phone + Plan Buttons (Premium UX: show on scroll-up, hide on scroll-down) */
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const phoneBtn = document.querySelector(".call-link");
  const planBtn = document.querySelector(".plan-btn-top");
  if (!phoneBtn || !planBtn) return;

  const triggerPoint = 350; // after banner
  const currentY = window.scrollY;

  // 1) make buttons sticky only after banner
  if (currentY > triggerPoint) {
    phoneBtn.classList.add("sticky-cta");
    planBtn.classList.add("sticky-cta");

    // 2) hide when scrolling down, show when scrolling up
    if (currentY > lastScrollY + 5) {
      // scrolling down
      phoneBtn.classList.add("cta-hide");
      planBtn.classList.add("cta-hide");
    } else if (currentY < lastScrollY - 5) {
      // scrolling up
      phoneBtn.classList.remove("cta-hide");
      planBtn.classList.remove("cta-hide");
    }
  } else {
    // reset before banner
    phoneBtn.classList.remove("sticky-cta", "cta-hide");
    planBtn.classList.remove("sticky-cta", "cta-hide");
  }

  lastScrollY = currentY;
});
/* =========================
   POPUP ENQUIRY MODAL JS
========================= */
const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryModal = document.getElementById("openEnquiryModal");
const closeEnquiryModal = document.getElementById("closeEnquiryModal");
const modalEnquiryForm = document.getElementById("modalEnquiryForm");

function openModal() {
  if (!enquiryModal) return;
  enquiryModal.classList.add("show");
  document.body.style.overflow = "hidden"; // stop background scroll
}

function closeModal() {
  if (!enquiryModal) return;
  enquiryModal.classList.remove("show");
  document.body.style.overflow = ""; // restore scroll
}

if (openEnquiryModal) {
  openEnquiryModal.addEventListener("click", openModal);
}

if (closeEnquiryModal) {
  closeEnquiryModal.addEventListener("click", closeModal);
}

/* Close modal on outside click */
if (enquiryModal) {
  enquiryModal.addEventListener("click", (e) => {
    if (e.target === enquiryModal) closeModal();
  });
}

/* Close modal on ESC key */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* Submit action */
if (modalEnquiryForm) {
  modalEnquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Thank you! We received your enquiry. Our team will contact you shortly.");
    modalEnquiryForm.reset();
    closeModal();
  });
}



