const tours = [
{ title: "Refreshing Ooty", cat: "domestic", price: "₹9,999", img: "cogo1.jpeg" },
{ title: "Dubai City Lights", cat: "international", price: "₹48,500", img: "cogotours1.jpeg" },
{ title: "Singapore Special", cat: "international", price: "₹65,000", img: "cogotours1.jpeg" }
];

function displayTours() {
var container = document.getElementById("tourContainer");
if (!container) return;
container.innerHTML = "";
tours.forEach(function(tour) {
container.innerHTML += '<div class="tour-card"><img src="' + tour.img + '"><div class="tour-card-body"><h3>' + tour.title + '</h3><p style="color:#ff5a00; font-weight:bold;">' + tour.price + '</p></div></div>';
});
}

window.onscroll = function() {
var nav = document.getElementById("mainNav");
var btt = document.getElementById("backToTop");
var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

if (scrollPos > 50) { nav.classList.add("sticky"); } else { nav.classList.remove("sticky"); }
if (scrollPos > 400) { btt.style.display = "flex"; } else { btt.style.display = "none"; }
};

window.onload = function() {
displayTours();
};
