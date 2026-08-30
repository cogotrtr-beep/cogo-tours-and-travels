// Force page to scroll to top on mobile load/refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

window.addEventListener('load', function() {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});

/* =========================================================
   COGO TOURS & CABS - DYNAMIC ENGINE & SIGHTSEEING TABS
========================================================= */

// Global State
let activeServiceTitle = "General Journey Enquiry";
let currentPamphletList = [];
let currentPamphletIndex = 0;

// Drag-to-Pan & Zoom State
let currentZoomScale = 1;
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

// Helper function to build slidable pamphlet / destination gallery
function createPamphletGallery(images) {
  if (!images || images.length === 0) return '';

  const cardsHtml = images.map((imgUrl, idx) => `
    <div class="pamphlet-card" onclick="openPamphletZoom(${idx})">
      <img src="${imgUrl}" alt="Destination Preview ${idx + 1}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop';" loading="lazy">
    </div>
  `).join('');

  return `
    <div class="pamphlet-swiper">
      ${cardsHtml}
    </div>
    <p style="text-align: center; font-size: 14px; color: #94a3b8; margin-top: 6px; margin-bottom: 12px;">
      👉 Tap image to zoom | Swipe for more previews
    </p>
  `;
}

// Data for Cogo Cabs & Cab Services
const cogoCabsData = {
  title: "🚕 Cogo Cabs Tariff",
  desc: "Fixed tariffs for Sedan, Innova, Crysta, Urbania & Luxury Vehicles.",
  tabs: [
    {
      name: "Standard & Luxury Rates",
      images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop"],
      content: `
        <div class="tariff-box">
          <h4 style="font-size: 19px;">⚡ Standard Local & Day Rental Rates</h4>
          <ul class="bulletin-list">
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan (50 km)</span> <span class="bullet-price">₹1,400</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova (50 km)</span> <span class="bullet-price">₹2,000</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova Crysta (10 Hrs / 100 km)</span> <span class="bullet-price">₹4,600</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan One Day Pack (250 km)</span> <span class="bullet-price">₹4,500</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova One Day Pack (250 km)</span> <span class="bullet-price">₹6,000</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova Crysta One Day Pack (250 km)</span> <span class="bullet-price">₹6,750</span></li>
          </ul>
          <p style="margin-top: 15px; font-weight: 700; color: #0f172a;">
            🚐 <em>All other luxury cars, Urbania, Tempo Traveller & Buses are available at highly competitive rates.</em>
          </p>
        </div>
      `
    }
  ]
};

