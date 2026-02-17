try {
const tours = [
{ title: "Refreshing Ooty", price: "₹9,999", img: "cogo1.jpeg" },
{ title: "Dubai City Lights", price: "₹48,500", img: "cogotours1.jpeg" },
{ title: "Singapore Special", price: "₹65,000", img: "cogotours1.jpeg" }
];

function displayTours() {
var container = document.getElementById("tourContainer");
if (!container) return;
container.innerHTML = "";
tours.forEach(function(t) {
container.innerHTML += '<div class="tour-card" style="border:1px solid #ddd; margin:10px; border-radius:10px; overflow:hidden;"><img src="' + t.img + '" style="width:100%; height:200px; object-fit:cover;"><div style="padding:15px;"><h3>' + t.title + '</h3><p style="color:orange; font-weight:bold;">' + t.price + '</p></div></div>';
});
}

window.onscroll = function() {
var nav = document.getElementById("mainNav");
var btt = document.getElementById("backToTop");
var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

};

window.onload = function() {
displayTours();
};

function sendInquiry() {
var name = document.getElementById("contactName").value;
window.open(", I am " + name);
}
} catch (e) { console.log("Error: ", e); }
