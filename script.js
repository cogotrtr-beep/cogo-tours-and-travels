/* =========================================================
   COGO TOURS - INTERACTIVE MULTI-TAB SERVICE ENGINE
========================================================= */

const categoryData = {
  chennai: {
    title: "🏛️ Tour Chennai Packages",
    desc: "Explore top tourist spots around Chennai and coastal Tamil Nadu.",
    tabs: [
      {
        name: "City Sightseeing",
        content: "<strong>Chennai City Day Tour:</strong> Marina Beach, Kapaleeshwarar Temple, San Thome Basilica, Fort St. George, and Government Museum."
      },
      {
        name: "ECR & Coastal",
        content: "<strong>ECR Beach Route:</strong> Muttukadu Boat House, Kovalam Beach, DakshinaChitra Heritage Village, and Tiger Cave."
      },
      {
        name: "Heritage & Temples",
        content: "<strong>Heritage Tour:</strong> Mahabalipuram Shore Temple, Pancha Rathas, and Kanchipuram Silk & Temple circuit."
      },
      {
        name: "Theme Parks",
        content: "<strong>Fun Outings:</strong> VGP Universal Kingdom, MGM Dizzee World, and Queens Land day trip transfers."
      }
    ]
  },
  domestic: {
    title: "🏔️ Tour Domestic Packages",
    desc: "Handcrafted Indian holiday itineraries.",
    tabs: [
      { name: "Kerala", content: "<strong>God's Own Country:</strong> Munnar Tea Gardens, Alleppey Houseboat, Wayanad & Thekkady." },
      { name: "Hill Stations", content: "<strong>Cool Getaways:</strong> Ooty Botanical Gardens, Kodaikanal Lake, and Coonoor Toy Train." },
      { name: "Goa & North", content: "<strong>Beach & Mountains:</strong> Goa holiday packages, Kashmir Valley, and Manali trips." }
    ]
  },
  international: {
    title: "🌍 Tour International Packages",
    desc: "Complete foreign tour packages including flight & visa support.",
    tabs: [
      { name: "Dubai", content: "<strong>Dubai Highlights:</strong> Burj Khalifa, Desert Safari, Marina Cruise & Dubai Mall." },
      { name: "Thailand", content: "<strong>Thailand Trips:</strong> Bangkok City, Pattaya Coral Island & Phuket Beach Resorts." },
      { name: "Singapore & Bali", content: "<strong>Island Escapes:</strong> Sentosa Island, Universal Studios, and Bali Luxury Villas." }
    ]
  },
  cabs: {
    title: "🚖 Cogo Cabs Rates & Rental",
    desc: "Affordable local and outstation taxi hires.",
    tabs: [
      {
        name: "Local Hourly",
        content: "<ul><li><strong>Sedan:</strong> ₹1,400 (50 km / 5 Hrs)</li><li><strong>Innova:</strong> ₹2,000 (50 km / 5 Hrs)</li><li><strong>Innova Crysta:</strong> ₹4,600 (100 km / 10 Hrs)</li></ul>"
      },
      {
        name: "Outstation Packs",
        content: "<ul><li><strong>Sedan:</strong> ₹4,500 (250 km Day Pack)</li><li><strong>Innova:</strong> ₹6,000 (250 km Day Pack)</li><li><strong>Innova Crysta:</strong> ₹6,750 (250 km Day Pack)</li></ul>"
      }
    ]
  }
};

const defaultCategoryInfo = {
  corporate: { title: "💼 Corporate Tour", desc: "Team outings, MICE events & resort bookings.", content: "Custom resort packages, executive transport, and team-building retreats." },
  students: { title: "🎓 School / College Tour", desc: "Safe student group travel.", content: "Industrial Visits (IVs), educational field trips, and leisure student tours." },
  pilgrim: { title: "🛕 Pilgrim Tours", desc: "Spiritual temple circuits.", content: "Tirupati Balaji Darshan, Rameswaram, Kanchipuram, and Chidambaram packages." },
  adventure: { title: "🏕️ Adventure Tours", desc: "Outdoor thrill expeditions.", content: "Jungle camping, river rafting, trekking, and water sports packages." },
  honeymoon: { title: "👩‍❤️‍👨 Honeymoon Packages", desc: "Romantic couple getaways.", content: "Candlelight dinners, luxury resort stays, and private cabs in Munnar, Wayanad & Bali." },
  visa: { title: "🛂 Visa Assistance", desc: "Worldwide tourist visa processing.", content: "Fast documentation & appointment assistance for Dubai, UK, USA, Europe & Asia." },
  tickets: { title: "✈️ Ticket Booking Air/Rail", desc: "Instant travel ticketing.", content: "Best rates for Flight, Train, and Intercity Volvo Bus tickets." },
  cabservices: { title: "🚘 Cab Services", desc: "Long distance and corporate fleet.", content: "Round-trip outstation cabs, one-way drops, and monthly corporate vehicle rentals." }
};

let activeServiceTitle = "General Journey Enquiry";

function openCategoryModal(catKey) {
  const data = categoryData[catKey];
  const subTabContainer = document.getElementById("modalSubTabs");
  const contentBody = document.getElementById("modalDynamicContent");

  subTabContainer.innerHTML = "";

  if (data && data.tabs) {
    activeServiceTitle = data.title;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalDescription").textContent = data.desc;

    data.tabs.forEach((tab, index) => {
      const btn = document.createElement("button");
      btn.className = `sub-tab-btn ${index === 0 ? 'active' : ''}`;
      btn.textContent = tab.name;
      btn.onclick = () => {
        document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        contentBody.innerHTML = tab.content;
      };
      subTabContainer.appendChild(btn);
    });

    contentBody.innerHTML = data.tabs[0].content;

  } else {
    const fallback = defaultCategoryInfo[catKey] || { title: "Enquiry", desc: "", content: "Please contact us for more information." };
    activeServiceTitle = fallback.title;
    document.getElementById("modalTitle").textContent = fallback.title;
    document.getElementById("modalDescription").textContent = fallback.desc;
    contentBody.innerHTML = fallback.content;
  }

  document.getElementById("enquiryModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function openEnquiryForm(title) {
  activeServiceTitle = title;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = "Fill in your details below to request a personalized itinerary or quote.";
  document.getElementById("modalSubTabs").innerHTML = "";
  document.getElementById("modalDynamicContent").innerHTML = "";

  document.getElementById("enquiryModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("enquiryModal").classList.remove("show");
  document.body.style.overflow = "";
}

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
