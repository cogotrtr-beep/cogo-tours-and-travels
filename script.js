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
//submit
.tour-form{
  margin-top: 14px;
}

.tour-submit-btn{
  width: 100%;
  margin-top: 12px;
  padding: 12px 14px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(90deg, #16a34a, #0f8a3a);
  color: white;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.25s;
  box-shadow: 0 12px 30px rgba(22, 163, 74, 0.30);
}

.tour-submit-btn:hover{
  transform: translateY(-2px);
}














