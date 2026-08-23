/* =========================================================
   COGOTOURS - MAIN JAVASCRIPT HANDLER
   ========================================================= */

// 1. CATEGORY & SERVICE DATA
const categoryData = {
  cabs: {
    title: "Cab Services & Tariff",
    desc: "Clean, well-maintained vehicles with professional local drivers.",
    content: `
      <table style="width:100%; border-collapse:collapse; margin-top:8px; font-size:13px; text-align:left;">
        <thead>
          <tr style="background:#f1f5f9; color:#0f172a;">
            <th style="padding:8px; border-bottom:2px solid #cbd5e1;">Vehicle</th>
            <th style="padding:8px; border-bottom:2px solid #cbd5e1;">Local (8h/80km)</th>
            <th style="padding:8px; border-bottom:2px solid #cbd5e1;">Extra / km</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Sedan (Dzire/Etios)</td><td style="padding:8px;">₹2,200</td><td style="padding:8px;">₹14</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">SUV (Ertiga)</td><td style="padding:8px;">₹3,200</td><td style="padding:8px;">₹18</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Innova Crysta</td><td style="padding:8px;">₹4,500</td><td style="padding:8px;">₹22</td></tr>
          <tr><td style="padding:8px;">Tempo Traveller</td><td style="padding:8px;">₹5,500</td><td style="padding:8px;">₹26</td></tr>
        </tbody>
      </table>`
  },
  journey: {
    title: "Plan Your Custom Journey",
    desc: "Tell us your preferences and we will craft the perfect itinerary for you.",
    content: "<p style='color:#475569;'>Share your travel plan details in the form below and our travel desk will reach back to you shortly with a personalized quote.</p>"
  },
  ticket: {
    title: "Flight, Train & Bus Tickets",
    desc: "Instant reservation support for all major transport networks.",
    content: "<p style='color:#475569;'>Enter your departure date, source, destination, and preferred travel class in the form below for fast ticket bookings.</p>"
  },
  visa: {
    title: "Visa Assistance & Processing",
    desc: "End-to-end documentation & appointment scheduling.",
    content: "<p style='color:#475569;'>Mention your destination country and expected date of departure to receive complete visa checklist and assistance.</p>"
  },
  chennai: {
    title: "Tour Chennai Packages",
    desc: "Explore Mahabalipuram, heritage temples, beaches, and local sights.",
    content: `
      <div style="font-size:13px; color:#334155;">
        <p><b>Popular Itineraries:</b></p>
        <ul style="padding-left:18px; margin:4px 0 8px 0;">
          <li><b>1-Day Local Tour:</b> Kapaleeshwarar Temple, Marina Beach, Fort St. George, Santhome Church.</li>
          <li><b>2-Day Coastal Circuit:</b> Chennai sightseeing + Mahabalipuram shore temples & Covelong beach.</li>
          <li><b>3-Day Heritage Trail:</b> Chennai + Kanchipuram silk town & Mahabalipuram.</li>
        </ul>
      </div>`
  },
  pilgrim: {
    title: "Pilgrim Tour Circuits",
    desc: "Shirdi, Tirupati, Kanchipuram, and South India temple circuits.",
    content: `
      <div style="font-size:13px; color:#334155;">
        <p><b>Spiritual Destinations Covered:</b></p>
        <ul style="padding-left:18px; margin:4px 0 8px 0;">
          <li><b>Tirupati Balaji:</b> Daily packages with confirmed Seeghra Darshan tickets & cab pickup.</li>
          <li><b>Navagraha Temple Circuit:</b> Kumbakonam 9-temple tour packages.</li>
          <li><b>Shirdi & Western Circuits:</b> Flight/Train packages with star hotel stays.</li>
        </ul>
      </div>`
  },
  "south-india": {
    title: "Tour South India",
    desc: "Kodaikanal misty hills, Kerala backwaters & Coorg escapes.",
    content: `
      <div style="font-size:13px; color:#334155;">
        <p><b>Top Packages Available:</b></p>
        <ul style="padding-left:18px; margin:4px 0 8px 0;">
          <li><b>Munnar & Alleppey (4D/3N):</b> Tea gardens, waterfalls & luxury houseboat stays.</li>
          <li><b>Ooty & Kodaikanal (5D/4N):</b> Hill station retreats, botanical gardens & lake boating.</li>
          <li><b>Coorg & Mysore (4D/3N):</b> Coffee plantations, palaces & waterfalls.</li>
        </ul>
      </div>`
  },
  "north-india": {
    title: "Tour North India",
    desc: "Royal palaces, Golden Triangle tours & snow peaks.",
    content: `
      <div style="font-size:13px; color:#334155;">
        <p><b>Featured Circuits:</b></p>
        <ul style="padding-left:18px; margin:4px 0 8px 0;">
          <li><b>Golden Triangle (5D/4N):</b> Delhi, Agra (Taj Mahal) & Jaipur.</li>
          <li><b>Kashmir Valley (6D/5N):</b> Srinagar, Gulmarg, Pahalgam & Sonmarg.</li>
          <li><b>Himachal Express (6D/5N):</b> Shimla, Manali & Solang Valley.</li>
        </ul>
      </div>`
  },
  "north-east": {
    title: "Tour North East",
    desc: "Gangtok, Darjeeling, Meghalaya & pristine valleys.",
    content: `
      <div style="font-size:13px; color:#334155;">
        <p><b>Pristine Destinations:</b></p>
        <ul style="padding-left:18px; margin:4px 0 8px 0;">
          <li><b>Sikkim & Darjeeling (6D/5N):</b> Tsomgo Lake, Nathula Pass & Tiger Hill sunrise.</li>
          <li><b>Meghalaya Explorer (5D/4N):</b> Shillong, Cherrapunji caves & Dawki crystal river.</li>
        </ul>
      </div>`
  },
  "rest-of-india": {
    title: "Tour Rest of India",
    desc: "Explore unique destinations across all states & territories.",
    content: `
      <div style="font-size:13px; color:#334155;">
        <p><b>Special Regional Experience Tours:</b></p>
        <ul style="padding-left:18px; margin:4px 0 8px 0;">
          <li><b>Goa Beach Getaway:</b> North & South Goa beach resorts with watersports.</li>
          <li><b>Andaman Islands:</b> Port Blair, Havelock Island & Radhanagar Beach.</li>
          <li><b>Gujarat Heritage:</b> Rann of Kutch, Statue of Unity & Gir Forest safari.</li>
        </ul>
      </div>`
  },
  international: {
    title: "Tour International",
    desc: "Unforgettable foreign trips to Dubai, Singapore & Europe.",
    content: `
      <div style="font-size:13px; color:#334155;">
        <p><b>Best Selling International Packages:</b></p>
        <ul style="padding-left:18px; margin:4px 0 8px 0;">
          <li><b>Dubai & Abu Dhabi (5D/4N):</b> Desert safari, Burj Khalifa & museum tours.</li>
          <li><b>Singapore & Malaysia (6D/5N):</b> Universal Studios, Sentosa & Genting Highlands.</li>
          <li><b>Thailand Delight (5D/4N):</b> Bangkok & Pattaya coral islands with meals.</li>
          <li><b>Bali Paradise (5D/4N):</b> Ubud cultural tour & private beach villas.</li>
        </ul>
      </div>`
  },
  corporate: {
    title: "Corporate Tour",
    desc: "Tailored MICE, team retreats, and business outings.",
    content: "<p style='color:#475569;'>Custom offsite plans including conference facilities, team-building activities, resort bookings, and bus/cab transport options.</p>"
  },
  students: {
    title: "School & College Tours",
    desc: "Educational field trips and safe student excursions.",
    content: "<p style='color:#475569;'>Budget-friendly, verified student packages with dedicated coordinators, safe group transport, and educational venue visits.</p>"
  },
  adventure: {
    title: "Adventure Tour",
    desc: "Trekking, camping, wildlife, and thrill-seeking trips.",
    content: "<p style='color:#475569;'>Rishikesh rafting, Western Ghats trekking, Wayanad camping, and forest jeep safaris customized for adventure seekers.</p>"
  },
  honeymoon: {
    title: "Honeymoon Tour",
    desc: "Romantic getaways and relaxing couples' retreats.",
    content: "<p style='color:#475569;'>Special couples' packages featuring romantic candlelit dinners, flower bed decorations, private cab transfers, and premium resort stays.</p>"
  }
};

