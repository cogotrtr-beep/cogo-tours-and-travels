/* ===============================
   NAVBAR STICKY + MOBILE MENU
================================= */
const nav = document.getElementById("mainNav");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  if (!nav) return;
  nav.classList.toggle("sticky", window.scrollY > 120);
});

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
   TOUR FILTERS
================================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const tourCards = document.querySelectorAll(".tour-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    tourCards.forEach(card => {
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
const detailsTitle = document.getElementById("detailsTitle");
const detailsDescription = document.getElementById("detailsDescription");
const detailsItinerary = document.getElementById("detailsItinerary");
const detailsClose = document.querySelector(".details-close");

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
detailsModal?.addEventListener("click", e => {
  if (e.target.classList.contains("details-backdrop")) closeDetails();
});

function closeDetails() {
  detailsModal.classList.remove("show");
  document.body.style.overflow = "";
}


/* ===============================
   BOTTOM TRAVEL ENQUIRY FORM
================================= */
document.addEventListener("DOMContentLoaded", function () {

  const emailBtn = document.getElementById("bottomSendEmailBtn");
  const waBtn = document.getElementById("bottomWhatsAppBtn");

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

  emailBtn?.addEventListener("click", function () {
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const email = document.getElementById("contactEmail").value;
    const plan = document.getElementById("contactPlan").value;

    const subject = "Travel Enquiry - Cogo Tours";
    const body = buildMessage(name, phone, email, plan);

    window.location.href =
      `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  waBtn?.addEventListener("click", function () {
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const email = document.getElementById("contactEmail").value;
    const plan = document.getElementById("contactPlan").value;

    const msg = buildMessage(name, phone, email, plan);
    window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
  });

});


/* ===============================
   BACK TO TOP BUTTON
================================= */
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (!topBtn) return;
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

topBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
