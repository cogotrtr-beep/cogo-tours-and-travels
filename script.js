/* =========================================================
   1. STICKY NAVBAR & TOP CTA SCROLL EFFECT
========================================================= */
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

/* =========================================================
   2. HAMBURGER MENU
========================================================= */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open");
    hamburgerBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
      hamburgerBtn.textContent = "☰";
    });
  });
}

/* =========================================================
   3. TOUR CATEGORY FILTERS
========================================================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const tourCards = document.querySelectorAll(".tour-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    tourCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === "all" || category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
  });
});

/* =========================================================
   4. VIEW DETAILS MODAL
========================================================= */
const detailsModal = document.getElementById("detailsModal");
const detailsTitle = document.getElementById("detailsTitle");
const detailsDescription = document.getElementById("detailsDescription");
const detailsItinerary = document.getElementById("detailsItinerary");
const detailsClose = document.getElementById("detailsClose");

document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!detailsModal) return;

    if (detailsTitle) detailsTitle.textContent = btn.dataset.title || "Package Details";
    if (detailsDescription) detailsDescription.textContent = btn.dataset.description || "";
    if (detailsItinerary) detailsItinerary.innerHTML = (btn.dataset.itinerary || "").replace(/\n/g, "<br>");

    detailsModal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

detailsClose?.addEventListener("click", closeDetailsModal);
detailsModal?.addEventListener("click", e => {
  if (e.target === detailsModal) closeDetailsModal();
});

function closeDetailsModal() {
  if (!detailsModal) return;
  detailsModal.classList.remove("show");
  document.body.style.overflow = "";
}

/* =========================================================
   5. PLAN YOUR JOURNEY (ENQUIRY) MODAL CONTROLS
========================================================= */
const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryBtn = document.getElementById("openEnquiryModal");
const closeEnquiryBtn = document.getElementById("closeEnquiryModal");
const modalForm = document.getElementById("modalEnquiryForm");

openEnquiryBtn?.addEventListener("click", () => {
  if (!enquiryModal) return;
  enquiryModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

closeEnquiryBtn?.addEventListener("click", closeEnquiryModal);
enquiryModal?.addEventListener("click", e => {
  if (e.target === enquiryModal) closeEnquiryModal();
});

function closeEnquiryModal() {
  if (!enquiryModal) return;
  enquiryModal.classList.remove("show");
  document.body.style.overflow = "";
}

modalForm?.addEventListener("submit", e => {
  e.preventDefault();
  alert("✅ Thank you! We will contact you shortly.");
  modalForm.reset();
  closeEnquiryModal();
});

/* =========================================================
   6. MODAL ENQUIRY ACTIONS (EMAIL & WHATSAPP)
========================================================= */
const sendEmailBtn = document.getElementById("sendEmailBtn");
const modalWhatsAppBtn = document.getElementById("modalWhatsAppBtn");

sendEmailBtn?.addEventListener("click", () => {
  const name = document.getElementById("mName")?.value.trim() || "Not specified";
  const phone = document.getElementById("mPhone")?.value.trim() || "Not specified";
  const email = document.getElementById("mEmail")?.value.trim() || "Not specified";
  const type = document.getElementById("mType")?.value.trim() || "General";
  const plan = document.getElementById("mPlan")?.value.trim() || "No specific details provided";

  const subject = "New Travel Enquiry – Cogo Tours";
  const body = 
`Hello Cogo Tours,

New enquiry received:

Name: ${name}
Phone: ${phone}
Email: ${email}
Trip Type: ${type}

Travel Plan:
${plan}

Please contact the customer soon.`;

  window.location.href = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

modalWhatsAppBtn?.addEventListener("click", () => {
  const name = document.getElementById("mName")?.value.trim() || "Guest";
  const phone = document.getElementById("mPhone")?.value.trim() || "N/A";
  const email = document.getElementById("mEmail")?.value.trim() || "";
  const type = document.getElementById("mType")?.value.trim() || "";
  const plan = document.getElementById("mPlan")?.value.trim() || "Enquiry regarding travel package.";

  let msg = `Hi Cogo Tours & Travels 👋\n\nI would like to enquire about a trip.\n\nName: ${name}\nPhone: ${phone}\n`;
  if (email) msg += `Email: ${email}\n`;
  if (type) msg += `Trip Type: ${type}\n`;
  msg += `\nTravel Plan:\n${plan}\n\nPlease share package details.`;

  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});

/* =========================================================
   7. BOTTOM CONTACT FORM ACTIONS (EMAIL & WHATSAPP)
========================================================= */
const bottomEmailBtn = document.getElementById("bottomSendEmailBtn");
const bottomWhatsAppBtn = document.getElementById("bottomWhatsAppBtn");

bottomEmailBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("contactName")?.value.trim() || "Not specified";
  const phone = document.getElementById("contactPhone")?.value.trim() || "Not specified";
  const email = document.getElementById("contactEmail")?.value.trim() || "Not specified";
  const plan = document.getElementById("contactPlan")?.value.trim() || "No plan details provided";

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = 
`Hi Cogo Tours & Travels,

I would like to enquire about a trip.

Name: ${name}
Phone: ${phone}
Email: ${email}

Travel Plan:
${plan}

Please share package details.`;

  window.location.href = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

bottomWhatsAppBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("contactName")?.value.trim() || "Guest";
  const phone = document.getElementById("contactPhone")?.value.trim() || "N/A";
  const email = document.getElementById("contactEmail")?.value.trim() || "N/A";
  const plan = document.getElementById("contactPlan")?.value.trim() || "Enquiry regarding travel package.";

  const msg = 
`Hi Cogo Tours & Travels 😊

I would like to enquire about a trip.

Name: ${name}
Phone: ${phone}
Email: ${email}

Travel Plan:
${plan}

Please share package details.`;

  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});
