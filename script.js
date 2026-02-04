// 1. TOUR DATABASE
const tours = [
    { title: "Refreshing Ooty", cat: "domestic", price: "₹9,999", img: "cogo1.jpeg", desc: "3 Days / 2 Nights trip to Ooty." },
    { title: "Dubai City Lights", cat: "international", price: "₹48,500", img: "cogotours1.jpeg", desc: "Explore Burj Khalifa & Desert Safari." },
    { title: "Spiritual Madurai", cat: "pilgrimage", price: "₹4,500", img: "cogoindian.jpeg", desc: "Meenakshi Amman Temple visit." },
    { title: "Singapore & Malaysia", cat: "international", price: "₹65,000", img: "cogotours1.jpeg", desc: "5 Days of fun at Universal Studios." },
    { title: "Magical Munnar", cat: "domestic", price: "₹11,000", img: "cogo1.jpeg", desc: "Tea gardens and waterfalls." },
    { title: "Chennai Local Pride", cat: "chennai", price: "₹2,500", img: "cogoindian.jpeg", desc: "Marina Beach and local sights." }
];

// 2. DISPLAY TOURS
function displayTours(filter = "all") {
    const container = document.getElementById("tourContainer");
    if(!container) return;
    container.innerHTML = ""; 

    const filteredTours = tours.filter(t => filter === "all" || t.cat === filter);

    filteredTours.forEach(tour => {
        const html = `
            <div class="tour-card">
                <img src="${tour.img}" alt="${tour.title}">
                <div class="tour-card-body">
                    <h3>${tour.title}</h3>
                    <p>${tour.desc}</p>
                    <p class="price-tag">${tour.price}</p>
                    <button class="submit-btn" style="padding: 10px; margin-top: 10px;" onclick="sendInquiry('${tour.title}')">Enquire Now</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

// 3. WHATSAPP FUNCTION
function sendInquiry(tourName = "General Inquiry") {
    const name = document.getElementById("contactName")?.value || "";
    const phone = document.getElementById("contactPhone")?.value || "";
    const email = document.getElementById("contactEmail")?.value || "";
    const plan = document.getElementById("contactPlan")?.value || "";

    if (!name || !phone) {
        alert("Please enter your Name and Phone number");
        return;
    }

    let msg = `Hi Cogo Tours! 👋%0A%0A`;
    msg += `*Enquiry for:* ${tourName}%0A`;
    msg += `👤 *Name:* ${encodeURIComponent(name)}%0A`;
    msg += `📞 *Phone:* ${encodeURIComponent(phone)}%0A`;
    if(email) msg += `📧 *Email:* ${encodeURIComponent(email)}%0A`;
    msg += `📝 *Plan:* ${encodeURIComponent(plan)}`;

    window.open(`https://wa.me/919884066830?text=${msg}`, '_blank');
}
}

// 4. FILTERS & SCROLL
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
    
    const backTopBtn = document.getElementById("backToTop");
    if(window.scrollY > 300) backTopBtn.style.display = "flex";
    else backTopBtn.style.display = "none";
});

document.getElementById("backToTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// INITIALIZE
displayTours();

