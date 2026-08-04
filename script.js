/* =========================================================
   1. GLOBAL DATA & STATE MANAGEMENT
========================================================= */
let currentCategoryKey = '';
let currentSubTabIndex = 0;
let currentPamphletList = [];
let currentPamphletIndex = 0;

let currentZoomScale = 1;
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

/* Category Data Registry */
const categoryData = {
  chennai: {
    title: "Chennai Local Sightseeing",
    desc: "Explore historic temples, vibrant beaches, and cultural heritage across Chennai.",
    tabs: [
      {
        name: "Full Day City Tour",
        bulletin: [
          { label: "Kapaleeshwarar Temple & Santhome Church", price: "Included" },
          { label: "Marina Beach & Fort St. George", price: "Included" },
          { label: "Government Museum & Guindy Park", price: "Included" }
        ],
        pamphlets: ["chennai-tour-1.jpg", "chennai-tour-2.jpg"]
      },
      {
        name: "Half Day Temple Tour",
        bulletin: [
          { label: "Parthasarathy Temple & Marundeeswarar Temple", price: "Included" },
          { label: "AC Sedan / SUV Pickup & Drop", price: "Flexible" }
        ],
        pamphlets: ["chennai-temple-1.jpg"]
      }
    ]
  },
  pilgrim: {
    title: "Tour Pilgrim Circuits",
    desc: "Sacred temple tours, heritage shrines, and spiritual one-day packages.",
    tabs: [
      {
        name: "Heritage & Sakthi Circuits",
        bulletin: [
          { label: "Mahabalipuram & Thirukazhukundram", price: "One-Day" },
          { label: "Kanchipuram & Thirukazhukundram", price: "One-Day" },
          { label: "Periyapalayam & Thiruthani", price: "One-Day" },
          { label: "Kanchipuram & Thiruthani", price: "One-Day" },
          { label: "Putlur, Thiruvallur, Sriperumbudur, Thirumazhisai & Thiruverkadu", price: "One-Day" }
        ],
        pamphlets: ["pilgrim-circuit-1.jpg", "pilgrim-circuit-2.jpg"]
      }
    ]
  },
  international: {
    title: "International Tour Packages",
    desc: "Seamless overseas holiday packages with flight, visa, and hotel guidance.",
    tabs: [
      {
        name: "Popular Destinations",
        bulletin: [
          { label: "Thailand & Malaysia Highlights", price: "5 Days / 4 Nights" },
          { label: "Dubai & Abu Dhabi Desert Safari", price: "6 Days / 5 Nights" },
          { label: "Singapore & Bali Gateway", price: "7 Days / 6 Nights" }
        ],
        pamphlets: ["intl-pamphlet-1.jpg"]
      }
    ]
  },
  cabs: {
    title: "Cab Booking & Outstation Tariff",
    desc: "Reliable airport transfers, local hourly rentals, and outstation taxi services.",
    tabs: [
      {
        name: "Local Tariff (8 Hours / 80 Kms)",
        bulletin: [
          { label: "Sedan (Dzire / Etios)", price: "₹2,200" },
          { label: "SUV (Ertiga / XL6)", price: "₹3,200" },
          { label: "Premium SUV (Innova Crysta)", price: "₹4,500" },
          { label: "Tempo Traveller (12 Seater)", price: "₹5,500" }
        ],
        pamphlets: ["cab-tariff-1.jpg"]
      },
      {
        name: "Outstation (Per Km Rate)",
        bulletin: [
          { label: "Sedan Outstation", price: "₹14 / Km" },
          { label: "Ertiga SUV Outstation", price: "₹18 / Km" },
          { label: "Innova Crysta", price: "₹24 / Km" }
        ],
        pamphlets: ["cab-tariff-2.jpg"]
      }
    ]
  }
};

