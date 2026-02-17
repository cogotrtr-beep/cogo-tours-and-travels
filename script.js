const tours = [
{ title: "Refreshing Ooty", cat: "domestic", price: "₹9,999", img: "cogo1.jpeg", desc: "3 Days / 2 Nights trip." },
{ title: "Dubai City Lights", cat: "international", price: "₹48,500", img: "cogotours1.jpeg", desc: "Burj Khalifa & Safari." },
{ title: "Singapore Special", cat: "international", price: "₹65,000", img: "cogotours1.jpeg", desc: "Universal Studios fun." }
];

function displayTours(filter = "all") {
const container = document.getElementById("tourContainer");
container.innerHTML = "";
const filtered = tours.filter(t => filter === "all" || t.cat === filter);
filtered.forEach(tour => {
container.innerHTML += ** **<div class="tour-card">** **<img src="${tour.img}">** **<div class="tour-card-body">** **<h3>${tour.title}</h3>** **<p>${tour.desc}</p>** **<p style="color:#ff5a00; font-weight:bold;">${tour.price}</p>** **</div>** **</div>;
});
}

window.onscroll = function() {
const nav = document.getElementById("mainNav");
const btt = document.getElementById("backToTop");
if (window.pageYOffset > 50) { nav.classList.add("sticky"); } else { nav.classList.remove("sticky"); }
if (window.pageYOffset > 400) { btt.style.display = "flex"; } else { btt.style.display = "none"; }
};

function sendInquiry() {
const name = document.getElementById("contactName").value;
const msg = Hi Cogo Tours! I am ${name}. I want to plan a trip!;
window.open(https://wa.me/919884066830?text=${encodeURIComponent(msg)});
}

window.onload = () => {
displayTours();
document.querySelectorAll(".filter-btn").forEach(btn => {
btn.onclick = () => {
document.querySelector(".filter-btn.active").classList.remove("active");
btn.classList.add("active");
displayTours(btn.getAttribute("data-filter"));
};
});
};
