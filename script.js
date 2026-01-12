// ================= FORCE PAGE TO START AT TOP =================

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.onload = () => {
  window.scrollTo(0, 0);
  revealSections();
};

// ================= ELEMENTS =================

const nav = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");

// ================= STICKY NAV + TOP BUTTON =================

window.addEventListener("scroll", () => {

  if (window.scrollY > 120) {
    nav.classList.add("sticky");
    topBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    topBtn.style.display = "none";
  }

  revealSections();
});

// ================= BACK TO TOP =================

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ================= SCROLL REVEAL =================

function revealSections() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("active");
    }
  });
}

// ================= ENQUIRY MESSAGE =================

function showMessage() {
  alert("Thank you! Our travel expert will contact you shortly 🌍✈");
}





