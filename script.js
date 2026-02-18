const tours = [
    { title: "Refreshing Ooty", cat: "domestic", price: "₹9,999", img: "cogo1.jpeg", desc: "3 Days / 2 Nights trip." },
    { title: "Dubai City Lights", cat: "international", price: "₹48,500", img: "cogotours1.jpeg", desc: "Explore Burj Khalifa & Safari." },
    { title: "Spiritual Madurai", cat: "domestic", price: "₹4,500", img: "cogoindian.jpeg", desc: "Meenakshi Amman Temple visit." },
    { title: "Singapore & Malaysia", cat: "international", price: "₹65,000", img: "cogotours1.jpeg", desc: "Universal Studios fun." },
    { title: "Magical Munnar", cat: "domestic", price: "₹11,000", img: "cogo1.jpeg", desc: "Tea gardens and waterfalls." },
    { title: "Europe Wonders", cat: "international", price: "₹1,45,000", img: "cogotours1.jpeg", desc: "Multi-country highlights tour." }
];

function displayTours(filter = "all") {
    const container = document.getElementById("tourContainer");
    if (!container) return;
    container.innerHTML = ""; 
    
    const filtered = tours.filter(t => filter === "all" || t.cat === filter);
    
    filtered.forEach(tour => {
        const html = `
            <div class="tour-card">
                <img src="${tour.img}" alt="${tour.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Cogo+Tours'">
                <div class="tour-card-body">
                    <span class="category-tag">${tour.cat.toUpperCase()}</span>
                    <h3>${tour.title}</h3>
                    <p>${tour.desc}</p>
                    <p style="color:#ff5a00; font-weight:bold; font-size:1.2rem;">${tour.price}</p>
                    <button class="submit-btn" style="padding:10px; margin-top:10px; background:#0f172a;" onclick="quickEnquiry('${tour.title}')">Enquire Now</button>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', html);
    });
}

// Specific function for clicking a tour card
function quickEnquiry(tourName) {
    let msg = `Hi Cogo Tours!%0A%0AI am interested in the *${tourName}* package. Please share more details.`;
    window.open(`https://wa.me/919884066830?text=${msg}`, "_blank");
}

// Function for the main contact form
function sendInquiry() {
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const plan = document.getElementById("contactPlan").value;

    if (!name || !phone) { 
        alert("Please enter your Name and Phone number so we can reach you!"); 
        return; 
    }

    let msg = `Hi Cogo Tours!%0A%0A*New Website Inquiry*%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *Phone:* ${encodeURIComponent(phone)}%0A📝 *Plan:* ${encodeURIComponent(plan)}`;
    window.open(`https://wa.me/919884066830?text=${msg}`, "_blank");
}

window.onload = () => {
    displayTours();
    
    // Setup Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.filter-btn.active').classList.remove('active');
            this.classList.add('active');
            displayTours(this.getAttribute('data-filter'));
        });
    });

    // Scroll Logic
    window.onscroll = () => {
        const nav = document.getElementById('mainNav');
        const btt = document.getElementById('backToTop');
        
        // Sticky Nav logic
        if (window.scrollY > 100) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
        
        // Back to top visibility
        btt.style.display = window.scrollY > 400 ? "flex" : "none";
    };
};
