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

// Current Active Poster Sub-Tabs State
let currentActiveTabs = [];
let currentSubTabIndex = 0;
let currentSelectedPackageLabel = '';

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

/* =========================================================
   MODAL OPEN / CLOSE HANDLERS & WHATSAPP ENQUIRY SYSTEM
========================================================= */

function openCategoryModal(catKey) {
  if (catKey === 'plan-your-journey' || catKey === 'journey-planning') catKey = 'journey';

  const categoryPoster = typeof tourCategoryData !== 'undefined' ? tourCategoryData[catKey] : null;
  const posterModal = document.getElementById('categoryModal');

  if (categoryPoster && posterModal) {
    const posterTitle = document.getElementById('posterTitle');
    if (posterTitle) posterTitle.style.display = 'none';

    currentActiveTabs = categoryPoster.tabs;
    currentSubTabIndex = 0;

    const tabsBar = document.getElementById('posterTabsBar');
    if (tabsBar) {
      tabsBar.innerHTML = '';
      categoryPoster.tabs.forEach((tab, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `poster-tab ${index === 0 ? 'active active-tab' : ''}`;
        btn.onclick = () => selectSubTab(index);
        btn.innerHTML = `<span class="tab-icon">${tab.icon || ''}</span> <span class="tab-label">${tab.label}</span>`;
        tabsBar.appendChild(btn);
      });
    }

    // Dynamic Navigation Arrows Insertion
    const posterCard = posterModal.querySelector('.poster-card') || posterModal.querySelector('> div') || posterModal;
    if (posterCard && !posterCard.querySelector('.modal-nav-arrow')) {
      const leftArrow = document.createElement('button');
      leftArrow.className = 'modal-nav-arrow left';
      leftArrow.type = 'button';
      leftArrow.innerHTML = '&#10094;';
      leftArrow.onclick = (e) => { e.stopPropagation(); navigatePoster('prev'); };

      const rightArrow = document.createElement('button');
      rightArrow.className = 'modal-nav-arrow right';
      rightArrow.type = 'button';
      rightArrow.innerHTML = '&#10095;';
      rightArrow.onclick = (e) => { e.stopPropagation(); navigatePoster('next'); };

      posterCard.appendChild(leftArrow);
      posterCard.appendChild(rightArrow);
    }

    selectSubTab(0);

    posterModal.style.position = 'fixed';
    posterModal.style.top = '0';
    posterModal.style.left = '0';
    posterModal.style.width = '100vw';
    posterModal.style.height = '100vh';
    posterModal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
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

  // Fallback structure handler for standard categories
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

  showModalElement("enquiryModal");
}

function resetPosterZoom() {
  const posterBody = document.getElementById('posterBody');
  if (posterBody) {
    posterBody.classList.remove('is-zoomed');
    posterBody.style.transform = 'scale(1)';
    posterBody.style.transformOrigin = 'center center';
    currentZoomScale = 1;
    translateX = 0;
    translateY = 0;
  }
}

function selectSubTab(index) {
  if (!currentActiveTabs || currentActiveTabs.length === 0) return;
  
  currentSubTabIndex = index;
  const tabData = currentActiveTabs[index];
  if (!tabData) return;

  resetPosterZoom();

  const tabs = document.querySelectorAll('#categoryModal .poster-tab');
  tabs.forEach((t, i) => {
    if (i === index) {
      t.classList.add('active', 'active-tab');
      t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      t.classList.remove('active', 'active-tab');
    }
  });

  const posterBody = document.getElementById('posterBody');
  if (posterBody) {
    posterBody.style.backgroundImage = `url('${tabData.bg}')`;
    posterBody.style.backgroundSize = 'contain';
    posterBody.style.backgroundPosition = 'center';
    posterBody.style.backgroundRepeat = 'no-repeat';
    posterBody.style.backgroundColor = '#ffffff';
  }

  currentSelectedPackageLabel = tabData.label || 'Tour Package';

  const enquiryBtn = document.getElementById('posterEnquiryBtn');
  if (enquiryBtn) {
    enquiryBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openWhatsAppForm();
    };
  }
}

// Left/Right Nav
function navigatePoster(direction) {
  if (!currentActiveTabs || currentActiveTabs.length === 0) return;

  if (direction === 'next' || direction === 1) {
    currentSubTabIndex = (currentSubTabIndex + 1) % currentActiveTabs.length;
  } else if (direction === 'prev' || direction === -1) {
    currentSubTabIndex = (currentSubTabIndex - 1 + currentActiveTabs.length) % currentActiveTabs.length;
  }

  selectSubTab(currentSubTabIndex);
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
    resetPosterZoom();
  }
  document.body.style.overflow = "";
}

function closeCategoryModal(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  closeModal();
}

function closeModalOnOverlay(e) {
  if (e.target.id === "enquiryModal" || e.target.id === "categoryModal") {
    closeModal();
  }
}

/* =========================================================
   MINI WHATSAPP FORM HANDLERS
========================================================= */

function openWhatsAppForm() {
  const formModal = document.getElementById('waFormModal');
  const pkgInput = document.getElementById('waPackageName');
  if (pkgInput) pkgInput.value = currentSelectedPackageLabel;
  if (formModal) formModal.style.display = 'flex';
}

function closeWhatsAppForm() {
  const formModal = document.getElementById('waFormModal');
  if (formModal) formModal.style.display = 'none';
}

function sendWhatsAppEnquiry(e) {
  if (e) e.preventDefault();
  
  const name = document.getElementById('waGuestName')?.value.trim();
  const phone = document.getElementById('waGuestPhone')?.value.trim();
  const message = document.getElementById('waGuestMsg')?.value.trim();
  const packageName = currentSelectedPackageLabel || "Tour Package";

  if (!name || !phone) {
    alert("Please enter both your Name and Phone Number.");
    return;
  }

  const fullText = `Hello Cogo Tours!\n\nI am interested in: *${packageName}*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Note:* ${message || 'Please send details and quote.'}`;
  
  const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(fullText)}`;
  window.open(waUrl, '_blank');
  
  closeWhatsAppForm();
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

/* =========================================================
   GLOBAL EVENT LISTENERS & POSTER ZOOM ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // Poster Click Zoom Toggle Handler
  const posterBody = document.getElementById('posterBody');
  if (posterBody) {
    posterBody.addEventListener('click', function (e) {
      if (e.target.closest('#posterEnquiryBtn') || e.target.closest('.modal-nav-arrow') || e.target.closest('.poster-tabs-bar')) {
        return;
      }

      posterBody.classList.toggle('is-zoomed');
      if (posterBody.classList.contains('is-zoomed')) {
        const rect = posterBody.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        posterBody.style.transformOrigin = `${x}% ${y}%`;
        posterBody.style.transform = 'scale(2)';
      } else {
        posterBody.style.transformOrigin = 'center center';
        posterBody.style.transform = 'scale(1)';
      }
    });
  }

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
  }
});

/* Keyboard Navigation (Left/Right Arrows & Esc) */
document.addEventListener("keydown", function(e) {
  const categoryModal = document.getElementById("categoryModal");
  const isPosterActive = categoryModal && categoryModal.classList.contains("show");

  if (e.key === "Escape") {
    closeModal();
  } else if (isPosterActive) {
    if (e.key === "ArrowLeft") navigatePoster('prev');
    if (e.key === "ArrowRight") navigatePoster('next');
  }
});
