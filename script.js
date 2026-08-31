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
   COGO TOURS & CABS - DYNAMIC ENGINE & DATA
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
      images: [
        "Images/images/cogocabs.png"
      ],
      content: `
        <div class="tariff-box">
          <h4>Cab Tariff Details</h4>
          <p>Local & Outstation rentals with experienced drivers.</p>
          <ul class="bulletin-list">
            <li class="bulletin-item"><span class="bullet-label">Sedan (Dzire/Etios)</span><span class="bullet-price">₹12/km</span></li>
            <li class="bulletin-item"><span class="bullet-label">SUV (Innova/Ertiga)</span><span class="bullet-price">₹16/km</span></li>
            <li class="bulletin-item"><span class="bullet-label">Innova Crysta</span><span class="bullet-price">₹19/km</span></li>
            <li class="bulletin-item"><span class="bullet-label">Tempo Traveller</span><span class="bullet-price">₹24/km</span></li>
          </ul>
        </div>
      `
    }
  ]
};

// Category Modal Handler Mapping
const categoryDataMap = {
  cabs: cogoCabsData,
  chennai: {
    title: "Tour Chennai",
    tabs: [
      { name: "City Sightseeing", images: ["Images/images/chennai-main.png"] }
    ]
  },
  pilgrim: {
    title: "Spiritual & Temple Tours",
    tabs: [
      { name: "Pilgrim Circuit", images: ["Images/images/pilgrim-main.png"] }
    ]
  },
  "south-india": {
    title: "South India Packages",
    tabs: [
      { name: "Misty Hills & Trails", images: ["Images/images/south-main.png"] }
    ]
  }
};

/* =========================================================
   MODAL & INTERACTIVE ENGINE FUNCTIONS
========================================================= */

function openCategoryModal(categoryKey) {
  const modal = document.getElementById('categoryModal');
  const tabsBar = document.getElementById('posterTabsBar');
  const posterBody = document.getElementById('posterBody');
  const data = categoryDataMap[categoryKey] || cogoCabsData;

  currentActiveTabs = data.tabs || [];
  currentSubTabIndex = 0;

  if (tabsBar) {
    tabsBar.innerHTML = currentActiveTabs.map((tab, idx) => `
      <button type="button" class="poster-tab ${idx === 0 ? 'active' : ''}" onclick="switchSubTab(${idx})">
        <span class="tab-label">${tab.name}</span>
      </button>
    `).join('');
  }

  updatePosterDisplay();
  if (modal) modal.classList.add('show');
}

function switchSubTab(index) {
  currentSubTabIndex = index;
  const tabs = document.querySelectorAll('.poster-tab');
  tabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });
  updatePosterDisplay();
}

function updatePosterDisplay() {
  const posterBody = document.getElementById('posterBody');
  if (!posterBody || !currentActiveTabs[currentSubTabIndex]) return;

  const currentTab = currentActiveTabs[currentSubTabIndex];
  const activeImage = currentTab.images ? currentTab.images[0] : '';

  posterBody.innerHTML = `
    <img src="${activeImage}" alt="${currentTab.name}" class="poster-banner-img">
    <div class="poster-footer">
      <a id="posterEnquiryBtn" href="https://wa.me/919884066830?text=Hi%20Cogo%20Tours,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(currentTab.name)}" target="_blank" class="yellow-enquiry-btn" rel="noopener noreferrer">
        <span class="arrow-circle">&rarr;</span> ENQUIRY
      </a>
    </div>
  `;
}

function closeCategoryModal(event) {
  if (event) event.stopPropagation();
  const modal = document.getElementById('categoryModal');
  if (modal) modal.classList.remove('show');
}

function closeModalOnOverlay(event) {
  if (event.target === event.currentTarget) {
    event.currentTarget.classList.remove('show');
  }
}

// Lightbox & Zoom Functions
function openPamphletList(images, startIndex) {
  currentPamphletList = images;
  currentPamphletIndex = startIndex;
  const lightbox = document.getElementById('pamphletLightbox');
  const lightboxImg = document.getElementById('lightboxImage');

  if (lightbox && lightboxImg) {
    lightboxImg.src = currentPamphletList[currentPamphletIndex];
    lightbox.classList.add('show');
  }
}

function closePamphletZoom(event) {
  const lightbox = document.getElementById('pamphletLightbox');
  if (lightbox) lightbox.classList.remove('show');
}

function navigateLightbox(direction, event) {
  if (event) event.stopPropagation();
  currentPamphletIndex += direction;
  if (currentPamphletIndex < 0) currentPamphletIndex = currentPamphletList.length - 1;
  if (currentPamphletIndex >= currentPamphletList.length) currentPamphletIndex = 0;

  const lightboxImg = document.getElementById('lightboxImage');
  if (lightboxImg) lightboxImg.src = currentPamphletList[currentPamphletIndex];
}

function scrollTrack(trackId, direction) {
  const track = document.getElementById(trackId);
  if (track) {
    track.scrollBy({ left: direction * 280, behavior: 'smooth' });
  }
}

// Booking submission handlers
function handleCabBooking(btn) {
  const name = document.getElementById('cabName')?.value || 'Guest';
  const pickup = document.getElementById('pickupLocation')?.value || 'N/A';
  const drop = document.getElementById('dropLocation')?.value || 'N/A';
  const text = `Hi Cogo Tours, I need a cab. Name: ${name}, Pickup: ${pickup}, Drop: ${drop}`;
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(text)}`, '_blank');
}

function handleFlightBooking(btn) {
  const name = document.getElementById('flightName')?.value || 'Guest';
  const from = document.getElementById('departureCity')?.value || 'N/A';
  const to = document.getElementById('destinationCity')?.value || 'N/A';
  const text = `Hi Cogo Tours, Flight enquiry. Name: ${name}, From: ${from}, To: ${to}`;
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(text)}`, '_blank');
}

function handleVisaBooking(btn) {
  const name = document.getElementById('visaName')?.value || 'Guest';
  const country = document.getElementById('visaCountry')?.value || 'N/A';
  const text = `Hi Cogo Tours, Visa enquiry for ${country}. Name: ${name}`;
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(text)}`, '_blank');
}
