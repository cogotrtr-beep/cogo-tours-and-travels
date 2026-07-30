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
        content: `
          <div class="tariff-box">
            <h4>📍 Chennai City Day Tour (5 Hours Package)</h4>
            <p><strong>Covered Attractions:</strong> Marina Beach, Kapaleeshwarar Temple, San Thome Basilica, Fort St. George, &amp; Government Museum.</p>
            <ul class="tariff-list">
              <li><span> Sedan (4 Seater):</span> <span class="tariff-badge">₹1,400 (50 KM / 5 Hrs)</span></li>
              <li><span> Innova (7 Seater):</span> <span class="tariff-badge">₹2,000 (50 KM / 5 Hrs)</span></li>
            </ul>
          </div>
        `
      },
      {
        name: "ECR & Coastal",
        content: `
          <div class="tariff-box">
            <h4>🌊 ECR Beach & Coastal Run (10 Hours Package)</h4>
            <p><strong>Covered Attractions:</strong> Muttukadu Boat House, Kovalam Beach, DakshinaChitra Heritage Village, &amp; Tiger Cave.</p>
            <ul class="tariff-list">
              <li><span> Sedan (4 Seater):</span> <span class="tariff-badge">₹2,800 (100 KM / 10 Hrs)</span></li>
              <li><span> Innova (7 Seater):</span> <span class="tariff-badge">₹4,000 (100 KM / 10 Hrs)</span></li>
              <li><span> Innova Crysta:</span> <span class="tariff-badge">₹4,600 (100 KM / 10 Hrs)</span></li>
            </ul>
          </div>
        `
      },
      {
        name: "Heritage & Temples",
        content: `
          <div class="tariff-box">
            <h4>🛕 Heritage & Silk City Tour (10 Hours Package)</h4>
            <p><strong>Covered Attractions:</strong> Mahabalipuram Shore Temple, Pancha Rathas, &amp; Kanchipuram Temple Circuits.</p>
            <ul class="tariff-list">
              <li><span> Sedan (4 Seater):</span> <span class="tariff-badge">₹2,800 (100 KM / 10 Hrs)</span></li>
              <li><span> Innova (7 Seater):</span> <span class="tariff-badge">₹4,000 (100 KM / 10 Hrs)</span></li>
              <li><span> Innova Crysta:</span> <span class="tariff-badge">₹4,600 (100 KM / 10 Hrs)</span></li>
            </ul>
          </div>
        `
      },
      {
        name: "Theme Parks",
        content: `
          <div class="tariff-box">
            <h4>🎢 Amusement & Theme Park Express (10 Hours Package)</h4>
            <p><strong>Covered Attractions:</strong> VGP Universal Kingdom, MGM Dizzee World, &amp; Queens Land full-day transfers.</p>
            <ul class="tariff-list">
              <li><span> Sedan (4 Seater):</span> <span class="tariff-badge">₹2,800 (100 KM / 10 Hrs)</span></li>
              <li><span> Innova (7 Seater):</span> <span class="tariff-badge">₹4,000 (100 KM / 10 Hrs)</span></li>
              <li><span> Innova Crysta:</span> <span class="tariff-badge">₹4,600 (100 KM / 10 Hrs)</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  domestic: {
    title: "🏔️ Tour Domestic Packages",
    desc: "Handcrafted Indian holiday itineraries. Swipe to explore our featured package flyers!",
    tabs: [
      { 
        name: "Featured Pamphlets", 
        content: `
          <div class="pamphlet-swiper">
            <div class="pamphlet-card">
              <img src="domestic-flyer.png" alt="Domestic Package Flyer 1">
            </div>
            <div class="pamphlet-card">
              <img src="domestic-flyer2.png" alt="Domestic Package Flyer 2">
            </div>
            <div class="pamphlet-card">
              <img src="domestic-flyer3.png" alt="Domestic Package Flyer 3">
            </div>
          </div>
          <p style="text-align: center; margin-top: 10px; font-weight: bold; color: #475569;">👉 Swipe left/right to view all flyers</p>
        ` 
      },
      { name: "Kerala", content: "<div class='tariff-box'><strong>God's Own Country:</strong> Munnar Tea Gardens, Alleppey Houseboat, Wayanad &amp; Thekkady.</div>" },
      { name: "Hill Stations", content: "<div class='tariff-box'><strong>Cool Getaways:</strong> Ooty Botanical Gardens, Kodaikanal Lake, and Coonoor Toy Train.</div>" },
      { name: "Goa & North", content: "<div class='tariff-box'><strong>Beach & Mountains:</strong> Goa holiday packages, Kashmir Valley, and Manali trips.</div>" }
    ]
  },
  international: {
    title: "🌍 Tour International Packages",
    desc: "Complete foreign tour packages including flight &amp; visa support.",
    tabs: [
      { name: "Dubai", content: "<div class='tariff-box'><strong>Dubai Highlights:</strong> Burj Khalifa, Desert Safari, Marina Cruise &amp; Dubai Mall.</div>" },
      { name: "Thailand", content: "<div class='tariff-box'><strong>Thailand Trips:</strong> Bangkok City, Pattaya Coral Island &amp; Phuket Beach Resorts.</div>" },
      { name: "Singapore & Bali", content: "<div class='tariff-box'><strong>Island Escapes:</strong> Sentosa Island, Universal Studios, and Bali Luxury Villas.</div>" }
    ]
  },
  cabs: {
    title: "🚖 Cogo Cabs Rates & Rental",
    desc: "Affordable local and outstation taxi hires.",
    tabs: [
      {
        name: "Local Hourly",
        content: `
          <div class="tariff-box">
            <h4>⏱️ Local City Hourly Package</h4>
            <ul class="tariff-list">
              <li><span> Sedan (50 KM / 5 Hrs):</span> <span class="tariff-badge">₹1,400</span></li>
              <li><span> Innova (50 KM / 5 Hrs):</span> <span class="tariff-badge">₹2,000</span></li>
              <li><span> Innova Crysta (100 KM / 10 Hrs):</span> <span class="tariff-badge">₹4,600</span></li>
            </ul>
          </div>
        `
      },
      {
        name: "Outstation Packs",
        content: `
          <div class="tariff-box">
            <h4>🛣️ Outstation Day Packages</h4>
            <ul class="tariff-list">
              <li><span> Sedan (250 KM Day Pack):</span> <span class="tariff-badge">₹4,500</span></li>
              <li><span> Innova (250 KM Day Pack):</span> <span class="tariff-badge">₹6,000</span></li>
              <li><span> Innova Crysta (250 KM Day Pack):</span> <span class="tariff-badge">₹6,750</span></li>
            </ul>
          </div>
        `
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
      const colorClass = `tab-color-${index % 4}`;
      btn.className = `sub-tab-btn ${colorClass} ${index === 0 ? 'active' : ''}`;
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
    contentBody.innerHTML = `<div class="tariff-box"><p>${fallback.content}</p></div>`;
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
    window.location.href = `mailto:cogotrtr@gmail.com?subject=${subject}&body=${body}`;
  }

  closeModal();
}
