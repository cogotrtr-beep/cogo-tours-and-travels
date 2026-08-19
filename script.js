// ==========================================
// 1. GLOBAL STATE & CONFIGURATION
// ==========================================
let currentLightboxImages = [];
let currentLightboxIndex = 0;
let currentZoomScale = 1;

// Category configurations for modal data
const categoryData = {
  'cabs': {
    title: '🚖 Cab Booking & Tariffs',
    description: 'Select local or outstation options for transparent pricing.',
    tabs: ['Local Sightseeing', 'Outstation', 'Airport Transfer'],
    content: {
      'Local Sightseeing': '<p>Sedan: ₹2,200 (8 Hrs / 80 Kms)<br>SUV (Innova): ₹3,500 (8 Hrs / 80 Kms)</p>',
      'Outstation': '<p>Sedan: ₹14/Km (Min 250 Km/day)<br>SUV: ₹18/Km (Min 250 Km/day)</p>',
      'Airport Transfer': '<p>Pickup/Drop starting from ₹900 (Sedan) / ₹1,500 (SUV).</p>'
    }
  },
  'journey': {
    title: '📋 Plan Your Journey',
    description: 'Tell us your itinerary and preferences for a tailored trip.',
    tabs: ['Custom Itinerary', 'Group Travel'],
    content: {
      'Custom Itinerary': '<p>Fill out the contact details below with your target travel dates and places.</p>',
      'Group Travel': '<p>Special rates for college trips, corporate outings, and large families.</p>'
    }
  },
  'ticket': {
    title: '🎟️ Book Tickets',
    description: 'Fast and reliable booking for flights, trains, and intercity buses.',
    tabs: ['Flights', 'Trains', 'Buses'],
    content: {
      'Flights': '<p>Domestic & International flights at competitive market rates.</p>',
      'Trains': '<p>IRCTC ticket reservations and tatkal assistance.</p>',
      'Buses': '<p>AC Sleeper, Semi-Sleeper, and Volvo bookings across South India.</p>'
    }
  },
  'visa': {
    title: '🛂 Visa Assistance',
    description: 'End-to-end documentation guidance for global destinations.',
    tabs: ['Tourist Visa', 'Business Visa'],
    content: {
      'Tourist Visa': '<p>Complete support for Schengen, Dubai, Singapore, Malaysia, and US visas.</p>',
      'Business Visa': '<p>Invitation letter processing and priority appointment filing.</p>'
    }
  },
  'chennai': { title: '🏛️ Tour Chennai', description: 'Explore local heritage, coastlines, and cultural landmarks.', tabs: ['Full Day', 'Half Day'], content: { 'Full Day': '<p>Kapaleeshwarar Temple, Marina Beach, San Thome Basilica, Fort St. George.</p>', 'Half Day': '<p>Express city tour covering major coastal highlights.</p>' } },
  'pilgrim': { title: '🛕 Pilgrim Tours', description: 'Devotional packages across South & North India.', tabs: ['Tirupati', 'Shirdi', 'Kanchi'], content: { 'Tirupati': '<p>Daily special entry darshan packages with cab/bus arrangements.</p>', 'Shirdi': '<p>Flight & Train tour packages with accommodation included.</p>', 'Kanchi': '<p>Temple circuit covering major divya desams.</p>' } },
  'south-india': { title: '🌴 South India Packages', description: 'Hill stations, backwaters, and heritage routes.', tabs: ['Kerala', 'Ooty/Kodaikanal', 'Coorg'], content: { 'Kerala': '<p>Munnar, Alleppey Houseboat, and Thekkady nature trails.</p>', 'Ooty/Kodaikanal': '<p>3-5 day hill station retreats.</p>', 'Coorg': '<p>Coffee plantations and waterfalls tour.</p>' } },
  'north-india': { title: '🏔️ North India Packages', description: 'Royal Rajasthan, Golden Triangle, and Snow Trails.', tabs: ['Golden Triangle', 'Kashmir', 'Himachal'], content: { 'Golden Triangle': '<p>Delhi, Agra, Jaipur 5-day cultural circuit.</p>', 'Kashmir': '<p>Srinagar, Gulmarg, and Pahalgam packages.</p>', 'Himachal': '<p>Shimla, Manali, and Dharamshala tours.</p>' } },
  'north-east': { title: '🏞️ North East Packages', description: 'Pristine valleys and tea estates.', tabs: ['Gangtok & Darjeeling', 'Meghalaya'], content: { 'Gangtok & Darjeeling': '<p>7-day scenic mountain package.</p>', 'Meghalaya': '<p>Living root bridges and Shillong waterfalls.</p>' } },
  'rest-of-india': { title: '🧭 Rest of India', description: 'Unique island escapes and western trails.', tabs: ['Andaman', 'Goa'], content: { 'Andaman': '<p>Port Blair and Havelock beach tours.</p>', 'Goa': '<p>North & South Goa holiday packages.</p>' } },
  'international': { title: '✈️ International Tours', description: 'Global holiday deals.', tabs: ['Dubai', 'Singapore/Malaysia', 'Europe'], content: { 'Dubai': '<p>5 Days / 4 Nights including Desert Safari & Burj Khalifa.</p>', 'Singapore/Malaysia': '<p>6 Days twin country tour.</p>', 'Europe': '<p>10 Days highlights package.</p>' } },
  'corporate': { title: '🏢 Corporate Tours', description: 'MICE and team building outings.', tabs: ['Outings', 'Conferences'], content: { 'Outings': '<p>1-2 day resort retreats with activities.</p>', 'Conferences': '<p>End-to-end event logistics and travel management.</p>' } },
  'students': { title: '🎓 School & College Tours', description: 'Educational field trips and industrial visits.', tabs: ['Industrial Visits', 'Excursions'], content: { 'Industrial Visits': '<p>Curated IV trips with verified factory approvals.</p>', 'Excursions': '<p>Safe, budget-friendly student group holidays.</p>' } },
  'adventure': { title: '🏕️ Adventure Tours', description: 'Trekking, camping, and wildlife.', tabs: ['Trekking', 'Wildlife'], content: { 'Trekking': '<p>Western Ghats and Himalayan treks.</p>', 'Wildlife': '<p>Jungle safaris at Masinagudi, Wayanad, and Kabini.</p>' } },
  'honeymoon': { title: '💖 Honeymoon Packages', description: 'Romantic getaways with private setups.', tabs: ['Domestic', 'International'], content: { 'Domestic': '<p>Kerala Backwaters, Andaman, and Coorg intimate stays.</p>', 'International': '<p>Bali, Maldives, and Mauritius romantic specials.</p>' } }
};

