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

// 3. WHATSAPP INQUIRY LOGIC
function handleInquiry(tourName = "General Inquiry") {
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const plan = document.getElementById("contactPlan").value;

    if(!name || !phone) {
        alert("Please enter your Name and Phone number");
        return;
    }

    const message = `Hi Cogo Tours! %0A My Name: ${name} %0A Interested in: ${tourName} %0A Message: ${plan}`;
    window.open(`https://wa.me/919884066830?text=${message}`, '_blank');
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


