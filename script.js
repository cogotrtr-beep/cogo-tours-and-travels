const reveals = document.querySelectorAll(".reveal");
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  reveals.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });

  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



