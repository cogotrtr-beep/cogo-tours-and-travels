/* ==========================================================================
   COGO TOURS & TRAVELS - MAIN JAVASCRIPT SYSTEM
   Includes Infinite Conveyor Belt Sliders, Dynamic Modals, Lightbox & Forms
   ========================================================================== */

// --- GLOBAL STATE ---
let currentLightboxList = [];
let currentLightboxIndex = 0;
let currentZoomScale = 1;

// Stores slider intervals to prevent memory leaks and track auto-scroll
const activeSliderIntervals = {};

// ==========================================
// 1. INFINITE DYNAMIC CLONING CONVEYOR BELT
// ==========================================

/**
 * Initializes continuous marquee-style auto-scroll using clone duplication.
 * Works seamlessly across both desktop and touch devices.
 * @param {string} trackId - Element ID of the .slider-track container
 */
function initConveyorSlider(trackId) {
  const track = document.getElementById(trackId);
  if (!track || track.dataset.initialized === "true") return;

  // Cache original slides before cloning
  const originalCards = Array.from(track.querySelectorAll('.slide-card'));
  if (originalCards.length === 0) return;

  // Duplicate cards for seamless loop transition
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); // Accessibility compliance for duplicate cards
    track.appendChild(clone);
  });

  // Flag track as initialized
  track.dataset.initialized = "true";

  // Automatic scrolling execution
  const scrollStep = 1; // Pixels per interval tick
  const stepInterval = 20; // Speed tick rate in milliseconds

  function startAutoScroll() {
    stopAutoScroll();
    activeSliderIntervals[trackId] = setInterval(() => {
      track.scrollLeft += scrollStep;

      // When the scroll reaches halfway (the boundary between originals and clones), reset to start seamlessly
      const maxScroll = track.scrollWidth / 2;
      if (track.scrollLeft >= maxScroll) {
        track.scrollLeft -= maxScroll;
      }
    }, stepInterval);
  }

  function stopAutoScroll() {
    if (activeSliderIntervals[trackId]) {
      clearInterval(activeSliderIntervals[trackId]);
      delete activeSliderIntervals[trackId];
    }
  }

  // Event Listeners for Pause/Resume interactions
  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', startAutoScroll);
  track.addEventListener('touchstart', stopAutoScroll, { passive: true });
  track.addEventListener('touchend', startAutoScroll, { passive: true });

  // Start the continuous motion
  startAutoScroll();
}

/**
 * Manual Navigation Arrows for the Slider Tracks
 * @param {string} trackId - Target slider track ID
 * @param {number} direction - Direction modifier (-1 for Left, 1 for Right)
 */
