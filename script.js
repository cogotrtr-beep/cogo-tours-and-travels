// 1. CAB FORM TO WHATSAPP
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

    const msg = `*New Booking*%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}%0ATime: ${time}%0APickup: ${pickup}%0ADrop: ${drop}%0AVehicle: ${vehicle}%0APackage: ${trip}`;
    window.open(`https://wa.me/919884066830?text=${msg}`, '_blank');
});

// 2. SMOOTH SCROLLING
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 3. BACK TO TOP BUTTON
const btt = document.getElementById("backToTop");
window.onscroll = () => {
  btt.style.display = (window.scrollY > 300) ? "block" : "none";
};
btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
