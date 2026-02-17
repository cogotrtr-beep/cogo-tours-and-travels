const tours = [
    { title: "Refreshing Ooty", cat: "domestic", price: "₹9,999", img: "cogo1.jpeg", desc: "3 Days / 2 Nights trip." },
    { title: "Dubai City Lights", cat: "international", price: "₹48,500", img: "cogotours1.jpeg", desc: "Explore Burj Khalifa & Safari." },
    { title: "Spiritual Madurai", cat: "pilgrimage", price: "₹4,500", img: "cogoindian.jpeg", desc: "Meenakshi Amman Temple visit." },
    { title: "Singapore & Malaysia", cat: "international", price: "₹65,000", img: "cogotours1.jpeg", desc: "Universal Studios fun." },
    { title: "Magical Munnar", cat: "domestic", price: "₹11,000", img: "cogo1.jpeg", desc: "Tea gardens and waterfalls." },
    { title: "Chennai Local Pride", cat: "chennai", price: "₹2,500", img: "cogoindian.jpeg", desc: "Marina Beach tour." }
];

function displayTours(filter = "all") {
    const container = document.getElementById("tourContainer");
    if (!container) return;
    container.innerHTML = ""; 
    const filtered = tours.filter(t => filter === "all" || t.cat === filter);
    filtered.forEach(tour => {
        const html = `
            <div class="tour-card">
                <img src="${tour.img}" alt="${tour.title}">
                <div class="tour-card-body">
                    <h3>${tour.title}</h3>
                    <p>${tour.desc}</p>
                    <p style="color:#ff5a00; font-weight:bold; font-size:1.2rem;">${tour.price}</p>
                    <button class="submit-btn" style="padding:8px; margin-top:10px;" onclick="sendInquiry('${tour.title}')">Enquire Now</button>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', html);
    });
}

function sendInquiry(tourName = "General Inquiry") {
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const email = document.getElementById("contactEmail").value;
    const plan = document.getElementById("contactPlan").value;

    if (!name || !phone) { alert("Please enter Name and Phone!"); return; }

    let msg = `Hi Cogo Tours!%0A%0A*Enquiry:* ${tourName}%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *Phone:* ${encodeURIComponent(phone)}%0A📝 *Plan:* ${encodeURIComponent(plan)}`;
    window.open(`https://wa.me/919884066830?text=${msg}`, "_blank");
}

window.onload = () => {
    displayTours();
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            displayTours(btn.getAttribute('data-filter'));
        };
    });
  window.onscroll = function() {
const nav = document.getElementById('mainNav');
const btt = document.getElementById('backToTop');

};

// This makes the button actually scroll you back to the top
document.getElementById('backToTop').onclick = () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
};

