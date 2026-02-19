document.getElementById('cabForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Capture all form values
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const pickup = document.getElementById('pickup').value;
    const drop = document.getElementById('drop').value;
    const date = document.getElementById('pickupDate').value; 
    const time = document.getElementById('pickupTime').value;
    const vehicle = document.getElementById('vehicleType').value;
    const trip = document.getElementById('tripType').value;

    // 2. Your WhatsApp Number (Keep the 91 at the start)
    const myNumber = "919884066830"; 

    // 3. Create the formatted message
    // %0A creates a new line in WhatsApp
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

    // 4. Construct the URL and open WhatsApp
    const whatsappUrl = `https://wa.me/${myNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
});

// Back to Top Button Logic
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
