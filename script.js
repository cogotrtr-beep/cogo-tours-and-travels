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

    // scroll a bit into tour section after filter click
    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ✅ WhatsApp Buttons (Smart)
   - If data-wa exists → use it (custom)
   - Else → build from place/days/price (old)
*/
document.querySelectorAll(".wa-quote").forEach((btn) => {
  btn.addEventListener("click", () => {
    const customWA = btn.dataset.wa;

    if (customWA && customWA.trim().length > 0) {
      window.open(`https://wa.me/919884066830?text=${customWA}`, "_blank");
      return;
    }

    // fallback old style
    const place = btn.dataset.place || "Tour Package";
    const days = btn.dataset.days || "";
    const price = btn.dataset.price || "";

    const msg =
      `Hi Cogo Tours & Travels 😊%0A%0A` +
      `I am interested in this package:%0A` +
      `*${place}*%0A` +
      (days ? `Duration: ${days}%0A` : "") +
      (price ? `Price: ${price}%0A` : "") +
      `%0APlease share full itinerary & best offer.`;

    window.open(`https://wa.me/919884066830?text=${msg}`, "_blank");
  });
});

/* ✅ Modal Open / Close + WhatsApp Prefill */
const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryModal = document.getElementById("openEnquiryModal");
const closeEnquiryModal = document.getElementById("closeEnquiryModal");
const modalEnquiryForm = document.getElementById("modalEnquiryForm");
const modalWhatsApp = document.getElementById("modalWhatsApp");

function openModal() {
  enquiryModal.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  enquiryModal.classList.remove("show");
  document.body.style.overflow = "";
}

if (openEnquiryModal) openEnquiryModal.addEventListener("click", openModal);
if (closeEnquiryModal) closeEnquiryModal.addEventListener("click", closeModal);

if (enquiryModal) {
  enquiryModal.addEventListener("click", (e) => {
    if (e.target === enquiryModal) closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ✅ live WhatsApp message build */
function buildModalWhatsAppLink() {
  if (!modalWhatsApp) return;

  const name = document.getElementById("mName")?.value || "";
  const phone = document.getElementById("mPhone")?.value || "";
  const email = document.getElementById("mEmail")?.value || "";
  const type = document.getElementById("mType")?.value || "";
  const plan = document.getElementById("mPlan")?.value || "";

  const msg =
    `Cogo Tours & Travels welcomes you 🙏%0A%0A` +
    `Thank you for contacting us! 😊%0A` +
    `We have received your enquiry. Our team will get back to you soon with complete details.%0A%0A` +
    `My details:%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    (email ? `Email: ${email}%0A` : "") +
    (type ? `Trip Type: ${type}%0A` : "") +
    `%0APlan:%0A${plan}%0A%0A` +
    `Thanks again for choosing Cogo 🌏✨`;

  modalWhatsApp.href = `https://wa.me/919884066830?text=${msg}`;
}

["mName", "mPhone", "mEmail", "mType", "mPlan"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", buildModalWhatsAppLink);
});
buildModalWhatsAppLink();

/* Submit action */
if (modalEnquiryForm) {
  modalEnquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Thank you! We received your enquiry. Our team will contact you shortly.");
    modalEnquiryForm.reset();
    buildModalWhatsAppLink();
    closeModal();
  });
}