// ==========================================
// 2. SLIDER / CAROUSEL CONTROLLER
// ==========================================
function moveSlide(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  
  const cardWidth = track.querySelector('.slide-card')?.offsetWidth || 280;
  const gap = 16;
  const scrollAmount = (cardWidth + gap) * direction;
  
  track.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

// ==========================================
// 3. ENQUIRY MODAL & DYNAMIC TABS
// ==========================================
function openCategoryModal(categoryKey) {
  const modal = document.getElementById('enquiryModal');
  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDescription');
  const subTabsEl = document.getElementById('modalSubTabs');
  const contentEl = document.getElementById('modalDynamicContent');

  const data = categoryData[categoryKey] || {
    title: 'Plan Your Trip',
    description: 'Reach out to get exact quotes and details.',
    tabs: ['Overview'],
    content: { 'Overview': '<p>Specify your preferences in the form below.</p>' }
  };

  titleEl.innerText = data.title;
  descEl.innerText = data.description;
  subTabsEl.innerHTML = '';
  contentEl.innerHTML = '';

  // Generate subtabs dynamically
  data.tabs.forEach((tabName, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `sub-tab-btn ${index === 0 ? 'active' : ''}`;
    btn.innerText = tabName;
    btn.onclick = () => switchModalSubTab(btn, tabName, data.content);
    subTabsEl.appendChild(btn);
  });

  // Set initial active content
  if (data.tabs.length > 0) {
    contentEl.innerHTML = data.content[data.tabs[0]] || '';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function switchModalSubTab(activeBtn, tabName, contentMap) {
  const allTabs = document.querySelectorAll('.sub-tab-btn');
  allTabs.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');

  const contentEl = document.getElementById('modalDynamicContent');
  contentEl.innerHTML = contentMap[tabName] || '';
}

function closeModal() {
  const modal = document.getElementById('enquiryModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOnOverlay(event) {
  if (event.target.id === 'enquiryModal') {
    closeModal();
  }
}

// ==========================================
// 4. FORM SUBMISSION (WHATSAPP & EMAIL)
// ==========================================
function submitEnquiry(type) {
  const name = document.getElementById('userName').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const query = document.getElementById('userQuery').value.trim();
  const categoryTitle = document.getElementById('modalTitle').innerText;

  if (!name || !phone) {
    alert('Please fill in both your Name and Phone/WhatsApp number.');
    return;
  }

  const textMessage = `Hello Cogo Tours & Travels!\n\nI am interested in: *${categoryTitle}*\n*Name:* ${name}\n*Phone:* ${phone}\n*Details:* ${query || 'N/A'}`;

  if (type === 'whatsapp') {
    const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(textMessage)}`;
    window.open(waUrl, '_blank');
  } else if (type === 'email') {
    const emailSubject = `Enquiry regarding ${categoryTitle}`;
    const mailtoUrl = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(textMessage)}`;
    window.location.href = mailtoUrl;
  }
}

// ==========================================
// 5. LIGHTBOX / PAMPHLET GALLERY
// ==========================================
function openPamphletList(imagesArray, startIndex = 0) {
  if (!imagesArray || imagesArray.length === 0) return;
  
  currentLightboxImages = imagesArray;
  currentLightboxIndex = startIndex;
  currentZoomScale = 1;

  updateLightboxImage();
  
  const lightbox = document.getElementById('pamphletLightbox');
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function updateLightboxImage() {
  const imgEl = document.getElementById('lightboxImage');
  imgEl.src = currentLightboxImages[currentLightboxIndex];
  resetZoom();
}

function navigateLightbox(direction, event) {
  if (event) event.stopPropagation();
  
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = currentLightboxImages.length - 1;
  } else if (currentLightboxIndex >= currentLightboxImages.length) {
    currentLightboxIndex = 0;
  }
  updateLightboxImage();
}

function closePamphletZoom(event) {
  if (event) event.stopPropagation();
  const lightbox = document.getElementById('pamphletLightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

// Zoom controls
function zoomIn() {
  currentZoomScale += 0.25;
  applyZoom();
}

function zoomOut() {
  if (currentZoomScale > 0.5) {
    currentZoomScale -= 0.25;
    applyZoom();
  }
}

function resetZoom() {
  currentZoomScale = 1;
  applyZoom();
}

function applyZoom() {
  const imgEl = document.getElementById('lightboxImage');
  if (imgEl) {
    imgEl.style.transform = `scale(${currentZoomScale})`;
    imgEl.style.transition = 'transform 0.2s ease';
  }
}

// Close lightbox on Escape key press
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
    closePamphletZoom();
  }
});
