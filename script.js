// ============================================
// COGO TOURS & TRAVELS — Script (Clean Version)
// ============================================
// 1. CAB FORM — WhatsApp Submission
document.getElementById('cabForm').addEventListener('submit', function(e) {
e.preventDefault();
const name = document.getElementById('custName').value;
const phone = document.getElementById('custPhone').value;
const pickup = document.getElementById('pickup').value;
const drop = document.getElementById('drop').value;
const date = document.getElementById('pickupDate').value;
const time = document.getElementById('pickupTime').value;
const vehicle = document.getElementById('vehicleType').value;
const trip = document.getElementById('tripType').value;
const message =
`*New Cab Booking Request*%0A` +
`---------------------------%0A` +
` *Name:* ${name}%0A` +
` *Phone:* ${phone}%0A` +
` *Date:* ${date}%0A` +
` *Time:* ${time}%0A` +
` *Pickup:* ${pickup}%0A` +
` *Drop:* ${drop}%0A` +
` *Vehicle:* ${vehicle}%0A` +
` *Package:* ${trip}%0A` +
`---------------------------`;
window.open(`https://wa.me/919884066830?text=${message}`, '_blank');
});
// 2. SMOOTH SCROLL for Nav Links
document.querySelectorAll('.nav-links a').forEach(link => {
link.addEventListener('click', function(e) {
const href = this.getAttribute('href');
if (href.startsWith('#')) {
e.preventDefault();
const target = document.querySelector(href);
if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
});
});
// 3. SCROLL EVENTS — Navbar style + Back to Top visibility
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
const scrolled = window.scrollY > 50;
// Navbar gets slightly more opaque on scroll (handled via class)
document.getElementById('mainNav').classList.toggle('scrolled', scrolled);
// Back to Top button visibility
backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
});
// 4. BACK TO TOP Button
backToTop.addEventListener('click', function() {
window.scrollTo({ top: 0, behavior: 'smooth' });
});