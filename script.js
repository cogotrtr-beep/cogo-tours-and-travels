/* ==========================================================================
   COGO TOURS & TRAVELS - MASTER JAVASCRIPT SYSTEM
   ========================================================================== */

// Global State
let currentLightboxList = [];
let currentLightboxIndex = 0;
let currentZoomScale = 1;

// 1. CONVEYOR TRACK DUPLICATOR
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

// Global Click Delegation to fix all unclickable buttons, tabs & cloned cards
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[onclick]');
  if (!trigger) return;

  // Handles inline onclick calls reliably across original and cloned elements
  const onClickFunc = trigger.getAttribute('onclick');
  if (onClickFunc && !onClickFunc.includes('submitEnquiry')) {
    try {
      const exec = new Function(onClickFunc);
      exec();
    } catch (err) {
      console.log('Event executed directly via inline handle');
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setupCSSConveyor('domesticTrack');
  setupCSSConveyor('intlTrack');
});


// 2. MODAL SYSTEM & DATA
const categoryData = {
  cabs: {
    title: "Cab Services & Tariff",
    desc: "Clean, well-maintained vehicles with professional local drivers.",
    content: `
      <table class="tariff-table" style="width:100%; border-collapse:collapse; margin-top:10px;">
        <thead>
          <tr style="background:#f1f5f9; text-align:left;">
            <th style="padding:8px;">Vehicle Type</th>
            <th style="padding:8px;">Local (8 Hrs/80 km)</th>
            <th style="padding:8px;">Extra/km</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:8px;">Sedan (Dzire/Etios)</td><td style="padding:8px;">₹2,200</td><td style="padding:8px;">₹14</td></tr>
          <tr><td style="padding:8px;">SUV (Ertiga)</td><td style="padding:8px;">₹3,200</td><td style="padding:8px;">₹18</td></tr>
          <tr><td style="padding:8px;">Premium SUV (Innova Crysta)</td><td style="padding:8px;">₹4,500</td><td style="padding:8px;">₹22</td></tr>
          <tr><td style="padding:8px;">Tempo Traveller (12-16 Seater)</td><td style="padding:8px;">₹5,500</td><td style="padding:8px;">₹26</td></tr>
        </tbody>
      </table>`
  },
  journey: {
    title: "Plan Your Custom Journey",
    desc: "Tell us your preferences and we will craft the perfect itinerary for you.",
    content: `<p style="font-size:13px; color:#64748b;">Fill out your preferences below and our travel desk will reach out with customized options.</p>`
  },
  ticket: {
    title: "Flight, Train & Bus Ticket Booking",
    desc: "Instant reservation support for all major transport networks.",
    content: `<p style="font-size:13px; color:#64748b;">Mention your route, preferred date, and passengers below for fast booking assistance.</p>`
  },
  visa: {
    title: "Visa Assistance & Processing",
    desc: "End-to-end documentation, appointment scheduling, and verification.",
    content: `<p style="font-size:13px; color:#64748b;">We handle tourist and business visas for Dubai, Singapore, Europe, USA, UK & more.</p>`
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

// 3. FORM SUBMISSION
function submitEnquiry(type) {
  const nameEl = document.getElementById('userName');
  const phoneEl = document.getElementById('userPhone');
  const queryEl = document.getElementById('userQuery');

  const name = nameEl ? nameEl.value.trim() : "";
  const phone = phoneEl ? phoneEl.value.trim() : "";
  const query = queryEl ? queryEl.value.trim() : "";
  const modalTitle = document.getElementById('modalTitle')?.innerText || "Enquiry";

  if (!name || !phone) {
    alert("Please enter your Name and Phone/WhatsApp number.");
    return;
  }

  const primaryPhone = "919884066830";
  const primaryEmail = "cogotrtr@gmail.com";

  if (type === 'whatsapp') {
    const text = `*New Enquiry - Cogo Tours*\n\n*Category:* ${modalTitle}\n*Name:* ${name}\n*Phone:* ${phone}\n*Details:* ${query || 'N/A'}`;
    window.open(`https://wa.me/${primaryPhone}?text=${encodeURIComponent(text)}`, '_blank');
  } else if (type === 'email') {
    const subject = encodeURIComponent(`Enquiry for ${modalTitle} - ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nTravel Notes / Query:\n${query}`);
    window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
  }

  closeModal();
}

// 4. PAMPHLET LIGHTBOX & ZOOM
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