// Category Data Engine
const categoryData = {
  cabs: {
    title: "🚖 Cab Booking & Cogo Cabs",
    desc: "Transparent tariffs for local hourly rides, full-day packages & outstation trips.",
    tabs: [
      {
        name: "Local Hourly Rates",
        images: [
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 19px;">📍 City Local Packages</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan (50 km)</span> <span class="bullet-price">₹1,400</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova (50 km)</span> <span class="bullet-price">₹2,000</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova Crysta (10 Hrs / 100 km)</span> <span class="bullet-price">₹4,600</span></li>
            </ul>
          </div>
        `
      },
      {
        name: "One Day Pack (250 km)",
        images: [
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 19px;">🛣️ One Day Outstation / Long Pack (250 km included)</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan One Day Pack</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova One Day Pack</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova Crysta One Day Pack</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
            <p style="margin-top: 12px; font-weight: 700; color: #0f172a;">
              🚍 All other luxury cars, Urbania, Tempo Traveller & Buses are also available with competitive rates.
            </p>
          </div>
        `
      }
    ]
  },
  "cogo-cabs": cogoCabsData,
  cabservices: cogoCabsData,
  chennai: {
    title: "🏛️ Tour Chennai Packages",
    desc: "Explore heritage, temple circuits, coastal ECR, and entertainment hubs.",
    tabs: [
      {
        name: "Vehicle Tariffs",
        images: [
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 19px;">🚗 Chennai Tour Vehicle Tariffs</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan (50 km)</span> <span class="bullet-price">₹1,400</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova (50 km)</span> <span class="bullet-price">₹2,000</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova Crysta (10 Hrs / 100 km)</span> <span class="bullet-price">₹4,600</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan 1-Day Pack (250 km)</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova 1-Day Pack (250 km)</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova Crysta 1-Day Pack (250 km)</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
            <p style="margin-top: 10px; font-weight: bold; color: #1e293b;">
              ✨ All other luxury cars, Urbania, Tempo Travellers & Buses are available at competitive rates!
            </p>
          </div>
        `
      },
      {
        name: "Custom One Day Circuits",
        images: [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1609946782200-d3a39e763137?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 19px;">📍 Custom-Made / Recommended One-Day Tours</h4>
            <p style="font-size: 15px; color: #64748b; margin-bottom: 10px;">Choose any circuit below with vehicle charges based on the reference tariff:</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Mahabalipuram & Thirukazhukundram</span></li>
              <li class="bulletin-item"><span class="bullet-label">Kanchipuram & Thirukazhukundram</span></li>
              <li class="bulletin-item"><span class="bullet-label">Periyapalayam & Thiruthani</span></li>
              <li class="bulletin-item"><span class="bullet-label">Kanchipuram & Thiruthani</span></li>
              <li class="bulletin-item"><span class="bullet-label">Putlur, Thiruvallur, Sriperumbudur, Thirumazhisai & Thiruverkadu</span></li>
              <li class="bulletin-item"><span class="bullet-label">ECR Heritage Circuit: DakshinaChitra, Muttukadu Boating, Kovalam Beach, Crocodile Park, Tiger Cave & Mahabalipuram</span></li>
              <li class="bulletin-item"><span class="bullet-label">Theme Park & Fun: VGP, DakshinaChitra, Muttukadu Boating / Kovalam Beach</span></li>
              <li class="bulletin-item"><span class="bullet-label">Theme Park & Fun: MGM Dizzee World, DakshinaChitra, Muttukadu Boating / Kovalam Beach</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  pilgrim: {
    title: "🛕 Tour Pilgrim Circuits",
    desc: "Sacred temple tours, heritage shrines, and spiritual one-day packages.",
    tabs: [
      {
        name: "Heritage & Sakthi Circuits",
        images: [
          "Images/images/domestic-flyer.png", 
          "Images/images/domestic-flyer2.png"
        ],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 19px;">🛕 Popular One-Day Divine Packages</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Mahabalipuram & Thirukazhukundram</span></li>
              <li class="bulletin-item"><span class="bullet-label">Kanchipuram & Thirukazhukundram</span></li>
              <li class="bulletin-item"><span class="bullet-label">Periyapalayam & Thiruthani</span></li>
              <li class="bulletin-item"><span class="bullet-label">Kanchipuram & Thiruthani</span></li>
              <li class="bulletin-item"><span class="bullet-label">Putlur, Thiruvallur, Sriperumbudur, Thirumazhisai & Thiruverkadu</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  "south-india": {
    title: "🌴 Tour South India",
    desc: "Misty hill stations, pristine beaches, spiritual temples & scenic escapes across South India.",
    tabs: [
      {
        name: "Hill Stations & Nature",
        images: [
          "https://images.unsplash.com/photo-1600100397608-f010e423b971?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 19px;">🏔️ South India Popular Getaways</h4>
            <p style="font-size: 16px;">• Kodaikanal, Ooty, Coonoor, Munnar, Wayanad & Coorg Escapes.</p>
            <p style="font-size: 16px; margin-top: 6px;">• Kerala Backwaters, Alleppey Houseboats & Thekkady Wildlife tours.</p>
          </div>
        `
      },
      {
        name: "Outstation Cab Tariffs",
        images: [
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 19px;">🚗 Outstation Vehicle Rates (250 km / Day Base)</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan One Day Pack</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova One Day Pack</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova Crysta One Day Pack</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
            <p style="margin-top: 10px; font-weight: bold; color: #1e293b;">
              🚘 Luxury Cabs, Urbania, Tempo Travellers & Buses are available for long-distance South India tours.
            </p>
          </div>
        `
      }
    ]
  }
};

const defaultCategoryInfo = {
  tickets: { title: "🎟️ Ticket Booking", desc: "Flight, Train & Bus Reservations.", content: "Instant ticketing assistance." },
  journey: { title: "✈️ Plan Your Journey", desc: "Tailor-made itineraries for your next dream vacation.", content: "Share your travel dates and requirements for custom quotes." },
  ticket: { title: "🎟️ Ticket Booking", desc: "Flight, Train & Bus Reservations.", content: "Instant ticketing assistance." },
  visa: { title: "🛂 Visa Assistance", desc: "Documentation & Processing Support.", content: "End-to-end visa guidance for all international destinations." },
  "north-india": { title: "🏔️ Tour North India", desc: "Golden Triangle, Kashmir, Himachal & Rajasthan.", content: "Customized holiday packages across North India." },
  "north-east": { title: "🏞️ Tour North East", desc: "Gangtok, Darjeeling, Assam & Meghalaya.", content: "Scenic tour packages across the North Eastern states." },
  "rest-of-india": { title: "🧭 Tour Rest of India", desc: "Goa, Gujarat, Odisha & Pan-India Destinations.", content: "Unique tour plans for all Indian states and union territories." },
  international: { title: "✈️ Tour International", desc: "Dubai, Singapore, Thailand, Bali & Europe.", content: "Comprehensive international vacation packages with flight and visa support." },
  corporate: { title: "🏢 Corporate Tour", desc: "MICE, Team Outings & Business Conferences.", content: "Custom corporate packages and transport arrangements." },
  students: { title: "🎓 School & College Tour", desc: "Educational Trips & Student Excursions.", content: "Safe and budget-friendly tours for educational institutions." },
  adventure: { title: "🏕️ Adventure Tour", desc: "Trekking, Camping & Thrill Activities.", content: "Action-packed itineraries for outdoor enthusiasts." },
  honeymoon: { title: "💖 Honeymoon Tour", desc: "Romantic Getaways & Couples' Retreats.", content: "Special honeymoon arrangements with luxury stays and private cabs." }
};

// Main Data configuration for all 12 main categories and their sub-destination tabs
const tourCategoryData = {
  'chennai': {
    title: 'Chennai <br><span>tours</span>',
    tabs: [
      { id: 'pondy', label: 'PONDY', icon: '🏖️', bg: 'Images/images/chennai-main.png', msg: 'Hi Cogo Tours, I want to enquire about Pondy Tour' },
      { id: 'ecr', label: 'ECR', icon: '🛣️', bg: 'Images/images/chennai-main.png', msg: 'Hi Cogo Tours, I want to enquire about ECR Tour' },
      { id: 'kanchi', label: 'KANCHI', icon: '🛕', bg: 'Images/images/chennai-main.png', msg: 'Hi Cogo Tours, I want to enquire about Kanchi Tour' },
      { id: 'marina', label: 'MARINA', icon: '🗼', bg: 'Images/images/chennai-main.png', msg: 'Hi Cogo Tours, I want to enquire about Marina Tour' },
      { id: 'mount', label: 'MOUNT', icon: '⛰️', bg: 'Images/images/chennai-main.png', msg: 'Hi Cogo Tours, I want to enquire about St Thomas Mount Tour' },
      { id: 'omr', label: 'OMR', icon: '🏢', bg: 'Images/images/chennai-main.png', msg: 'Hi Cogo Tours, I want to enquire about OMR Tour' }
    ]
  },
  'pilgrim': {
    title: 'Pilgrim <br><span>tours</span>',
    tabs: [
      { id: 'shirdi', label: 'SHIRDI', icon: '🛕', bg: 'Images/images/pilgrim-main.png', msg: 'Hi Cogo Tours, I want to enquire about Shirdi Tour' },
      { id: 'tirupati', label: 'TIRUPATI', icon: '🚩', bg: 'Images/images/pilgrim-main.png', msg: 'Hi Cogo Tours, I want to enquire about Tirupati Tour' },
      { id: 'kanchipuram', label: 'KANCHI', icon: '⛩️', bg: 'Images/images/pilgrim-main.png', msg: 'Hi Cogo Tours, I want to enquire about Kanchipuram Temple Tour' },
      { id: 'navagraha', label: 'NAVAGRAHA', icon: '🌟', bg: 'Images/images/pilgrim-main.png', msg: 'Hi Cogo Tours, I want to enquire about Navagraha Tour' }
    ]
  },
  'south-india': {
    title: 'South India <br><span>tours</span>',
    tabs: [
      { id: 'kodai', label: 'KODAIKANAL', icon: '⛰️', bg: 'Images/images/south-main.png', msg: 'Hi Cogo Tours, I want to enquire about Kodaikanal Tour' },
      { id: 'kerala', label: 'KERALA', icon: '🌴', bg: 'Images/images/south-main.png', msg: 'Hi Cogo Tours, I want to enquire about Kerala Tour' },
      { id: 'coorg', label: 'COORG', icon: '☕', bg: 'Images/images/south-main.png', msg: 'Hi Cogo Tours, I want to enquire about Coorg Tour' },
      { id: 'ooty', label: 'OOTY', icon: '🌲', bg: 'Images/images/south-main.png', msg: 'Hi Cogo Tours, I want to enquire about Ooty Tour' }
    ]
  },
  'north-india': {
    title: 'North India <br><span>tours</span>',
    tabs: [
      { id: 'delhi', label: 'DELHI', icon: '🕌', bg: 'Images/images/tournorthindia.png', msg: 'Hi Cogo Tours, I want to enquire about Delhi Agra Tour' },
      { id: 'manali', label: 'MANALI', icon: '🏔️', bg: 'Images/images/tournorthindia.png', msg: 'Hi Cogo Tours, I want to enquire about Manali Tour' },
      { id: 'kashmir', label: 'KASHMIR', icon: '❄️', bg: 'Images/images/tournorthindia.png', msg: 'Hi Cogo Tours, I want to enquire about Kashmir Tour' }
    ]
  },
  'north-east': {
    title: 'North East <br><span>tours</span>',
    tabs: [
      { id: 'gangtok', label: 'GANGTOK', icon: '🏞️', bg: 'Images/images/tournortheast.png', msg: 'Hi Cogo Tours, I want to enquire about Gangtok Tour' },
      { id: 'darjeeling', label: 'DARJEELING', icon: '🍃', bg: 'Images/images/tournortheast.png', msg: 'Hi Cogo Tours, I want to enquire about Darjeeling Tour' },
      { id: 'meghalaya', label: 'MEGHALAYA', icon: '🌧️', bg: 'Images/images/tournortheast.png', msg: 'Hi Cogo Tours, I want to enquire about Meghalaya Tour' }
    ]
  },
  'rest-of-india': {
    title: 'Rest of India <br><span>tours</span>',
    tabs: [
      { id: 'goa', label: 'GOA', icon: '🏖️', bg: 'Images/images/tourrestofindia.png', msg: 'Hi Cogo Tours, I want to enquire about Goa Package' },
      { id: 'gujarat', label: 'GUJARAT', icon: '🦁', bg: 'Images/images/tourrestofindia.png', msg: 'Hi Cogo Tours, I want to enquire about Gujarat Package' }
    ]
  },
  'international': {
    title: 'International <br><span>tours</span>',
    tabs: [
      { id: 'dubai', label: 'DUBAI', icon: '🏙️', bg: 'Images/images/tourinternational.png', msg: 'Hi Cogo Tours, I want to enquire about Dubai Package' },
      { id: 'singapore', label: 'SINGAPORE', icon: '🦁', bg: 'Images/images/tourinternational.png', msg: 'Hi Cogo Tours, I want to enquire about Singapore Package' },
      { id: 'thailand', label: 'THAILAND', icon: '🏝️', bg: 'Images/images/tourinternational.png', msg: 'Hi Cogo Tours, I want to enquire about Thailand Package' }
    ]
  },
  'corporate': {
    title: 'Corporate <br><span>tours</span>',
    tabs: [
      { id: 'mice', label: 'MICE', icon: '🏢', bg: 'Images/images/tourcorporate.png', msg: 'Hi Cogo Tours, I want to enquire about Corporate MICE Trips' },
      { id: 'retreat', label: 'TEAM OUTING', icon: '👔', bg: 'Images/images/tourcorporate.png', msg: 'Hi Cogo Tours, I want to enquire about Team Outings' }
    ]
  },
  'students': {
    title: 'Student <br><span>tours</span>',
    tabs: [
      { id: 'school', label: 'SCHOOL TRIPS', icon: '🎒', bg: 'Images/images/tourschoolcollege.png', msg: 'Hi Cogo Tours, I want to enquire about School Educational Trips' },
      { id: 'college', label: 'COLLEGE IV', icon: '🎓', bg: 'Images/images/tourschoolcollege.png', msg: 'Hi Cogo Tours, I want to enquire about College Industrial Visits' }
    ]
  },
  'adventure': {
    title: 'Adventure <br><span>tours</span>',
    tabs: [
      { id: 'trekking', label: 'TREKKING', icon: '🥾', bg: 'Images/images/touradventure.png', msg: 'Hi Cogo Tours, I want to enquire about Trekking Packages' },
      { id: 'camping', label: 'CAMPING', icon: '🏕️', bg: 'Images/images/touradventure.png', msg: 'Hi Cogo Tours, I want to enquire about Camping Trips' }
    ]
  },
  'honeymoon': {
    title: 'Honeymoon <br><span>tours</span>',
    tabs: [
      { id: 'couples', label: 'ROMANTIC', icon: '💖', bg: 'Images/images/tourhoneymoon.png', msg: 'Hi Cogo Tours, I want to enquire about Honeymoon Packages' }
    ]
  },
  'cabs': {
    title: 'Cogo <br><span>cabs</span>',
    tabs: [
      { id: 'outstation', label: 'OUTSTATION', icon: '🚘', bg: 'Images/images/cogocabs.png', msg: 'Hi Cogo Tours, I want to enquire about Outstation Cab Services' }
    ]
  }
};

let currentActiveTabs = [];

/* =========================================================
   MODAL OPEN / CLOSE HANDLERS
========================================================= */

function openCategoryModal(catKey) {
  if (catKey === 'plan-your-journey' || catKey === 'journey-planning') catKey = 'journey';

  // Check if target is a poster-based category modal
  const categoryPoster = tourCategoryData[catKey];
  const posterModal = document.getElementById('categoryModal');

  if (categoryPoster && posterModal) {
    const posterTitle = document.getElementById('posterTitle');
    const tabsBar = document.getElementById('posterTabsBar');

    if (posterTitle) posterTitle.innerHTML = categoryPoster.title;
    currentActiveTabs = categoryPoster.tabs;

    if (tabsBar) {
      tabsBar.innerHTML = '';
      categoryPoster.tabs.forEach((tab, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `poster-tab ${index === 0 ? 'active' : ''}`;
        btn.onclick = () => selectSubTab(index);
        btn.innerHTML = `<span class="tab-icon">${tab.icon}</span> <span class="tab-label">${tab.label}</span>`;
        tabsBar.appendChild(btn);
      });
    }

    selectSubTab(0);

    // Apply fixed modal overlay styles dynamically
    posterModal.style.position = 'fixed';
    posterModal.style.top = '0';
    posterModal.style.left = '0';
    posterModal.style.width = '100vw';
    posterModal.style.height = '100vh';
    posterModal.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    posterModal.style.zIndex = '99999';
    posterModal.style.display = 'flex';
    posterModal.style.justifyContent = 'center';
    posterModal.style.alignItems = 'center';
    posterModal.style.opacity = '1';
    posterModal.style.pointerEvents = 'auto';

    posterModal.classList.add('show');
    document.body.style.overflow = "hidden";
    return;
  }

  // Fallback to structure-based category modal
  const data = typeof categoryData !== 'undefined' ? categoryData[catKey] : null;
  const subTabContainer = document.getElementById("modalSubTabs");
  if (subTabContainer) subTabContainer.innerHTML = "";

  if (data && data.tabs) {
    activeServiceTitle = data.title;
    const titleElem = document.getElementById("modalTitle");
    const descElem = document.getElementById("modalDescription");

    if (titleElem) titleElem.textContent = data.title;
    if (descElem) descElem.textContent = data.desc;

    data.tabs.forEach((tab, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `sub-tab-btn tab-color-${index % 4} ${index === 0 ? 'active' : ''}`;
      btn.textContent = tab.name;
      btn.onclick = () => {
        document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTabContent(tab);
      };
      if (subTabContainer) subTabContainer.appendChild(btn);
    });

    renderTabContent(data.tabs[0]);
    showModalElement("enquiryModal");
    return;
  }

  // Default slider-based rendering fallback
  const categoryTitles = {
    'chennai': 'Tour Chennai Packages',
    'pilgrim': 'Tour Pilgrim Packages',
    'south-india': 'Tour South India Packages',
    'north-india': 'Tour North India Packages',
    'north-east': 'Tour North East Packages',
    'rest-of-india': 'Tour Rest of India Packages',
    'international': 'Tour International Packages',
    'corporate': 'Corporate Tour Packages',
    'students': 'School & College Tour Packages',
    'adventure': 'Adventure Tour Packages',
    'honeymoon': 'Honeymoon Tour Packages',
    'journey': 'Plan Your Journey',
    'cabs': 'Cogo Cab Booking',
    'ticket': 'Flight & Bus Ticket Booking'
  };

  const titleText = categoryTitles[catKey] || (catKey.replace('-', ' ').toUpperCase() + " PACKAGES");
  activeServiceTitle = titleText;
  
  const titleElem = document.getElementById("modalTitle") || document.getElementById("modalCategoryTitle");
  if (titleElem) titleElem.textContent = titleText;

  const descElem = document.getElementById("modalDescription");
  if (descElem) descElem.textContent = "Browse available packages below or send us an enquiry directly.";

  const contentBody = document.getElementById("modalDynamicContent");
  if (contentBody) {
    const defaultImages = [
      'Images/images/chennai-main.png',
      'Images/images/pilgrim-main.png',
      'Images/images/south-main.png',
      'Images/images/tournorthindia.png',
      'Images/images/tournortheast.png',
      'Images/images/tourinternational.png'
    ];

    let sliderHTML = `
      <div class="modal-slider-wrapper">
        <button type="button" class="nav-arrow left-arrow" onclick="scrollTrack('modalTrack', -1)" aria-label="Scroll Left">❮</button>
        <div class="modal-slider-container">
          <div id="modalTrack" class="slider-track">
    `;

    for (let i = 1; i <= 6; i++) {
      const imgSrc = defaultImages[i - 1];
      sliderHTML += `
        <div class="slide-card full-card-link" onclick="openPamphletList(['${imgSrc}'], 0)">
          <img src="${imgSrc}" alt="Package ${i}" loading="lazy">
          <div class="slide-overlay">
            <span class="status-tag ongoing">Ref #${i}</span>
            <h4>Package ${i}</h4>
            <p>Explore Package ${i} Details</p>
          </div>
        </div>
      `;
    }

    sliderHTML += `
          </div>
        </div>
        <button type="button" class="nav-arrow right-arrow" onclick="scrollTrack('modalTrack', 1)" aria-label="Scroll Right">❯</button>
      </div>
    `;

    contentBody.innerHTML = sliderHTML;
  }

  showModalElement("enquiryModal");
}

function selectSubTab(index) {
  const tabData = currentActiveTabs[index];
  if (!tabData) return;

  const tabs = document.querySelectorAll('.poster-tab');
  tabs.forEach((t, i) => {
    if (i === index) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  const posterBody = document.getElementById('posterBody');
  if (posterBody) {
    posterBody.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(0, 0, 0, 0.4) 100%), url('${tabData.bg}')`;
  }

  const enquiryBtn = document.getElementById('posterEnquiryBtn');
  if (enquiryBtn) {
    enquiryBtn.href = `https://wa.me/919884066830?text=${encodeURIComponent(tabData.msg)}`;
  }
}

function renderTabContent(tab) {
  const contentBody = document.getElementById("modalDynamicContent");
  currentPamphletList = tab.images || [];
  const galleryHtml = typeof createPamphletGallery === 'function' ? createPamphletGallery(currentPamphletList) : '';
  if (contentBody) contentBody.innerHTML = (tab.content || '') + galleryHtml;
}

function showModalElement(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
    modal.style.zIndex = "99999";
    modal.classList.add("show");
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";
  }
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modalEnquiry = document.getElementById("enquiryModal");
  const modalCategory = document.getElementById("categoryModal");
  
  if (modalEnquiry) {
    modalEnquiry.classList.remove("show");
    modalEnquiry.style.display = "none";
  }
  if (modalCategory) {
    modalCategory.classList.remove("show");
    modalCategory.style.display = "none";
  }
  document.body.style.overflow = "";
}

function closeCategoryModal() {
  closeModal();
}

function closeModalOnOverlay(e) {
  if (e.target.id === "enquiryModal" || e.target.id === "categoryModal") {
    closeModal();
  }
}

/* =========================================================
   FORM SUBMISSION ENGINE (WHATSAPP & EMAIL)
========================================================= */

function submitEnquiry(type) {
  const name = document.getElementById("userName") ? document.getElementById("userName").value.trim() : "";
  const phone = document.getElementById("userPhone") ? document.getElementById("userPhone").value.trim() : "";
  const query = document.getElementById("userQuery") ? document.getElementById("userQuery").value.trim() : "";

  if (!name || !phone) {
    alert("Please enter your name and contact phone number to continue.");
    return;
  }

  const messageText = `*New Travel Enquiry - Cogo Tours*\n` +
                      `-------------------------------\n` +
                      `*Service/Package:* ${activeServiceTitle}\n` +
                      `*Customer Name:* ${name}\n` +
                      `*Contact Number:* ${phone}\n` +
                      `*Notes/Preferences:* ${query || 'N/A'}`;

  if (type === 'whatsapp') {
    const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
  } else if (type === 'email') {
    const mailtoUrl = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent("Enquiry: " + activeServiceTitle)}&body=${encodeURIComponent(messageText)}`;
    window.location.href = mailtoUrl;
  }
}

/* =========================================================
   LIGHTBOX ZOOM & DRAG ENGINE
========================================================= */

function getLightboxElements() {
  const lightbox = document.getElementById("pamphletLightbox") || document.getElementById("imageModal");
  const img = document.getElementById("lightboxImage") || document.getElementById("imgModalSrc");
  return { lightbox, img };
}

function applyZoomTransform() {
  const { img } = getLightboxElements();
  if (!img) return;

  if (currentZoomScale <= 1) {
    translateX = 0;
    translateY = 0;
    img.style.cursor = "zoom-in";
  } else {
    img.style.cursor = isDragging ? "grabbing" : "grab";
  }

  img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoomScale})`;
  img.style.transition = isDragging ? "none" : "transform 0.15s ease-out";
}

function resetZoom() {
  currentZoomScale = 1;
  translateX = 0;
  translateY = 0;
  applyZoomTransform();
}

function zoomIn() {
  currentZoomScale = Math.min(currentZoomScale + 0.5, 3.5);
  applyZoomTransform();
}

function zoomOut() {
  currentZoomScale = Math.max(currentZoomScale - 0.5, 1);
  if (currentZoomScale === 1) {
    translateX = 0;
    translateY = 0;
  }
  applyZoomTransform();
}

function changeZoom(delta) {
  if (delta > 0) zoomIn();
  else zoomOut();
}

function openPamphletZoom(index) {
  if (!currentPamphletList || currentPamphletList.length === 0) return;

  currentPamphletIndex = index;
  const { lightbox, img } = getLightboxElements();

  if (lightbox && img) {
    img.src = currentPamphletList[currentPamphletIndex];
    resetZoom();
    lightbox.classList.add("show");
    lightbox.style.display = "flex";
    lightbox.style.opacity = "1";
    lightbox.style.pointerEvents = "auto";
  }
}

function closePamphletZoom(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const { lightbox } = getLightboxElements();
  if (lightbox) {
    lightbox.classList.remove("show");
    lightbox.style.display = "none";
    lightbox.style.opacity = "0";
    lightbox.style.pointerEvents = "none";
    resetZoom();
  }
}

function prevPamphlet(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  if (!currentPamphletList || currentPamphletList.length <= 1) return;
  currentPamphletIndex = (currentPamphletIndex - 1 + currentPamphletList.length) % currentPamphletList.length;
  openPamphletZoom(currentPamphletIndex);
}

function nextPamphlet(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  if (!currentPamphletList || currentPamphletList.length <= 1) return;
  currentPamphletIndex = (currentPamphletIndex + 1) % currentPamphletList.length;
  openPamphletZoom(currentPamphletIndex);
}

function navigateLightbox(direction, e) {
  if (direction === -1) prevPamphlet(e);
  else if (direction === 1) nextPamphlet(e);
}

function openPamphletList(imageList, index) {
  if (!imageList || imageList.length === 0) return;
  currentPamphletList = imageList;
  openPamphletZoom(index);
}

function scrollTrack(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const scrollAmount = track.clientWidth * 0.5;
  track.parentElement.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

/* =========================================================
   VISA ASSISTANCE ENGINE
========================================================= */

const visaCountries = [
  { name: "United States (USA)", flag: "🇺🇸", code: "us" },
  { name: "United Kingdom (UK)", flag: "🇬🇧", code: "gb" },
  { name: "Schengen / Europe", flag: "🇪🇺", code: "eu" },
  { name: "United Arab Emirates (Dubai)", flag: "🇦🇪", code: "ae" },
  { name: "Singapore", flag: "🇸🇬", code: "sg" },
  { name: "Malaysia", flag: "🇲🇾", code: "my" },
  { name: "Thailand", flag: "🇹🇭", code: "th" },
  { name: "Australia", flag: "🇦🇺", code: "au" },
  { name: "Canada", flag: "🇨🇦", code: "ca" },
  { name: "Japan", flag: "🇯🇵", code: "jp" },
  { name: "Vietnam", flag: "🇻🇳", code: "vn" },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "sa" },
  { name: "France", flag: "🇫🇷", code: "fr" },
  { name: "Germany", flag: "🇩🇪", code: "de" },
  { name: "Indonesia (Bali)", flag: "🇮🇩", code: "id" },
  { name: "Italy", flag: "🇮🇹", code: "it" },
  { name: "Switzerland", flag: "🇨🇭", code: "ch" }
];

let selectedVisaCountry = null;

function populateVisaCountries(list = visaCountries) {
  const container = document.getElementById("visaDropdownList");
  if (!container) return;

  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = '<div class="visa-option">No country found</div>';
    return;
  }

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "visa-option";
    div.innerHTML = `<span class="flag">${item.flag}</span> <span>${item.name}</span>`;
    div.onclick = () => selectVisaCountry(item);
    container.appendChild(div);
  });
}

function showVisaDropdown() {
  populateVisaCountries();
  document.getElementById("visaDropdownList")?.classList.add("show");
}

function filterVisaCountries() {
  const query = document.getElementById("visaCountryInput")?.value.toLowerCase() || "";
  const filtered = visaCountries.filter(c => c.name.toLowerCase().includes(query));
  populateVisaCountries(filtered);
  document.getElementById("visaDropdownList")?.classList.add("show");
}

function selectVisaCountry(countryObj) {
  selectedVisaCountry = countryObj;
  const input = document.getElementById("visaCountryInput") || document.getElementById("visaCountry");
  if (input) input.value = countryObj.name;
  document.getElementById("visaDropdownList")?.classList.remove("show");
}

function sendVisaWhatsApp() {
  const phoneNumber = "919884066830"; 

  let countryName = selectedVisaCountry ? selectedVisaCountry.name : (document.getElementById("visaCountryInput")?.value || document.getElementById("visaCountry")?.value);
  const fromDate = document.getElementById("visaFromDate")?.value || document.getElementById("visaTravelDate")?.value;
  const toDate = document.getElementById("visaToDate")?.value || document.getElementById("visaReturnDate")?.value;
  const pax = document.getElementById("visaPaxSelect")?.value || document.getElementById("visaPax")?.value || "1 Person";
  const remarks = document.getElementById("visaRemarksInput")?.value.trim() || document.getElementById("visaRemarks")?.value.trim();

  if (!countryName || !countryName.trim()) {
    alert("Please select or type a destination country for Visa Assistance.");
    return;
  }

  let message = `Hello Cogo Tours, I am interested in Visa Assistance.\n\n🌐 *Destination Country:* ${countryName}`;
  if (fromDate && toDate) {
    message += `\n📅 *Travel Period:* ${fromDate} to ${toDate}`;
  } else if (fromDate) {
    message += `\n📅 *Travel Date:* ${fromDate}`;
  }
  message += `\n👥 *Applicants (Pax):* ${pax}`;
  if (remarks) {
    message += `\n📝 *Remarks:* ${remarks}`;
  }
  message += `\n\nPlease share the required document checklist and visa process.`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

function handleVisaBooking(btn) {
  sendVisaWhatsApp();
}

/* =========================================================
   CAB SERVICES ENGINE
========================================================= */

const cabPickupLocations = [
  "Chennai Airport (MAA)",
  "Chennai Central Railway Station",
  "Chennai Egmore Station",
  "T. Nagar / Kodambakkam",
  "OMR / Sholinganallur (IT Corridor)",
  "Velachery / Guindy",
  "Koyambedu (CMBT)",
  "ECR / Neelankarai"
];

const cabDropLocations = [
  "Pondicherry / Puducherry",
  "Tirupati / Tirumala",
  "Mahabalipuram / ECR Beach Resorts",
  "Kanchipuram Heritage Town",
  "Vellore / Golden Temple",
  "Bengaluru City",
  "Local Chennai Full Day Sightseeing",
  "Local Airport Drop / Transfer"
];

function populateCabList(containerId, list, selectFunc) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = '<div class="visa-option">Type custom location...</div>';
    return;
  }

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "visa-option";
    div.innerHTML = `<span>📍 ${item}</span>`;
    div.onclick = () => selectFunc(item);
    container.appendChild(div);
  });
}

