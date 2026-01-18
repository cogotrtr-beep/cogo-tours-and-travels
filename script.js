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
function showTourInfo(event) {
  event.preventDefault();

  // Hide all tour info boxes
  document.querySelectorAll(".tour-info").forEach((box) => {
    box.style.display = "none";
  });

  // Show the selected one
  const selectedId = document.getElementById("domesticTour").value;
  if (!selectedId) return;

  const showBox = document.getElementById(selectedId);
  if (showBox) {
    showBox.style.display = "block";
  }
}

















