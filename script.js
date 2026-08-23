/* ==========================================================================
   COGO TOURS & TRAVELS - MASTER JS SYSTEM
   ========================================================================== */

// 1. CONVEYOR DUPLICATOR
function setupCSSConveyor(trackId) {
  const track = document.getElementById(trackId);
  if (!track || track.dataset.cloned === "true") return;

  const originalCards = Array.from(track.querySelectorAll('.slide-card'));
  if (originalCards.length === 0) return;

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  track.dataset.cloned = "true";
}

document.addEventListener('DOMContentLoaded', () => {
  setupCSSConveyor('domesticTrack');
  setupCSSConveyor('intlTrack');
});

// 2. MODAL & CATEGORY DATA
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
    content: ""
  },
  ticket: {
    title: "Flight, Train & Bus Tickets",
    desc: "Instant reservation support for all major transport networks.",
    content: ""
  },
  visa: {
    title: "Visa Assistance & Processing",
    desc: "End-to-end documentation & appointment scheduling.",
    content: ""
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

// 3. FORM SUBMISSION (WhatsApp & Email)
function submitEnquiry(type) {
  const name = document.getElementById('userName')?.value.trim();
  const phone = document.getElementById('userPhone')?.value.trim();
  const query = document.getElementById('userQuery')?.value.trim();
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
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nNotes:\n${query}`);
    window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
  }

  closeModal();
}

// 4. LIGHTBOX & ZOOM CONTROLS
let currentLightboxImages = [];
let currentLightboxIndex = 0;
let currentZoomScale = 1;

function openPamphletList(imagesArray, initialIndex = 0) {
  if (!imagesArray || imagesArray.length === 0) return;
  currentLightboxImages = imagesArray;
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
  if (imgElement && currentLightboxImages[currentLightboxIndex]) {
    imgElement.src = currentLightboxImages[currentLightboxIndex];
    imgElement.style.transform = `scale(${currentZoomScale})`;
  }
}

function navigateLightbox(direction, event) {
  if (event) event.stopPropagation();
  if (currentLightboxImages.length === 0) return;

  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = currentLightboxImages.length - 1;
  if (currentLightboxIndex >= currentLightboxImages.length) currentLightboxIndex = 0;

  currentZoomScale = 1;
  updateLightboxImage();
}

function zoomIn() {
  currentZoomScale = Math.min(currentZoomScale + 0.25, 3);
  updateLightboxImage();
}

function zoomOut() {
  currentZoomScale = Math.max(currentZoomScale - 0.25, 0.75);
  updateLightboxImage();
}

function resetZoom() {
  currentZoomScale = 1;
  updateLightboxImage();
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