function showCabPickupDropdown() {
  populateCabList("cabPickupList", cabPickupLocations, selectCabPickup);
  document.getElementById("cabPickupList")?.classList.add("show");
}

function filterCabPickup() {
  const q = document.getElementById("cabPickupInput")?.value.toLowerCase() || "";
  const filtered = cabPickupLocations.filter(loc => loc.toLowerCase().includes(q));
  populateCabList("cabPickupList", filtered, selectCabPickup);
  document.getElementById("cabPickupList")?.classList.add("show");
}

function selectCabPickup(val) {
  const input = document.getElementById("cabPickupInput") || document.getElementById("pickupLocation");
  if (input) input.value = val;
  document.getElementById("cabPickupList")?.classList.remove("show");
}

function showCabDropDropdown() {
  populateCabList("cabDropList", cabDropLocations, selectCabDrop);
  document.getElementById("cabDropList")?.classList.add("show");
}

function filterCabDrop() {
  const q = document.getElementById("cabDropInput")?.value.toLowerCase() || "";
  const filtered = cabDropLocations.filter(loc => loc.toLowerCase().includes(q));
  populateCabList("cabDropList", filtered, selectCabDrop);
  document.getElementById("cabDropList")?.classList.add("show");
}

function selectCabDrop(val) {
  const input = document.getElementById("cabDropInput") || document.getElementById("dropLocation");
  if (input) input.value = val;
  document.getElementById("cabDropList")?.classList.remove("show");
}

