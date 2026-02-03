/* =====================================
   STICKY NAVBAR + HIDE TOP BUTTONS
===================================== */
const nav = document.getElementById("mainNav");
const callBtn = document.querySelector(".call-link");
const planBtn = document.getElementById("openEnquiryModal");

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


/* =====================================
   HAMBURGER MENU
===================================== */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open");
    hamburgerBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
  });
}


/* =====================================
   TOUR FILTER
===================================== */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    document.querySelectorAll(".tour-card").forEach(card => {
      card.style.display =
        filter === "all" || card.dataset.category === filter ? "block" : "none";
    });
  });
});


/* =====================================
   VIEW DETAILS MODAL
===================================== */
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


/* =====================================
   TRAVEL ENQUIRY MODAL OPEN/CLOSE
===================================== */
const enquiryModal = document.getElementById("enquiryModal");
const openEnquiryBtn = document.getElementById("openEnquiryModal");
const closeEnquiryBtn = document.getElementById("closeEnquiryModal");

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


/* =====================================
   MESSAGE BUILDER
===================================== */
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


/* =====================================
   TOP MODAL BUTTONS
===================================== */
document.getElementById("sendEmailBtn")?.addEventListener("click", () => {
  const name = document.getElementById("mName").value;
  const phone = document.getElementById("mPhone").value;
  const email = document.getElementById("mEmail").value;
  const plan = document.getElementById("mPlan").value;

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("modalWhatsAppBtn")?.addEventListener("click", () => {
  const name = document.getElementById("mName").value;
  const phone = document.getElementById("mPhone").value;
  const email = document.getElementById("mEmail").value;
  const plan = document.getElementById("mPlan").value;

  const msg = buildMessage(name, phone, email, plan);
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});


/* =====================================
   BOTTOM FORM BUTTONS
===================================== */
document.getElementById("bottomSendEmailBtn")?.addEventListener("click", () => {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const email = document.getElementById("contactEmail").value;
  const plan = document.getElementById("contactPlan").value;

  const subject = "New Travel Enquiry - Cogo Tours";
  const body = buildMessage(name, phone, email, plan);

  window.location.href =
    `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("bottomWhatsAppBtn")?.addEventListener("click", () => {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const email = document.getElementById("contactEmail").value;
  const plan = document.getElementById("contactPlan").value;

  const msg = buildMessage(name, phone, email, plan);
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
});