let currentCategoryTitle = "";

function clearFormFields() {
  ['userName', 'userPhone', 'userQuery'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// 2. MODAL HANDLERS
function openCategoryModal(categoryKey) {
  const modal = document.getElementById('categoryModal');
  const data = categoryData[categoryKey];

  if (!data || !modal) return;

  currentCategoryTitle = data.title;

  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDesc');
  const contentEl = document.getElementById('modalContent');

  if (titleEl) titleEl.innerText = data.title;
  if (descEl) descEl.innerText = data.desc;
  if (contentEl) contentEl.innerHTML = data.content;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCategoryModal(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const modal = document.getElementById('categoryModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  clearFormFields();
}

// 3. ENQUIRY FORM SUBMISSION
function submitEnquiry(type) {
  const name = document.getElementById('userName')?.value.trim();
  const phone = document.getElementById('userPhone')?.value.trim();
  const query = document.getElementById('userQuery')?.value.trim();

  if (!name || !phone) {
    alert('Please fill in your Name and Phone/WhatsApp number.');
    return;
  }

  const category = currentCategoryTitle || "General Travel Inquiry";
  const message = `*New Travel Enquiry - Cogo Tours*\n\n*Service/Package:* ${category}\n*Name:* ${name}\n*Phone:* ${phone}\n*Notes/Requirements:* ${query || 'N/A'}`;

  if (type === 'whatsapp') {
    const waNumber = "919884066830";
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  } else if (type === 'email') {
    const emailTo = "cogotrtr@gmail.com";
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent("Enquiry for " + category)}&body=${encodeURIComponent(message)}`;
  }

  closeCategoryModal();
}

// 4. PAMPHLET FULLSCREEN, ZOOM & TOUCH SWIPE ENGINE
let zoomLevel = 1;
let currentGallery = [];
let currentGalleryIndex = 0;
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let initialPinchDist = 0;
let lastTapTime = 0;

function openPamphletList(images, startIndex) {
  if (!Array.isArray(images) || images.length === 0) return;

  currentGallery = images;
  currentGalleryIndex = startIndex || 0;

  const lightbox = document.getElementById('pamphletLightbox');
  const img = document.getElementById('lightboxImage');

  if (img) img.src = currentGallery[currentGalleryIndex];
  if (lightbox) {
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  resetZoom();
}

function closePamphletZoom(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const lightbox = document.getElementById('pamphletLightbox');
  if (lightbox) {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
    resetZoom();
  }
}

function navigateLightbox(direction, event) {
  if (event && event.stopPropagation) event.stopPropagation();
  if (!currentGallery.length) return;

  currentGalleryIndex = (currentGalleryIndex + direction + currentGallery.length) % currentGallery.length;

  const img = document.getElementById('lightboxImage');
  if (img) img.src = currentGallery[currentGalleryIndex];
  resetZoom();
}

function zoomIn() {
  zoomLevel = Math.min(zoomLevel + 0.3, 3.5);
  applyZoom();
}

function zoomOut() {
  if (zoomLevel > 0.5) {
    zoomLevel = Math.max(zoomLevel - 0.3, 0.5);
    applyZoom();
  }
}

function resetZoom() {
  zoomLevel = 1;
  applyZoom();
}

function applyZoom() {
  const img = document.getElementById('lightboxImage');
  if (img) {
    img.style.transition = 'transform 0.15s ease-out';
    img.style.transform = `scale(${zoomLevel})`;
    img.style.webkitTransform = `scale(${zoomLevel})`;
  }
}

// 5. EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('pamphletLightbox');
  const categoryModal = document.getElementById('categoryModal');
  const img = document.getElementById('lightboxImage');

  if (categoryModal) {
    categoryModal.addEventListener('click', (e) => {
      if (e.target === categoryModal) closeCategoryModal();
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closePamphletZoom();
    });

    // PC: Mouse wheel scroll zoom
    lightbox.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    }, { passive: false });

    // Mobile: Touch Gestures Setup
    lightbox.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      } else if (e.touches.length === 2) {
        initialPinchDist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
      }
    }, { passive: true });

    lightbox.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && initialPinchDist > 0) {
        const currentDist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        const factor = currentDist / initialPinchDist;
        zoomLevel = Math.min(Math.max(zoomLevel * factor, 0.8), 3.5);
        applyZoom();
        initialPinchDist = currentDist;
      }
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeAndDismiss();
      }
    }, { passive: true });
  }

  // Mobile: Double-tap to toggle zoom
  if (img) {
    img.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTapTime;
      if (tapLength < 300 && tapLength > 0) {
        e.preventDefault();
        zoomLevel = zoomLevel > 1 ? 1 : 2;
        applyZoom();
      }
      lastTapTime = currentTime;
    });
  }

  function handleSwipeAndDismiss() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const threshold = 50;

    // Mobile: Swipe Up to Close / Return to original position
    if (deltaY < -threshold && Math.abs(deltaX) < threshold) {
      closePamphletZoom();
      return;
    }

    // Mobile: Finger slide left/right to change pamphlets (when unzoomed)
    if (zoomLevel <= 1) {
      if (deltaX < -threshold) navigateLightbox(1);
      else if (deltaX > threshold) navigateLightbox(-1);
    }
  }
});

// Keyboard controls
window.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('pamphletLightbox');
  const isActive = lightbox && lightbox.classList.contains('show');

  if (e.key === 'Escape') {
    closeCategoryModal();
    closePamphletZoom();
  }
  if (e.key === 'ArrowRight' && isActive) {
    e.preventDefault();
    navigateLightbox(1);
  }
  if (e.key === 'ArrowLeft' && isActive) {
    e.preventDefault();
    navigateLightbox(-1);
  }
});
