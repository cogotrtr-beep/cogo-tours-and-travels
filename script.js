const tours = [
{ title: "Refreshing Ooty", price: "₹9,999", img: "cogo1.jpeg" },
{ title: "Dubai City Lights", price: "₹48,500", img: "cogotours1.jpeg" },
{ title: "Singapore Special", price: "₹65,000", img: "cogotours1.jpeg" }
];

function displayTours() {
var container = document.getElementById("tourContainer");
if (container) {
var html = "";
for (var i = 0; i < tours.length; i++) {
html += '<div class="tour-card"><img src="' + tours[i].img + '"><div class="tour-card-body"><h3>' + tours[i].title + '</h3><p style="color:#ff5a00; font-weight:bold;">' + tours[i].price + '</p></div></div>';
}
container.innerHTML = html;
}
}

window.onscroll = function() {
var nav = document.getElementById("mainNav");
var btt = document.getElementById("backToTop");
var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

if (nav) {
if (scrollPos > 50) { nav.classList.add("sticky"); } else { nav.classList.remove("sticky"); }
}

if (btt) {
if (scrollPos > 400) { btt.style.display = "flex"; } else { btt.style.display = "none"; }
}
};

window.onload = function() {
displayTours();
};
