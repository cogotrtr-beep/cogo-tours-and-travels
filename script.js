// YOUR TOUR DATABASE - Add or change tours here!
const tours = [
    { 
        title: "Refreshing Ooty", 
        cat: "domestic", 
        price: "₹9,999", 
        img: "cogo1.jpeg",
        desc: "3 Days / 2 Nights trip to the Queen of Hill Stations."
    },
    { 
        title: "Dubai City Lights", 
        cat: "international", 
        price: "₹48,500", 
        img: "cogotours1.jpeg",
        desc: "Explore Burj Khalifa, Desert Safari, and Gold Souk."
    },
    { 
        title: "Spiritual Madurai", 
        cat: "pilgrimage", 
        price: "₹4,500", 
        img: "cogoindian.jpeg",
        desc: "Divine visit to Meenakshi Amman Temple and local sights."
    },
    { 
        title: "Singapore & Malaysia", 
        cat: "international", 
        price: "₹65,000", 
        img: "cogotours1.jpeg",
        desc: "5 Days of fun at Universal Studios and Sentosa."
    },
    { 
        title: "Magical Munnar", 
        cat: "domestic", 
        price: "₹11,000", 
        img: "cogo1.jpeg", 
        desc: "Tea gardens, waterfalls, and cool mountain breezes."
    },
    { 
        title: "Chennai Local Pride", 
        cat: "chennai", 
        price: "₹2,500", 
        img: "cogoindian.jpeg",
        desc: "Marina Beach, Kapaleeshwarar Temple, and Museum."
    }
];

// 2. FUNCTION TO DISPLAY TOURS
function displayTours(filter = "all") {
    const container = document.getElementById("tourContainer");
    container.innerHTML = ""; // Clear existing

    const filteredTours = tours.filter(t => filter === "all" || t.category === filter);

    filteredTours.forEach(tour => {
        const html = `
            <div class="tour-card">
                <img src="${tour.image}" alt="${tour.title}">
                <div class="tour-card-body">
                    <h3>${tour.title}</h3>
                    <p>${tour.desc}</p>
                    <p class="price-tag">${tour.price}</p>
                    <button class="filter-btn" onclick="handleInquiry('${tour.title}')">Enquire</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

/* ===============================
   ✅ NEW REUSABLE WHATSAPP FUNCTION
================================= */
function sendInquiry(tourName = "General") {
    // 1. Get values from the Contact Form
    const name = document.getElementById("contactName")?.value || "Guest";
    const phone = document.getElementById("contactPhone")?.value || "";
    const email = document.getElementById("contactEmail")?.value || "";
    const plan = document.getElementById("contactPlan")?.value || "";

    // 2. Check if phone is empty
    if (!phone) {
        alert("Please enter your phone number so we can reach you!");
        return;
    }

    // 3. Build the Message
    const msg = `Hi Cogo Tours & Travels! 👋%0A%0A` +
                `My Name: ${name}%0A` +
                `Phone: ${phone}%0A` +
                (email ? `Email: ${email}%0A` : "") +
                `Interested in: ${tourName}%0A` +
                `Plan: ${plan}`;

    // 4. Open WhatsApp
    window.open(`https://wa.me/919884066830?text=${msg}`, "_blank");

    // 5. Show Success Message
    alert("Thank you " + name + "! Your WhatsApp is opening now.");
}

// 4. NAVIGATION & FILTER LOGIC
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        displayTours(btn.dataset.filter);
    });
});

window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if(window.scrollY > 50) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
});

// Start the page
displayTours();
// BACK TO TOP LOGIC
const backTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  // If user scrolls down more than 300px, show the button
  if (window.scrollY > 300) {
    backTopBtn.style.display = "flex";
  } else {
    backTopBtn.style.display = "none";
  }
});

// When the user clicks the button, scroll to the top smoothly
backTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



