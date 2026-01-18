const nav = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");

// Sticky nav + top button
window.addEventListener("scroll", () => {
  if (scrollY > 120) {
    nav.classList.add("sticky");
    topBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    topBtn.style.display = "none";
  }

  revealSections();
});

// Back to top
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Scroll reveal
function revealSections() {
  document.querySelectorAll(".reveal").forEach(sec => {
    let windowHeight = window.innerHeight;
    let sectionTop = sec.getBoundingClientRect().top;

    if (sectionTop < windowHeight - 100) {
      sec.classList.add("active");
    }
  });
}

// Enquiry message
function showMessage(e) {
  e.preventDefault();
  alert("Thank you! Our travel expert will contact you shortly 🌍✈");
  e.target.reset();
}
function goTourInfo(event) {
  event.preventDefault(); // stop page refresh

  const selected = document.getElementById("domesticTour").value;
  if (!selected) return;

  const section = document.getElementById(selected);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });

    // ✅ Optional: highlight effect for 2 seconds
    section.style.boxShadow = "0 0 0 6px rgba(10,92,255,0.25)";
    section.style.borderRadius = "18px";

    setTimeout(() => {
      section.style.boxShadow = "none";
    }, 2000);
  }
}
















