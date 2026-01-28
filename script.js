/* ===============================
   ✅ STICKY NAVBAR + HIDE TOP CTAs
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
   ✅ HAMBURGER MENU
================================= */
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


/* ===============================
   ✅ TOUR FILTERS
================================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const tourCards = document.querySelectorAll(".tour-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    tourCards.forEach(card => {
      card.style.display = (filter === "all" || card.dataset.category === filter) ? "block" : "none";
    });

    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
  });
});


/* ===============================
   ✅ WHATSAPP BUTTONS (SMART)
================================= */
document.querySelectorAll(".wa-quote").forEach(btn => {
  btn.addEventListener("click", () => {
    const place = btn.dataset.place || "Tour Package";
    const days = btn.dataset.days || "";
    const price = btn.dataset.price || "";

    const msg =
      `Hi Cogo Tours & Travels 😊%0A%0A` +
      `I am interested in:%0A*${place}*%0A` +
      (days ? `Duration: ${days}%0A` : "") +
      (price ? `Price: ${price}%0A` : "") +
      `%0APlease share full details.`;

    window.open(`https://wa.me/919884066830?text=${msg}`, "_blank");
  });
});


/* ===============================
   ✅ VIEW DETAILS MODAL
================================= */
const detailsModal = document.getElementById("detailsModal");
const detailsTitle = document.getElementById("detailsTitle");
const detailsDescription = document.getElementById("detailsDescription");
const detailsItinerary = document.getElementById("detailsItinerary");
const detailsClose = document.getElementById("detailsClose");

document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    detailsTitle.textContent = btn.dataset.title || "Package Details";
    detailsDescription.textContent = btn.dataset.description || "";
    detailsItinerary.innerHTML = (btn.dataset.itinerary || "").replace(/\n/g, "<br>");

    detailsModal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

detailsClose?.addEventListener("click", closeDetails);
detailsModal?.addEventListener("click", e => { if (e.target === detailsModal) closeDetails(); });

function closeDetails() {
  detailsModal.classList.remove("show");
  document.body.style.overflow = "";
}


/* ===============================
   ✅ PLAN YOUR JOURNEY MODAL
================================= */
const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryBtn = document.getElementById("openEnquiryModal");
const closeEnquiryBtn = document.getElementById("closeEnquiryModal");
const modalForm = document.getElementById("modalEnquiryForm");
const modalWhatsApp = document.getElementById("modalWhatsApp");

openEnquiryBtn?.addEventListener("click", () => {
  enquiryModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

closeEnquiryBtn?.addEventListener("click", closeEnquiry);
enquiryModal?.addEventListener("click", e => { if (e.target === enquiryModal) closeEnquiry(); });

function closeEnquiry() {
  enquiryModal.classList.remove("show");
  document.body.style.overflow = "";
}


/* ===============================
   ✅ BUILD WHATSAPP FROM MODAL
================================= */
function buildModalWhatsApp() {
  if (!modalWhatsApp) return;

  const name = document.getElementById("mName")?.value || "";
  const phone = document.getElementById("mPhone")?.value || "";
  const type = document.getElementById("mType")?.value || "";
  const plan = document.getElementById("mPlan")?.value || "";

  const msg =
    `Hi Cogo Tours & Travels 👋%0A%0A` +
    `Name: ${name}%0APhone: ${phone}%0ATrip Type: ${type}%0A` +
    `%0APlan Details:%0A${plan}`;

  modalWhatsApp.href = `https://wa.me/919884066830?text=${msg}`;
}

["mName", "mPhone", "mType", "mPlan"].forEach(id => {
  document.getElementById(id)?.addEventListener("input", buildModalWhatsApp);
});

modalForm?.addEventListener("submit", e => {
  e.preventDefault();
  alert("✅ Thank you! We will contact you shortly.");
  modalForm.reset();
  buildModalWhatsApp();
  closeEnquiry();
});
/* ===============================
   BOTTOM FORM → EMAIL + WHATSAPP
================================= */

const bottomEmailBtn = document.getElementById("bottomSendEmailBtn");
const bottomWhatsAppBtn = document.getElementById("bottomWhatsAppBtn");

if (bottomEmailBtn) {
  bottomEmailBtn.addEventListener("click", () => {
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const email = document.getElementById("contactEmail").value;
    const plan = document.getElementById("contactPlan").value;

    const subject = "New Travel Enquiry - Cogo Tours";
    const body =
`Name: ${name}
Phone: ${phone}
Email: ${email}

Travel Plan:
${plan}`;

    window.location.href = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

if (bottomWhatsAppBtn) {
  bottomWhatsAppBtn.addEventListener("click", () => {
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const email = document.getElementById("contactEmail").value;
    const plan = document.getElementById("contactPlan").value;

    const msg =
`Hi Cogo Tours & Travels 😊

I would like to enquire about a trip.

Name: ${name}
Phone: ${phone}
Email: ${email}

Travel Plan:
${plan}

Please share package details.`;

    const waURL = `https://wa.me/919884066830?text=${encodeURIComponent(msg)}`;
    window.open(waURL, "_blank");
  });
}

