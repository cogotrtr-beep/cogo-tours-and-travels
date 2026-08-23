/* ==========================================================================
   COGO TOURS & TRAVELS - MAIN JAVASCRIPT SYSTEM
   ========================================================================== */

// --- GLOBAL STATE ---
let currentLightboxList = [];
let currentLightboxIndex = 0;
let currentZoomScale = 1;

// ==========================================
// 1. DYNAMIC CONVEYOR CLONER
// ==========================================

function setupCSSConveyor(trackId) {
  const track = document.getElementById(trackId);
  if (!track || track.dataset.cloned === "true") return;

  const originalCards = Array.from(track.querySelectorAll('.slide-card, .ongoing-card, .tour-card'));
  if (originalCards.length === 0) return;

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  track.dataset.cloned = "true";
}

// Global click delegator so cloned cards and action buttons trigger reliably
document.addEventListener('click', (e) => {
  const triggerBtn = e.target.closest('[onclick]');
  if (!triggerBtn) return;

  // Let standard clicks process normally without event cancellation
});

document.addEventListener('DOMContentLoaded', () => {
  setupCSSConveyor('domesticTrack');
  setupCSSConveyor('intlTrack');
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
  }
};

function openCategoryModal(categoryKey) {
  const data = categoryData[categoryKey] || {
    title: "Plan Your Journey",
    desc: "Get in touch with us for quotes and customized itineraries.",
    content: ""
  };

  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDescription');
  const contentEl = document.getElementById('modalDynamicContent');

  if (titleEl) titleEl.innerText = data.title;
  if (descEl) descEl.innerText = data.desc;
  if (contentEl) contentEl.innerHTML = data.content || "";

  const modal = document.getElementById('enquiryModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('enquiryModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
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
  const nameEl = document.getElementById('userName');
  const phoneEl = document.getElementById('userPhone');
  const queryEl = document.getElementById('userQuery');

  const name = nameEl ? nameEl.value.trim() : "";
  const phone = phoneEl ? phoneEl.value.trim() : "";
  const query = queryEl ? queryEl.value.trim() : "";
  const modalTitle = document.getElementById('modalTitle')?.innerText || "Enquiry";

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
    window.open(`https://wa.me/${primaryPhone}?text=${encodeURIComponent(text)}`, '_blank');
  } else if (type === 'email') {
    const subject = encodeURIComponent(`Enquiry for ${modalTitle} - ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nTravel Notes / Query:\n${query}`);
    window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
  }

  closeModal();
}


// ==========================================
// 4. LIGHTBOX & PAMPHLET FULL-PAGE ZOOM
// ==========================================

function openPamphletList(imagesArray, initialIndex = 0) {
  if (!imagesArray || imagesArray.length === 0) return;

  currentLightboxList = imagesArray;
  currentLightboxIndex = initialIndex;
  currentZoomScale = 1;

  updateLightboxImage();

  const lightbox = document.getElementById('pamphletLightbox');
  if (lightbox) {
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function updateLightboxImage() {
  const imgElement = document.getElementById('lightboxImage');
  if (imgElement && currentLightboxList[currentLightboxIndex]) {
    imgElement.src = currentLightboxList[currentLightboxIndex];
    resetZoom();
  }
}

function closePamphletZoom(event) {
  if (!event || event.target.id === 'pamphletLightbox' || event.target.classList.contains('pamphlet-close')) {
    const lightbox = document.getElementById('pamphletLightbox');
    if (lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
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
