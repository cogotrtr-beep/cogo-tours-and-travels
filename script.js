/* ✅ Enquiry Form Submit Message */
function showMessage(){ /* message handled in UI */ }

\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${msg}`);
  window.location.href=`mailto:cogottr@gmail.com?subject=${subject}&body=${body}`;
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
    /* Email enquiry via mailto */
  const name=document.getElementById("mName")?.value||"";
  const email=document.getElementById("mEmail")?.value||"";
  const phone=document.getElementById("mPhone")?.value||"";
  const msg=document.getElementById("mPlan")?.value||"";
  const subject=encodeURIComponent("Cogo Tours Enquiry");
  const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${msg}`);
  window.location.href=`mailto:cogottr@gmail.com?subject=${subject}&body=${body}`;
    modalEnquiryForm.reset();
    buildModalWhatsAppLink();
    closeModal();
  });
}


/* =========================
   Sticky CTA Slide Animation
========================= */
const stickyCta = document.getElementById("stickyCta");
const stickyEnquiryBtn = document.getElementById("stickyEnquiryBtn");

if (stickyCta) {
  // slide up on load
  window.addEventListener("load", () => {
    setTimeout(() => stickyCta.classList.add("show"), 350);
  });

  // hide on scroll down, show on scroll up (premium behavior)
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 180) stickyCta.classList.remove("show");
    else stickyCta.classList.add("show");
    lastScrollY = currentY;
  });
}

// enquiry opens modal (same as top button)
if (stickyEnquiryBtn) {
  stickyEnquiryBtn.addEventListener("click", () => {
    const openBtn = document.getElementById("openEnquiryModal");
    if (openBtn) openBtn.click();
    else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}


/* Enquiry WhatsApp button */
document.addEventListener("DOMContentLoaded", () => {
  const waBtn = document.getElementById("sendWhatsApp");
  if (!waBtn) return;

  waBtn.addEventListener("click", () => {
    const name = document.getElementById("mName")?.value || "";
    const email = document.getElementById("mEmail")?.value || "";
    const phone = document.getElementById("mPhone")?.value || "";
    const msg = document.getElementById("mPlan")?.value || "";

    const text =
      `Hi Cogo Tours,%0A%0A` +
      `I would like to enquire.%0A` +
      (name ? `Name: ${name}%0A` : "") +
      (phone ? `Phone: ${phone}%0A` : "") +
      (email ? `Email: ${email}%0A` : "") +
      (msg ? `%0AMessage:%0A${msg}` : "");

    window.open(`https://wa.me/919884066830?text=${text}`, "_blank");
  });
});

/* Hide side CTA on scroll down, show on scroll up */
(() => {
  let lastY = window.scrollY;
  const sideEls = [
    document.querySelector(".call-link"),
    document.querySelector(".plan-btn-top"),
  ].filter(Boolean);

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > lastY && y > 150) {
      sideEls.forEach(el => el.classList.add("side-cta-hide"));
    } else {
      sideEls.forEach(el => el.classList.remove("side-cta-hide"));
    }
    lastY = y;
  });
})();


/* ✅ WhatsApp helper with relevant message */
function openWhatsAppWithMessage(message){
  const phone = "919880466830"; // Cogo Tours
  const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

/* ✅ Package details modal (dummy content for now) */
(function(){
  const modal = document.createElement("div");
  modal.id="packageModal";
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

  const close = ()=> modal.classList.remove("show");
  modal.querySelector(".pkg-backdrop").addEventListener("click", close);
  modal.querySelector(".pkg-close").addEventListener("click", close);

  window.openPackageModal = (pkgName)=>{
    document.getElementById("pkgTitle").textContent = pkgName + " - Details";
    document.getElementById("pkgBody").innerHTML = `
      <p><b>${pkgName}</b> package details will be updated soon.</p>
      <ul>
        <li>Duration, inclusions, exclusions</li>
        <li>Hotel type, sightseeing, itinerary</li>
        <li>Price and terms</li>
      </ul>
      <p><i>For more info, please WhatsApp or Call us.</i></p>`;
    document.getElementById("pkgWhatsApp").onclick = ()=> {
      openWhatsAppWithMessage(`Hi Cogo Tours! I want details for *${pkgName}* package. Please share itinerary, inclusions and price.`);
    };
    modal.classList.add("show");
  };

  document.addEventListener("click", (e)=>{
    const btn = e.target.closest("[data-package-details]");
    if(btn){
      e.preventDefault();
      openPackageModal(btn.getAttribute("data-package-details"));
    }
  });

  // Ensure all cards have View Details button
  document.querySelectorAll(".tour-card, .package-card, .card").forEach(card=>{
    const titleEl = card.querySelector("h3, .card-title, .pkg-title");
    const pkgName = titleEl ? titleEl.textContent.trim() : "Tour Package";
    const btnWrap = card.querySelector(".card-buttons, .btn-group, .buttons");
    if(btnWrap && !btnWrap.querySelector(".view-details")){
      const vd = document.createElement("a");
      vd.href="#";
      vd.className="view-details";
      vd.textContent="View Details";
      vd.setAttribute("data-package-details", pkgName);
      btnWrap.appendChild(vd);
    }
    // update WhatsApp buttons message
    const wa = card.querySelector('a[href*="wa.me"], .whatsapp-btn, .wa-btn');
    if(wa){
      wa.addEventListener("click",(ev)=>{
        ev.preventDefault();
        openWhatsAppWithMessage(`Hi Cogo Tours! I’m interested in *${pkgName}*. Please share details and quote.`);
      });
    }
  });
})();
