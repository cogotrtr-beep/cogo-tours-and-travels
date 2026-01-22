
/* =========================
   COGO TOURS - script.js
   Cleaned + Fixed (V4)
========================= */

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

/* ✅ Smooth Scroll for internal links */
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

/* ✅ Mobile Hamburger */
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

/* ✅ WhatsApp Buttons
   - If data-wa exists → use it (custom)
   - Else → build using place/days/price
*/
const WA_PHONE = "919884066830";

function openWA(encodedText) {
  window.open(`https://wa.me/${WA_PHONE}?text=${encodedText}`, "_blank", "noopener");
}

document.querySelectorAll(".wa-quote").forEach((btn) => {
  btn.addEventListener("click", () => {
    const customWA = btn.dataset.wa;

    if (customWA && customWA.trim().length > 0) {
      // customWA already URL-encoded in HTML
      openWA(customWA);
      return;
    }

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

    openWA(msg);
  });
});

/* =========================
   ENQUIRY MODAL (Plan Your Journey)
========================= */
const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryModal = document.getElementById("openEnquiryModal");
const closeEnquiryModal = document.getElementById("closeEnquiryModal");
const modalEnquiryForm = document.getElementById("modalEnquiryForm");
const sendWhatsAppBtn = document.getElementById("sendWhatsApp");

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

/* WhatsApp enquiry from modal */
if (sendWhatsAppBtn) {
  sendWhatsAppBtn.addEventListener("click", () => {
    const name = document.getElementById("mName")?.value || "";
    const email = document.getElementById("mEmail")?.value || "";
    const phone = document.getElementById("mPhone")?.value || "";
    const type = document.getElementById("mType")?.value || "";
    const msg = document.getElementById("mPlan")?.value || "";

    const text =
      `Hi Cogo Tours & Travels 😊%0A%0A` +
      `I would like to enquire.%0A%0A` +
      (type ? `Trip Type: ${type}%0A` : "") +
      (name ? `Name: ${name}%0A` : "") +
      (phone ? `Phone: ${phone}%0A` : "") +
      (email ? `Email: ${email}%0A` : "") +
      (msg ? `%0APlan:%0A${msg}%0A` : "") +
      `%0APlease share best options & quote.`;

    openWA(text);
  });
}

/* Email enquiry from modal (submit) */
if (modalEnquiryForm) {
  modalEnquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("mName")?.value || "";
    const email = document.getElementById("mEmail")?.value || "";
    const phone = document.getElementById("mPhone")?.value || "";
    const type = document.getElementById("mType")?.value || "";
    const msg = document.getElementById("mPlan")?.value || "";

    const subject = encodeURIComponent("Cogo Tours Enquiry (Website)");
    const body = encodeURIComponent(
      `Name: ${name}
Phone: ${phone}
Email: ${email}
Trip Type: ${type}

Plan:
${msg}`
    );

    window.location.href = `mailto:cogotrtr@gmail.com?subject=${subject}&body=${body}`;

    modalEnquiryForm.reset();
    closeModal();
  });
}

/* =========================
   Sticky CTA Slide Animation (Mobile only)
========================= */
const stickyCta = document.getElementById("stickyCta");
const stickyEnquiryBtn = document.getElementById("stickyEnquiryBtn");

if (stickyCta) {
  window.addEventListener("load", () => {
    setTimeout(() => stickyCta.classList.add("show"), 350);
  });

  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 180) stickyCta.classList.remove("show");
    else stickyCta.classList.add("show");
    lastScrollY = currentY;
  });
}

if (stickyEnquiryBtn) {
  stickyEnquiryBtn.addEventListener("click", () => openModal());
}

/* Hide side CTA on scroll down, show on scroll up */
(() => {
  let lastY = window.scrollY;
  const sideEls = [
    document.querySelector(".call-link"),
    document.querySelector(".plan-btn-top"),
  ].filter(Boolean);

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > lastY && y > 150) sideEls.forEach((el) => el.classList.add("side-cta-hide"));
    else sideEls.forEach((el) => el.classList.remove("side-cta-hide"));
    lastY = y;
  });
})();

/* =========================
   Package "View Details" Modal (Dummy details)
========================= */
(function () {
  const modal = document.createElement("div");
  modal.id = "packageModal";
  modal.innerHTML = `
    <div class="pkg-backdrop"></div>
    <div class="pkg-box">
      <button class="pkg-close" aria-label="Close">×</button>
      <h3 id="pkgTitle">Package Details</h3>
      <div id="pkgBody" class="pkg-body"></div>
      <div class="pkg-actions">
        <button id="pkgWhatsApp" class="pkg-wa">WhatsApp Enquiry</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const close = () => modal.classList.remove("show");
  modal.querySelector(".pkg-backdrop").addEventListener("click", close);
  modal.querySelector(".pkg-close").addEventListener("click", close);

  // bind existing View Details buttons (.details-btn)
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title || "Tour Package";
      const itinerary = btn.dataset.itinerary || "";

      document.getElementById("pkgTitle").textContent = `${title} - Details`;
      document.getElementById("pkgBody").innerHTML = `
        <p><b>${title}</b> itinerary / details:</p>
        <pre style="white-space:pre-wrap; font-family:inherit; background:rgba(15,23,42,0.05); padding:12px; border-radius:14px;">${itinerary || "Details will be updated soon."}</pre>
        <p style="margin-top:10px;"><i>For customization & best quote, please WhatsApp us.</i></p>
      `;

      document.getElementById("pkgWhatsApp").onclick = () => {
        const msg = `Hi Cogo Tours & Travels 😊\n\nI’m interested in *${title}*. Please share inclusions, hotels and best price.`;
        openWA(encodeURIComponent(msg));
      };

      modal.classList.add("show");
    });
  });
})();
