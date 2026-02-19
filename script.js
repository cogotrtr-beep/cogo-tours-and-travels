// 1. CAB FORM LOGIC
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

    const myNumber = "919884066830"; 

    const message = `*New Cab Booking Request*%0A` +
                    `--------------------------%0A` +
                    `👤 *Name:* ${name}%0A` +
                    `📞 *Phone:* ${phone}%0A` +
                    `📅 *Date:* ${date}%0A` +
                    `⏰ *Time:* ${time}%0A` +
                    `📍 *Pickup:* ${pickup}%0A` +
                    `🏁 *Drop:* ${drop}%0A` +
                    `🚗 *Vehicle:* ${vehicle}%0A` +
                    `📦 *Package:* ${trip}%0A` +
                    `--------------------------`;

    const whatsappUrl = `https://wa.me/${myNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
});

// 2. SMOOTH SCROLL FIX FOR NAV LINKS (Fixes the 'Home' tab issue)
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Only run this if it's an internal link (starts with #)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 3. BACK TO TOP BUTTON
const backToTop = document.getElementById("backToTop");
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

backToTop.onclick = function() {
  window.scrollTo({top: 0, behavior: 'smooth'});
};
// This makes the navbar change color/size when you scroll
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});