function moveSlide(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const cardWidth = track.querySelector('.slide-card')?.offsetWidth || 300;
  const gap = 16; // Standard layout gap
  const scrollAmount = (cardWidth + gap) * direction;

  track.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

// Automatically mount conveyor belts on page load
document.addEventListener('DOMContentLoaded', () => {
  initConveyorSlider('domesticTrack');
  initConveyorSlider('intlTrack');
});


// ==========================================
// 2. CATEGORY DATA & DYNAMIC MODALS
// ==========================================

const categoryData = {
  cabs: {
    title: "Cab Services & Tariff",
    desc: "Clean, well-maintained vehicles with professional local drivers.",
    subTabs: ["Local Tariff", "Outstation Tariff"],
    content: `
      <table class="tariff-table">
        <thead>
          <tr><th>Vehicle Type</th><th>Local (8 Hrs/80 km)</th><th>Extra/km</th></tr>
        </thead>
        <tbody>
          <tr><td>Sedan (Dzire/Etios)</td><td>₹2,200</td><td>₹14</td></tr>
          <tr><td>SUV (Ertiga)</td><td>₹3,200</td><td>₹18</td></tr>
          <tr><td>Premium SUV (Innova Crysta)</td><td>₹4,500</td><td>₹22</td></tr>
          <tr><td>Tempo Traveller (12-16 Seater)</td><td>₹5,500</td><td>₹26</td></tr>
        </tbody>
      </table>`
  },
  journey: {
    title: "Plan Your Custom Journey",
    desc: "Tell us your preferences and we'll craft the perfect itinerary for you.",
    content: `<p class="modal-info-text">Please fill out your requirements in the form below. Our travel experts will get back to you with custom options within 30 minutes.</p>`
  },
  ticket: {
    title: "Flight, Train & Bus Ticket Booking",
    desc: "Instant reservation support for all major transport networks.",
    content: `<p class="modal-info-text">Mention your travel route, preferred date, and passenger details below for quick availability checks and lowest fare options.</p>`
  },
  visa: {
    title: "Visa Assistance & Processing",
    desc: "End-to-end documentation, appointment scheduling, and verification.",
    content: `<p class="modal-info-text">We process tourist, business, and family visas for Dubai, Singapore, Malaysia, Schengen area, USA, UK, and more.</p>`
  },
  chennai: {
    title: "Tour Chennai Packages",
    desc: "Explore coastal heritage, ancient temples, beaches, and city sights.",
    content: `<p class="modal-info-text">Full-day and half-day guided sightseeing tours including Kapaleeshwarar Temple, Marina Beach, San Thome Basilica, and Mahabalipuram.</p>`
  },
  pilgrim: {
    title: "Spiritual & Pilgrim Circuits",
    desc: "Divine journeys planned with care and comfort for your family.",
    content: `<p class="modal-info-text">Special packages for Tirupati Balaji Darshan, Shirdi Sai Baba, Kanchipuram Temple Circuit, Navagraha Temples, and Rameshwaram.</p>`
  },
  "south-india": {
    title: "South India Holiday Packages",
    desc: "Misty hill stations, tranquil backwaters, and lush plantations.",
    content: `<p class="modal-info-text">Discover Ooty, Kodaikanal, Munnar, Alleppey Houseboats, Wayanad, Coorg, and Mysore with personalized transport and stay.</p>`
  },
  "north-india": {
    title: "North India & Royal Circuits",
    desc: "Golden Triangle, Himalayan retreats, and historic fortresses.",
    content: `<p class="modal-info-text">Packages for Delhi, Agra, Jaipur, Shimla, Manali, Kashmir Valley, Leh-Ladakh, and Varanasi.</p>`
  },
  "north-east": {
    title: "North East Excursions",
    desc: "Pristine natural valleys, tea estates, and unique culture.",
    content: `<p class="modal-info-text">Explore Gangtok, Darjeeling, Meghalaya waterfalls, Shillong, and Kaziranga National Park.</p>`
  },
  "rest-of-india": {
    title: "Rest of India Destinations",
    desc: "Beach escapes, desert safaris, and island getaways.",
    content: `<p class="modal-info-text">Packages covering Goa beaches, Gujarat Rann of Kutch, Madhya Pradesh wildlife, and Andaman Islands.</p>`
  },
  international: {
    title: "International Holiday Packages",
    desc: "Worldwide getaways designed for seamless global exploration.",
    content: `<p class="modal-info-text">All-inclusive international tours to Dubai, Singapore, Thailand, Malaysia, Bali, Sri Lanka, Europe, and Vietnam.</p>`
  },
  corporate: {
    title: "Corporate MICE & Business Trips",
    desc: "Professional corporate retreats, team building, and event logistics.",
    content: `<p class="modal-info-text">Tailored group travel solutions including flight arrangements, conference hall bookings, hotel stays, and local transportation.</p>`
  },
  students: {
    title: "School & College Educational Tours",
    desc: "Safe, informative, and engaging group excursions for students.",
    content: `<p class="modal-info-text">Industrial visits, historical tours, botanical studies, and adventure camps designed with strict safety protocols.</p>`
  },
  adventure: {
    title: "Adventure & Wildlife Expeditions",
    desc: "Thrill-seeking treks, camping trails, and jungle safaris.",
    content: `<p class="modal-info-text">Experience trekking in Western Ghats, white water rafting, jeep safaris, and outdoor camping with certified guides.</p>`
  },
  honeymoon: {
    title: "Honeymoon & Romantic Getaways",
    desc: "Unforgettable, relaxing trips crafted for newlyweds.",
    content: `<p class="modal-info-text">Romantic candlelight dinners, luxury resort stays, and private transfers in Munnar, Andaman, Bali, Maldives, and Europe.</p>`
  }
};

/**
 * Opens and injects data into the dynamic Enquiry Modal
 * @param {string} categoryKey - Key corresponding to categoryData object
 */
function openCategoryModal(categoryKey) {
  const data = categoryData[categoryKey] || {
    title: "Plan Your Journey",
    desc: "Get in touch with us for quotes and customized itineraries.",
    content: ""
  };

  document.getElementById('modalTitle').innerText = data.title;
  document.getElementById('modalDescription').innerText = data.desc;
  document.getElementById('modalDynamicContent').innerHTML = data.content || "";

  // Render Sub Tabs if available
  const subTabsContainer = document.getElementById('modalSubTabs');
  if (data.subTabs && data.subTabs.length > 0) {
    subTabsContainer.style.display = "flex";
    subTabsContainer.innerHTML = data.subTabs.map((tab, idx) => 
      `<button type="button" class="sub-tab-btn ${idx === 0 ? 'active' : ''}">${tab}</button>`
    ).join('');
  } else {
    subTabsContainer.style.display = "none";
    subTabsContainer.innerHTML = "";
  }

  const modal = document.getElementById('enquiryModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Lock background scrolling
}

function closeModal() {
  const modal = document.getElementById('enquiryModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
}

function closeModalOnOverlay(event) {
  if (event.target.id === 'enquiryModal') {
    closeModal();
  }
}


// ==========================================
// 3. FORM SUBMISSION (WHATSAPP & EMAIL)
// ==========================================

function submitEnquiry(type) {
  const name = document.getElementById('userName').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const query = document.getElementById('userQuery').value.trim();
  const modalTitle = document.getElementById('modalTitle').innerText;

  if (!name || !phone) {
    alert("Please fill in your Name and Phone/WhatsApp number before proceeding.");
    return;
  }

  const primaryPhone = "919884066830";
  const primaryEmail = "cogotrtr@gmail.com";

  if (type === 'whatsapp') {
    const text = `*New Enquiry - Cogo Tours*\n\n` +
                 `*Category:* ${modalTitle}\n` +
                 `*Name:* ${name}\n` +
                 `*Phone:* ${phone}\n` +
                 `*Details:* ${query || 'N/A'}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${primaryPhone}?text=${encodedText}`, '_blank');
  } else if (type === 'email') {
    const subject = encodeURIComponent(`Enquiry for ${modalTitle} - ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nTravel Notes / Query:\n${query}`);
    window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
  }

  closeModal();
}


// ==========================================
// 4. LIGHTBOX & PAMPHLET ZOOM GALLERY
// ==========================================

function openPamphletList(imagesArray, initialIndex = 0) {
  if (!imagesArray || imagesArray.length === 0) return;

  currentLightboxList = imagesArray;
  currentLightboxIndex = initialIndex;
  currentZoomScale = 1;

  updateLightboxImage();

  const lightbox = document.getElementById('pamphletLightbox');
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function updateLightboxImage() {
  const imgElement = document.getElementById('lightboxImage');
  imgElement.src = currentLightboxList[currentLightboxIndex];
  resetZoom();
}

function navigateLightbox(direction, event) {
  if (event) event.stopPropagation();

  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = currentLightboxList.length - 1;
  } else if (currentLightboxIndex >= currentLightboxList.length) {
    currentLightboxIndex = 0;
  }

  updateLightboxImage();
}

function closePamphletZoom(event) {
  // Close if close button, lightbox overlay, or background container is clicked
  if (!event || event.target.id === 'pamphletLightbox' || event.target.classList.contains('pamphlet-close')) {
    const lightbox = document.getElementById('pamphletLightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function zoomIn() {
  currentZoomScale = Math.min(currentZoomScale + 0.25, 3);
  applyZoom();
}

function zoomOut() {
  currentZoomScale = Math.max(currentZoomScale - 0.25, 0.75);
  applyZoom();
}

function resetZoom() {
  currentZoomScale = 1;
  applyZoom();
}

function applyZoom() {
  const imgElement = document.getElementById('lightboxImage');
  if (imgElement) {
    imgElement.style.transform = `scale(${currentZoomScale})`;
    imgElement.style.transition = 'transform 0.2s ease-in-out';
  }
}

// Keyboard shortcuts for Lightbox (Esc, Left Arrow, Right Arrow)
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('pamphletLightbox');
  if (lightbox && lightbox.style.display === 'flex') {
    if (e.key === 'Escape') closePamphletZoom({ target: { id: 'pamphletLightbox' } });
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }
});
