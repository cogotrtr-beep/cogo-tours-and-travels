/* =========================
   COGO TOURS - SCRIPT.JS
========================= */

/* ✅ 1) Dropdown (Now works with Filters) */
function showTourInfo(event) {
  event.preventDefault();

  const selected = document.getElementById("domesticTour").value;
  if (!selected) return;

  // scroll to tours section
  const toursSection = document.getElementById("tours");
  if (toursSection) {
    toursSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // auto click the matching filter button
  const btn = document.querySelector(`.filter-btn[data-filter="${selected}"]`);
  if (btn) btn.click();
}

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
