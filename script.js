/* =========================================================
   CATEGORY HUB MODAL HANDLER (11 CATEGORIES)
========================================================= */

// Content data for each category modal view
const categoryData = {
  cabs: {
    title: "🚖 Cogo Cabs Rates & Packages",
    desc: "Comfortable air-conditioned vehicles with experienced drivers.",
    body: `
      <div class="modal-rate-card">
        <h4>Chennai City Sightseeing Rates</h4>
        <ul>
          <li><strong>Sedan:</strong> ₹1,400 (50 km) | Day Pack (250 km): ₹4,500</li>
          <li><strong>Innova:</strong> ₹2,000 (50 km) | Day Pack (250 km): ₹6,000</li>
          <li><strong>Innova Crysta:</strong> ₹4,600 (10H / 100 km) | Day Pack (250 km): ₹6,750</li>
        </ul>
        <p><em>*Luxury cars, Urbania, Tempo Traveller, and Buses are also available at competitive rates!</em></p>
      </div>`
  },
  tickets: {
    title: "✈️ Flight, Train & Bus Ticket Booking",
    desc: "Get fast booking assistance for all domestic and international travel.",
    body: "<p>Tell us your travel dates, departure city, and destination. We will find the best routes and fares for you!</p>"
  },
  visa: {
    title: "🛂 Visa Assistance Services",
    desc: "Hassle-free tourist and business visa application support.",
    body: "<p>We assist with documentation, appointment scheduling, and verification for Dubai, Singapore, Thailand, Schengen, UK, USA, and more.</p>"
  },
  chennai: {
    title: "🏛️ Tour Chennai Packages",
    desc: "Explore top attractions around Chennai and coastal Tamil Nadu.",
    body: `
      <ul>
        <li>Mahabalipuram & Thirukazhukundram</li>
        <li>Kanchipuram Temple Tour</li>
        <li>Periyapalayam & Thiruthani</li>
        <li>ECR Coastal Tour (DakshinaChitra, Muttukadu Boating, Kovalam, Crocodile Park, Tiger Cave)</li>
        <li>Theme Parks (MGM Dizzee World, VGP Universal Kingdom)</li>
      </ul>`
  },
  domestic: {
    title: "🏔️ Domestic Tour Packages",
    desc: "Tailor-made itineraries across India's top tourist destinations.",
    body: "<p>Popular destinations: Kerala Backwaters, Goa Beaches, Himachal Pradesh, Kashmir, Ooty, Kodaikanal, and Coorg.</p>"
  },
  international: {
    title: "🌍 International Packages",
    desc: "Complete foreign tour packages including flights, stays, and sightseeings.",
    body: "<p>Popular getaways: Thailand, Malaysia, Singapore, Dubai, Bali, Sri Lanka, and Vietnam.</p>"
  },
  pilgrim: {
    title: "🛕 Pilgrim Tours",
    desc: "Spiritual, hassle-free temple tours with comfortable transport.",
    body: "<p>Special packages for Tirupati Balaji Darshan, Kanchipuram, Rameswaram, Madurai, Thiruvannamalai, and Chidambaram.</p>"
  },
  students: {
    title: "🎓 School & College Tours",
    desc: "Safe, educational, and fun group trips for students.",
    body: "<p>Customized itineraries for Industrial Visits (IVs), educational tours, and leisure trips with dedicated group coordinators.</p>"
  },
  corporate: {
    title: "💼 Corporate Tour Packages",
    desc: "Professional offsites, team bonding outings, and MICE events.",
    body: "<p>Includes resort bookings, team-building activities, conference arrangements, and luxury bus rentals.</p>"
  },
  honeymoon: {
    title: "👩‍❤️‍👨 Honeymoon Packages",
    desc: "Romantic, private, and memorable couple escapes.",
    body: "<p>Features candlelight dinners, flower bed decorations, private cabs, and scenic luxury resorts in Munnar, Wayanad, Manali, and Bali.</p>"
  },
  adventure: {
    title: "🏕️ Adventure Tours",
    desc: "Thrilling trips for trekkers, campers, and outdoor enthusiasts.",
    body: "<p>Includes jungle camping, river rafting, trekking expeditions, scuba diving, and water sports packages.</p>"
  }
};

// Function called when clicking "View Rates" / "Explore" on any card
function openCategoryModal(catKey) {
  const data = categoryData[catKey];
  if (!data) return;

  const modal = document.getElementById("enquiryModal");
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
