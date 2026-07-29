/* =========================================================
   COGO TOURS - CATEGORY MODAL & ENQUIRY ENGINE
========================================================= */

const categoryData = {
  chennai: {
    title: "🏛️ Tour Chennai Packages",
    desc: "City sightseeing, temple runs, ECR beach drives & theme park trips.",
    body: `<p><strong>Popular Routes:</strong> Mahabalipuram, Kanchipuram, ECR Coastline, VGP / MGM Theme Parks, and Temple Circuits.</p>`
  },
  domestic: {
    title: "🏔️ Tour Domestic Packages",
    desc: "Tailor-made itineraries across India's top tourist destinations.",
    body: `<p><strong>Destinations:</strong> Kerala Backwaters, Goa, Himachal Pradesh, Kashmir, Ooty, and Kodaikanal.</p>`
  },
  international: {
    title: "🌍 Tour International Packages",
    desc: "Complete foreign tour packages including flights and stays.",
    body: `<p><strong>Destinations:</strong> Dubai, Thailand, Singapore, Malaysia, Bali, Europe, and Sri Lanka.</p>`
  },
  corporate: {
    title: "💼 Corporate Tour Packages",
    desc: "Professional offsites, team outings, and MICE events.",
    body: `<p>Resort bookings, team-building activities, executive cabs, and luxury bus rentals.</p>`
  },
  students: {
    title: "🎓 School / College Tours",
    desc: "Safe, educational, and fun group trips for students.",
    body: `<p>Industrial Visits (IVs), educational field trips, and leisure tours with dedicated coordinators.</p>`
  },
  pilgrim: {
    title: "🛕 Pilgrim Tours",
    desc: "Spiritual, hassle-free temple tours with comfortable transport.",
    body: `<p>Special packages for Tirupati Balaji Darshan, Kanchipuram, Rameswaram, Madurai, and Thiruvannamalai.</p>`
  },
  adventure: {
    title: "🏕️ Adventure Tours",
    desc: "Thrilling trips for trekkers, campers, and outdoor enthusiasts.",
    body: `<p>Jungle camping, river rafting, trekking expeditions, and water sports packages.</p>`
  },
  honeymoon: {
    title: "👩‍❤️‍👨 Honeymoon Packages",
    desc: "Romantic, private, and memorable couple escapes.",
    body: `<p>Includes candlelight dinners, luxury stays, and private cabs in Munnar, Wayanad, Manali, and Bali.</p>`
  },
  cabs: {
    title: "🚖 Cogo Cabs Rates & Rental",
    desc: "AC vehicles with experienced drivers for local and outstation trips.",
    body: `
      <p><strong>Chennai Sightseeing Rates:</strong></p>
      <ul>
        <li>Sedan: ₹1,400 (50 km) | Day Pack (250 km): ₹4,500</li>
        <li>Innova: ₹2,000 (50 km) | Day Pack (250 km): ₹6,000</li>
        <li>Innova Crysta: ₹4,600 (10H/100 km) | Day Pack (250 km): ₹6,750</li>
      </ul>
      <p><small>*Urbania, Tempo Traveller & Buses available on request.</small></p>`
  },
  visa: {
    title: "🛂 Visa Assistance Services",
    desc: "Tourist and business visa application support.",
    body: `<p>Documentation and appointment support for Dubai, Singapore, Thailand, Schengen, UK, and USA.</p>`
  },
  tickets: {
    title: "✈️ Ticket Booking (Air / Rail / Bus)",
    desc: "Fast booking assistance for domestic and foreign travel.",
    body: `<p>Get the best available fares for Flight, Train, and Intercity Volvo Bus tickets.</p>`
  },
  cabservices: {
    title: "🚘 Outstation & Premium Cab Services",
    desc: "Long-distance outstation travel and luxury fleet rentals.",
    body: `<p>Round-trip outstation cabs, one-way drops, corporate monthly rentals, and luxury vehicle hires.</p>`
  }
};

let activeServiceTitle = "General Journey Enquiry";

// Open Modal with Specific Category Info
function openCategoryModal(catKey) {
  const data = categoryData[catKey];
  if (!data) return;

  activeServiceTitle = data.title;
  
  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalDescription").textContent = data.desc;
  document.getElementById("modalDynamicContent").innerHTML = `<div class="modal-body-content">${data.body}</div>`;

  document.getElementById("enquiryModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

// Open Blank Form (For "Plan Your Journey" buttons)
function openEnquiryForm(title) {
  activeServiceTitle = title;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = "Fill in your details below and choose WhatsApp or Email to submit.";
  document.getElementById("modalDynamicContent").innerHTML = "";

  document.getElementById("enquiryModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("enquiryModal").classList.remove("show");
  document.body.style.overflow = "";
}

// Submit via WhatsApp or Email
function submitEnquiry(type) {
  const name = document.getElementById("userName").value.trim();
  const phone = document.getElementById("userPhone").value.trim();
  const query = document.getElementById("userQuery").value.trim();

  if (!name || !phone) {
    alert("Please enter your Name and Phone Number.");
    return;
  }

  const messageText = `Hi Cogo Tours & Travels 👋\n\nI want to enquire about: *${activeServiceTitle}*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💬 *Query:* ${query || "Please share details and package quotes."}`;

  if (type === 'whatsapp') {
    window.open(`https://wa.me/919884066830?text=${encodeURIComponent(messageText)}`, '_blank');
  } else if (type === 'email') {
    const subject = encodeURIComponent(`Enquiry: ${activeServiceTitle} - ${name}`);
    const body = encodeURIComponent(messageText);
    window.location.href = `mailto:cogotours@gmail.com?subject=${subject}&body=${body}`;
  }

  closeModal();
}
