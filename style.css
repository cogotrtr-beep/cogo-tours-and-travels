/* =========================================================
   COGO TOURS & CABS - DYNAMIC ENGINE & SIGHTSEEING TABS
========================================================= */

// Global State
let activeServiceTitle = "General Journey Enquiry";
let currentPamphletList = [];
let currentPamphletIndex = 0;
let currentZoomScale = 1;

// Drag / Pan State for Mobile & Hand Dragging
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
  desc: "Fixed tariffs for Sedan, Innova, Crysta and Tempo Travellers.",
  tabs: [
    {
      name: "Standard Tariff",
      images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop"],
      content: `
        <div class="tariff-box">
          <h4 style="font-size: 19px;">⚡ Standard Rental Charges</h4>
          <ul class="bulletin-list">
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan (50km)</span> <span class="bullet-price">₹1,400</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova (50km)</span> <span class="bullet-price">₹2,000</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova Crysta (10H 100km)</span> <span class="bullet-price">₹4,600</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan 250km Pack</span> <span class="bullet-price">₹4,500</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova 250km Pack</span> <span class="bullet-price">₹6,000</span></li>
            <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Crysta 250km Pack</span> <span class="bullet-price">₹6,750</span></li>
          </ul>
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
          </div>
        `
      }
    ]
  },
  "cogo-cabs": cogoCabsData,
  cabservices: cogoCabsData,
  chennai: {
    title: "🏛️ Tour Chennai Packages",
    desc: "Explore heritage, coastal ECR, and theme parks in around Chennai.",
    tabs: [
      {
        name: "ECR & Coastal Heritage",
        images: [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1609946782200-d3a39e763137?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 19px;">🌊 ECR Coastal & Heritage Day Circuit</h4>
            <p style="font-size: 16px;"><strong>Places Covered:</strong> DakshinaChitra Heritage Museum → Muttukadu Boating → Kovalam Beach → Crocodile Park → Tiger Cave → Mahabalipuram.</p>
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
            <p style="font-size: 16px;">• Mahabalipuram & Thirukazhukundram</p>
          </div>
        `
      }
    ]
  }
};

const defaultCategoryInfo = {
  tickets: { title: "🎟️ Ticket Booking", desc: "Flight, Train & Bus Reservations.", content: "Instant ticketing assistance." }
};

/* =========================================================
   MODAL OPEN / CLOSE HANDLERS
========================================================= */

function openCategoryModal(catKey) {
  if (catKey === 'plan-your-journey' || catKey === 'journey-planning') catKey = 'journey';

  const data = categoryData[catKey];
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
  } else {
    const fallback = defaultCategoryInfo[catKey] || { title: "Enquiry", desc: "Custom Travel Package", content: "Contact us directly for custom pricing." };
    activeServiceTitle = fallback.title;
    currentPamphletList = fallback.images || [];
    renderTabContent({ content: `<div class="tariff-box"><p>${fallback.content}</p></div>`, images: currentPamphletList });
  }

  showModalElement("enquiryModal");
}

function renderTabContent(tab) {
  const contentBody = document.getElementById("modalDynamicContent");
  currentPamphletList = tab.images || [];
  const galleryHtml = createPamphletGallery(currentPamphletList);
  if (contentBody) contentBody.innerHTML = tab.content + galleryHtml;
}

function showModalElement(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
    modal.style.display = "flex";
    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";
  }
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("enquiryModal");
  if (modal) {
    modal.classList.remove("show");
    modal.style.display = "none";
  }
  document.body.style.overflow = "";
}

function closeModalOnOverlay(e) {
  if (e.target.id === "enquiryModal") closeModal();
}

/* =========================================================
   LIGHTBOX ZOOM & DRAG ENGINE (MOBILE & DESKTOP)
========================================================= */

function getLightboxElements() {
  const lightbox = document.getElementById("pamphletLightbox") || document.getElementById("imageModal") || document.querySelector(".pamphlet-lightbox") || document.querySelector(".pamphlet-modal");
  const img = document.getElementById("lightboxImage") || document.getElementById("imgModalSrc") || document.querySelector(".pamphlet-modal-content");
  return { lightbox, img };
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

function applyZoomTransform() {
  const { img } = getLightboxElements();
  if (img) {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoomScale})`;
    img.style.transition = isDragging ? "none" : "transform 0.2s ease-in-out";
  }
}

function resetZoom() {
  currentZoomScale = 1;
  translateX = 0;
  translateY = 0;
  applyZoomTransform();
}

function zoomIn() {
  currentZoomScale = Math.min(currentZoomScale + 0.4, 3.5);
  applyZoomTransform();
}

function zoomOut() {
  currentZoomScale = Math.max(currentZoomScale - 0.4, 0.8);
  if (currentZoomScale <= 1) {
    translateX = 0;
    translateY = 0;
  }
  applyZoomTransform();
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
   EVENT LISTENERS (RED TABS, DRAG/TOUCH PANNING & MOUSE WHEEL)
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const { lightbox, img } = getLightboxElements();

  // 1. Mouse Wheel Zoom
  if (lightbox) {
    lightbox.addEventListener("wheel", function (e) {
      if (lightbox.style.display === "flex" || lightbox.classList.contains("show")) {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }
    }, { passive: false });
  }

  // 2. Click / Tap Image to Toggle Zoom (1x <-> 2x)
  if (img) {
    img.addEventListener("click", function (e) {
      if (isDragging) return;
      e.stopPropagation();
      if (currentZoomScale === 1) {
        currentZoomScale = 2;
      } else {
        currentZoomScale = 1;
        translateX = 0;
        translateY = 0;
      }
      applyZoomTransform();
    });

    // 3. Touch / Drag Panning Engine (Hand tool dragging across full pamphlet)
    const startDrag = (e) => {
      if (currentZoomScale <= 1) return;
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX - translateX;
      startY = clientY - translateY;
    };

    const doDrag = (e) => {
      if (!isDragging || currentZoomScale <= 1) return;
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      translateX = clientX - startX;
      translateY = clientY - startY;
      applyZoomTransform();
    };

    const stopDrag = () => {
      isDragging = false;
    };

    img.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    img.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", doDrag, { passive: false });
    window.addEventListener("touchend", stopDrag);
  }

  // 4. Delegated Click Handler for Red Buttons & Navigation Controls
  document.addEventListener("click", function(e) {
    const target = e.target.closest("button, .pamphlet-close, .lightbox-close");
    if (!target) return;

    if (target.matches(".zoom-in, #zoomInBtn, [onclick*='zoomIn']")) {
      e.stopPropagation();
      zoomIn();
    } else if (target.matches(".zoom-out, #zoomOutBtn, [onclick*='zoomOut']")) {
      e.stopPropagation();
      zoomOut();
    } else if (target.matches(".pamphlet-prev, .prev-btn, #prevBtn, [onclick*='prevPamphlet']")) {
      e.stopPropagation();
      prevPamphlet(e);
    } else if (target.matches(".pamphlet-next, .next-btn, #nextBtn, [onclick*='nextPamphlet']")) {
      e.stopPropagation();
      nextPamphlet(e);
    } else if (target.matches(".pamphlet-close, .close-btn, #closeBtn, .lightbox-close, [onclick*='closePamphletZoom']")) {
      e.stopPropagation();
      closePamphletZoom(e);
    }
  });
});

/* Keyboard Navigation */
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