function sendCabWhatsApp() {
  const phoneNumber = "919884066830";

  const pickup = document.getElementById("cabPickupInput")?.value.trim() || document.getElementById("pickupLocation")?.value.trim();
  const drop = document.getElementById("cabDropInput")?.value.trim() || document.getElementById("dropLocation")?.value.trim();
  const travelDate = document.getElementById("cabDateInput")?.value || document.getElementById("cabDate")?.value;
  const travelTime = document.getElementById("cabTimeInput")?.value || document.getElementById("cabTime")?.value;
  const vehicle = document.getElementById("cabVehicleSelect")?.value || document.getElementById("cabVehicle")?.value;
  const pack = document.getElementById("cabPackSelect")?.value || document.getElementById("cabPackage")?.value;
  const name = document.getElementById("cabName")?.value || "";
  const mobile = document.getElementById("cabMobile")?.value || "";

  if (!pickup || !drop) {
    alert("Please enter or select both Pickup and Destination locations.");
    return;
  }

  let message = `Hello Cogo Tours, I want to book/enquire a cab.\n\n📍 *Pickup:* ${pickup}\n🎯 *Destination:* ${drop}`;
  if (travelDate) message += `\n📅 *Date:* ${travelDate}`;
  if (travelTime) message += `\n⏰ *Time:* ${travelTime}`;
  if (vehicle) message += `\n🚗 *Vehicle:* ${vehicle}`;
  if (pack) message += `\n⏱️ *Trip Pack:* ${pack}`;
  if (name) message += `\n👤 *Name:* ${name}`;
  if (mobile) message += `\n📞 *Mobile:* ${mobile}`;
  message += `\n\nPlease share availability and fare details.`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

function handleCabBooking(btn) {
  sendCabWhatsApp();
}

/* =========================================================
   FLIGHT BOOKING ENGINE
========================================================= */

function toggleReturnDate(isRoundTrip) {
  const returnInput = document.getElementById("flightReturnDate");
  if (returnInput) {
    returnInput.style.display = isRoundTrip ? "block" : "none";
  }
}

function sendFlightWhatsApp() {
  const phoneNumber = "919884066830"; 

  const scope = document.querySelector('input[name="flightScope"]:checked')?.value || document.querySelector('input[name="flightType"]:checked')?.value || "Domestic";
  const type = document.querySelector('input[name="flightType"]:checked')?.value || document.querySelector('input[name="tripType"]:checked')?.value || "One-Way";
  const fromCity = document.getElementById("flightFromInput")?.value.trim() || document.getElementById("departureCity")?.value.trim();
  const toCity = document.getElementById("flightToInput")?.value.trim() || document.getElementById("destinationCity")?.value.trim();
  const departDate = document.getElementById("flightDepartDate")?.value || document.getElementById("flightDate")?.value;
  const returnDate = document.getElementById("flightReturnDate")?.value;
  const preferredTime = document.getElementById("flightTimeSelect")?.value || document.getElementById("flightTimeBand")?.value;
  const passengers = document.getElementById("flightPaxSelect")?.value || "1 Passenger";
  const name = document.getElementById("flightName")?.value || "";
  const mobile = document.getElementById("flightMobile")?.value || "";

  if (!fromCity || !toCity) {
    alert("Please enter both Departure and Destination cities.");
    return;
  }

  let message = `Hello Cogo Tours, I want to book/enquire a flight ticket.\n\n🌐 *Type:* ${scope} (${type})\n🛫 *From:* ${fromCity}\n🛬 *To:* ${toCity}`;
  if (departDate) message += `\n📅 *Departure Date:* ${departDate}`;
  if (type.toLowerCase().includes("round") && returnDate) message += `\n📅 *Return Date:* ${returnDate}`;
  if (preferredTime) message += `\n⏰ *Preferred Time:* ${preferredTime}`;
  if (passengers) message += `\n👥 *Passengers:* ${passengers}`;
  if (name) message += `\n👤 *Name:* ${name}`;
  if (mobile) message += `\n📞 *Mobile:* ${mobile}`;
  message += `\n\nPlease check for available flights and best fare deals.`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

function handleFlightBooking(btn) {
  sendFlightWhatsApp();
}

/* =========================================================
   GLOBAL EVENT LISTENERS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const { lightbox, img } = getLightboxElements();

  if (lightbox) {
    lightbox.addEventListener("wheel", function (e) {
      if (lightbox.style.display === "flex" || lightbox.classList.contains("show")) {
        e.preventDefault();
        if (e.deltaY < 0) zoomIn();
        else zoomOut();
      }
    }, { passive: false });
  }

  if (img) {
    img.addEventListener("click", function (e) {
      if (isDragging) return;
      e.stopPropagation();
      currentZoomScale = currentZoomScale === 1 ? 2 : 1;
      applyZoomTransform();
    });

    img.addEventListener("mousedown", (e) => {
      if (currentZoomScale > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = "grabbing";
        e.preventDefault();
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      applyZoomTransform();
    });

    window.addEventListener("mouseup", () => {
      if (isDragging) {
        setTimeout(() => { isDragging = false; }, 50);
        applyZoomTransform();
      }
    });

    img.addEventListener("touchstart", (e) => {
      if (currentZoomScale > 1 && e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
      }
    });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;
      applyZoomTransform();
    });

    window.addEventListener("touchend", () => {
      isDragging = false;
    });
  }

  document.querySelectorAll(".pamphlet-prev, .prev-btn, #prevBtn").forEach(btn => {
    btn.onclick = prevPamphlet;
  });
  document.querySelectorAll(".pamphlet-next, .next-btn, #nextBtn").forEach(btn => {
    btn.onclick = nextPamphlet;
  });
  document.querySelectorAll(".zoom-in, #zoomInBtn").forEach(btn => {
    btn.onclick = zoomIn;
  });
  document.querySelectorAll(".zoom-out, #zoomOutBtn").forEach(btn => {
    btn.onclick = zoomOut;
  });
  document.querySelectorAll(".pamphlet-close, .close-btn, #closeBtn").forEach(btn => {
    btn.onclick = closePamphletZoom;
  });

  // Flag and Auto-Complete Integration for Visa Country Input
  const countryInput = document.getElementById("visaCountry") || document.getElementById("visaCountryInput");
  const dropdownList = document.getElementById("visaCountryDropdown") || document.getElementById("visaDropdownList");
  const flagPreview = document.getElementById("selectedFlag");

  if (countryInput && dropdownList) {
    function renderVisaOptions(filterText = "") {
      dropdownList.innerHTML = "";
      const filtered = visaCountries.filter(c => 
        c.name.toLowerCase().includes(filterText.toLowerCase())
      );

      if (filtered.length === 0) {
        dropdownList.innerHTML = `<div class="no-match-option">No matching countries found</div>`;
        dropdownList.classList.add("show");
        return;
      }

      filtered.forEach(country => {
        const option = document.createElement("div");
        option.className = "visa-option";
        option.innerHTML = `
          <img src="https://flagcdn.com/w40/${country.code}.png" alt="${country.name} Flag" onerror="this.style.display='none';">
          <span>${country.flag || ''} ${country.name}</span>
        `;

        option.addEventListener("click", () => {
          selectVisaCountry(country);
          countryInput.value = country.name;
          if (flagPreview) {
            flagPreview.innerHTML = `<img src="https://flagcdn.com/w40/${country.code}.png" alt="${country.name} Flag">`;
            flagPreview.classList.remove("hidden");
          }
          countryInput.classList.add("has-flag");
          dropdownList.classList.remove("show");
        });

        dropdownList.appendChild(option);
      });

      dropdownList.classList.add("show");
    }

    countryInput.addEventListener("input", (e) => {
      if (flagPreview) {
        flagPreview.classList.add("hidden");
        flagPreview.innerHTML = "";
      }
      countryInput.classList.remove("has-flag");
      renderVisaOptions(e.target.value.trim());
    });

    countryInput.addEventListener("focus", () => {
      renderVisaOptions(countryInput.value.trim());
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".visa-country-selector") && !e.target.closest(".custom-select-wrapper")) {
      dropdownList?.classList.remove("show");
    }
  });
});

/* Keyboard Navigation (Left/Right Arrows & Esc) */
document.addEventListener("keydown", function(e) {
  const { lightbox } = getLightboxElements();
  const isLightboxActive = lightbox && (lightbox.style.display === "flex" || lightbox.classList.contains("show"));

  if (e.key === "Escape") {
    if (isLightboxActive) {
      closePamphletZoom(e);
    } else {
      closeModal();
    }
  } else if (isLightboxActive) {
    if (e.key === "ArrowLeft") prevPamphlet(e);
    if (e.key === "ArrowRight") nextPamphlet(e);
    if (e.key === "+" || e.key === "=") zoomIn();
    if (e.key === "-") zoomOut();
  }
});

/* Hide Dropdowns When Clicking Outside */
document.addEventListener("click", function(e) {
  const visaWrapper = document.querySelector(".custom-select-wrapper");
  if (visaWrapper && !visaWrapper.contains(e.target)) {
    document.getElementById("visaDropdownList")?.classList.remove("show");
  }

  const pickupWrap = document.getElementById("cabPickupInput")?.parentElement || document.getElementById("pickupLocation")?.parentElement;
  const dropWrap = document.getElementById("cabDropInput")?.parentElement || document.getElementById("dropLocation")?.parentElement;

  if (pickupWrap && !pickupWrap.contains(e.target)) {
    document.getElementById("cabPickupList")?.classList.remove("show");
  }
  if (dropWrap && !dropWrap.contains(e.target)) {
    document.getElementById("cabDropList")?.classList.remove("show");
  }
});
