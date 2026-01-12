// ================= BASIC ELEMENTS =================

const nav = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");

// ================= STICKY NAV + TOP BUTTON =================

window.addEventListener("scroll", () => {

  if (window.scrollY > 120) {
    nav.classList.add("sticky");
    if (topBtn) topBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    if (topBtn) topBtn.style.display = "none";
  }

  revealSections();
});

// ================= BACK TO TOP =================

if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ================= SCROLL REVEAL =================

function revealSections() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(sec => {
    const windowHeight = window.innerHeight;
    const sectionTop = sec.getBoundingClientRect().top;

    if (sectionTop < windowHeight - 100) {
      sec.classList.add("active");
    }
  });
}

// Run reveal once on load
revealSections();

// ================= ENQUIRY MESSAGE =================

function showMessage() {
  alert("Thank you! Our travel expert will contact you shortly 🌍✈");
}










