/* =========================================================
   CATEGORY HUB MODAL HANDLER
========================================================= */

const categoryData = {
  cabs: {
    title: "🚖 Cogo Cabs Rates & Packages",
    desc: "Comfortable air-conditioned vehicles with experienced drivers.",
    body: `
      <div class="modal-rate-card">
        <h4>Chennai City Sightseeing Rates</h4>
        <br>
        <ul>
          <li><strong>Sedan:</strong> ₹1,400 (50 km) | Day Pack (250 km): ₹4,500</li>
          <li><strong>Innova:</strong> ₹2,000 (50 km) | Day Pack (250 km): ₹6,000</li>
          <li><strong>Innova Crysta:</strong> ₹4,600 (10H / 100 km) | Day Pack (250 km): ₹6,750</li>
        </ul>
        <br>
        <p><em>*Luxury cars, Urbania, Tempo Traveller, and Buses are also available at competitive rates!</em></p>
      </div>`
  },
  tickets: {
    title: "✈️ Flight, Train & Bus Ticket Booking",
    desc: "Fast booking assistance for domestic and international travel.",
    body: "<p>Tell us your travel dates and destination, and we will find the best fares for you!</p>"
  },
  visa: {
    title: "🛂 Visa Assistance Services",
    desc: "Tourist and business visa support worldwide.",
    body: "<p>Complete documentation and appointment support for Dubai, Singapore, Thailand, Schengen, UK, USA, and more.</p>"
  },
  chennai: {
    title: "🏛️ Tour Chennai Packages",
    desc: "Explore top attractions around Chennai and coastal Tamil Nadu.",
    body: `
      <ul>
        <li>Mahabalipuram & Thirukazhukundram</li>
        <li>Kanchipuram Temple Tour</li>
        <li>Periyapalayam & Thiruthani</li>
        <li>ECR Coastal Tour (DakshinaChitra, Muttukadu, Kovalam, Tiger Cave)</li>
        <li>Theme Parks (MGM Dizzee World, VGP Universal Kingdom)</li>
      </ul>`
  },
  domestic: {
    title: "🏔️ Domestic Tour Packages",
    desc: "Custom holiday packages across India.",
    body: "<p>Popular getaways: Kerala Backwaters, Goa, Himachal Pradesh, Kashmir, Ooty, and Kodaikanal.</p>"
  },
  international: {
    title: "🌍 International Packages",
    desc: "Complete foreign tour packages.",
    body: "<p>Featured destinations: Thailand, Malaysia, Singapore, Dubai, Bali, Sri Lanka, and Vietnam.</p>"
  },
  pilgrim: {
    title: "🛕 Pilgrim Tours",
    desc: "Spiritual, hassle-free temple tours.",
    body: "<p>Special trips for Tirupati Balaji Darshan, Kanchipuram, Rameswaram, Madurai, and Thiruvannamalai.</p>"
  },
  students: {
    title: "🎓 School & College Tours",
    desc: "Educational trips and group tours for students.",
    body: "<p>Customized Industrial Visits (IVs) and educational packages with full safety and dedicated coordinators.</p>"
  },
  corporate: {
    title: "💼 Corporate Tour Packages",
    desc: "Team outings, offsites, and MICE events.",
    body: "<p>Resort bookings, team-building activities, and luxury transport arrangements.</p>"
  },
  honeymoon: {
    title: "👩‍❤️‍👨 Honeymoon Packages",
    desc: "Romantic couple escapes.",
    body: "<p>Candlelight dinners, luxury stays, and private cabs in Munnar, Wayanad, Manali, and Bali.</p>"
  },
  adventure: {
    title: "🏕️ Adventure Tours",
    desc: "Thrilling trips for trekkers and campers.",
    body: "<p>Jungle camping, river rafting, trekking expeditions, and water sports packages.</p>"
  }
};

let currentSelectedCategory = "General Enquiry";

function openCategoryModal(catKey) {
  const data = categoryData[catKey];
  if (!data) return;

  currentSelectedCategory = data.title;

  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalBody = document.getElementById("modalDynamicContent");

  if (modalTitle) modalTitle.textContent = data.title;
  if (modalDesc) modalDesc.textContent = data.desc;
  if (modalBody) modalBody.innerHTML = data.body;

  if (modal) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}

function closeServiceModal() {
  const modal = document.getElementById("serviceModal");
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
}

function sendModalWhatsApp() {
  const msg = `Hi Cogo Tours & Travels 👋\n\nI would like to enquire about: *${currentSelectedCategory}*.\n\nPlease share details and rates.`;
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, "_blank");
}