/* =========================================================
   2. MODAL & TAB ENGINE
========================================================= */
function openHubModal(key) {
  currentCategoryKey = key;
  currentSubTabIndex = 0;
  
  const modalOverlay = document.getElementById("hubModal");
  if (!modalOverlay) return;

  const data = categoryData[key] || {
    title: "Tour Package Details",
    desc: "Customized travel solutions designed for your trip.",
    tabs: [
      {
        name: "Overview",
        bulletin: [{ label: "Custom Travel Itinerary Available", price: "Inquire Now" }],
        pamphlets: []
      }
    ]
  };

  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalDesc").textContent = data.desc;

  renderSubTabs(data.tabs);
  renderModalBody(data.tabs[0]);

  modalOverlay.classList.add("show");
  modalOverlay.style.display = "flex";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.pointerEvents = "auto";
}

function closeHubModal() {
  const modalOverlay = document.getElementById("hubModal");
  if (modalOverlay) {
    modalOverlay.classList.remove("show");
    modalOverlay.style.display = "none";
    modalOverlay.style.opacity = "0";
    modalOverlay.style.pointerEvents = "none";
  }
}

function renderSubTabs(tabs) {
  const container = document.getElementById("subTabContainer");
  if (!container) return;

  container.innerHTML = "";
  if (!tabs || tabs.length <= 1) {
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  tabs.forEach((tab, index) => {
    const btn = document.createElement("button");
    btn.className = `sub-tab-btn tab-color-${index % 4} ${index === 0 ? "active" : ""}`;
    btn.textContent = tab.name;
    btn.onclick = () => switchSubTab(index);
    container.appendChild(btn);
  });
}

function switchSubTab(index) {
  currentSubTabIndex = index;
  const data = categoryData[currentCategoryKey];
  if (!data || !data.tabs[index]) return;

  const buttons = document.querySelectorAll(".sub-tab-btn");
  buttons.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === index);
  });

  renderModalBody(data.tabs[index]);
}

function renderModalBody(tabData) {
  const wrapper = document.getElementById("modalBodyWrapper");
  if (!wrapper || !tabData) return;

  let bulletinHTML = "";
  if (tabData.bulletin && tabData.bulletin.length > 0) {
    bulletinHTML = `
      <div class="tariff-box">
        <h4>${tabData.name}</h4>
        <ul class="bulletin-list">
          ${tabData.bulletin.map(item => `
            <li class="bulletin-item">
              <span class="bullet-label">${item.label}</span>
              <span class="bullet-price">${item.price}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  let pamphletHTML = "";
  if (tabData.pamphlets && tabData.pamphlets.length > 0) {
    currentPamphletList = tabData.pamphlets;
    pamphletHTML = `
      <div class="pamphlet-swiper">
        ${tabData.pamphlets.map((imgSrc, idx) => `
          <div class="pamphlet-card" onclick="openPamphletZoom(${idx})">
            <img src="${imgSrc}" alt="Tour Pamphlet ${idx + 1}" loading="lazy" />
          </div>
        `).join('')}
      </div>
      <p class="text-center" style="font-size:12px; color:#64748b; margin-top:-5px;">
        👉 Tap image to zoom | Swipe for more previews
      </p>
    `;
  }

  wrapper.innerHTML = bulletinHTML + pamphletHTML;
}

/* =========================================================
   3. LIGHTBOX ZOOM & DRAG-TO-PAN NAVIGATION ENGINE
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
  if (currentZoomScale < 3.5) {
    currentZoomScale = Math.min(currentZoomScale + 0.5, 3.5);
    applyZoomTransform();
  }
}

function zoomOut() {
  if (currentZoomScale > 1) {
    currentZoomScale = Math.max(currentZoomScale - 0.5, 1);
    if (currentZoomScale === 1) {
      translateX = 0;
      translateY = 0;
    }
    applyZoomTransform();
  }
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

    // Bind drag handlers dynamically when image opens
    bindDragEvents(img);
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

/* =========================================================
   4. DRAG LISTENERS & EVENT SETUP
========================================================= */
let dragEventsBound = false;

function bindDragEvents(img) {
  if (dragEventsBound || !img) return;
  dragEventsBound = true;

  // Mouse Dragging
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
      isDragging = false;
      applyZoomTransform();
    }
  });

  // Touch Dragging for Mobile
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
