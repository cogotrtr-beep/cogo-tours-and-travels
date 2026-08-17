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

// Carousel Timers
let domesticTimer = null;
let intlTimer = null;

/* =========================================================
   1. DATA ENGINES & CONSTANTS
========================================================= */

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
              🚍 Luxury Cabs, Urbania, Tempo Travellers & Buses are available for long-distance South India tours.
            </p>
          </div>
        `
      }
    ]
  }
};

const defaultCategoryInfo = {
  tickets: { title: "🎟️ Ticket Booking", desc: "Flight, Train & Bus Reservations.", content: "Instant ticketing assistance." },
  journey: { title: "✈️ Plan Your Journey", desc: "Tailor-made itineraries for your next dream vacation.", content: "Share your travel dates and requirements for custom quotes." },
  ticket: { title: "🎟️ Ticket Booking", desc: "Flight, Train & Bus Reservations.", content: "Instant ticketing assistance." },
  visa: { title: "🛂 Visa Assistance", desc: "Documentation & Processing Support.", content: "End-to-end visa guidance for all international destinations." },
  "north-india": { title: "🏔️ Tour North India", desc: "Golden Triangle, Kashmir, Himachal & Rajasthan.", content: "Customized holiday packages across North India." },
  "north-east": { title: "🏞️ Tour North East", desc: "Gangtok, Darjeeling, Assam & Meghalaya.", content: "Scenic tour packages across the North Eastern states." },
  "rest-of-india": { title: "🧭 Tour Rest of India", desc: "Goa, Gujarat, Odisha & Pan-India Destinations.", content: "Unique tour plans for all Indian states and union territories." },
  international: { title: "✈️ Tour International", desc: "Dubai, Singapore, Thailand, Bali & Europe.", content: "Comprehensive international vacation packages with flight and visa support." },
  corporate: { title: "🏢 Corporate Tour", desc: "MICE, Team Outings & Business Conferences.", content: "Custom corporate packages and transport arrangements." },
  students: { title: "🎓 School & College Tour", desc: "Educational Trips & Student Excursions.", content: "Safe and budget-friendly tours for educational institutions." },
  adventure: { title: "🏕️ Adventure Tour", desc: "Trekking, Camping & Thrill Activities.", content: "Action-packed itineraries for outdoor enthusiasts." },
  honeymoon: { title: "💖 Honeymoon Tour", desc: "Romantic Getaways & Couples' Retreats.", content: "Special honeymoon arrangements with luxury stays and private cabs." }
};

/* =========================================================
   2. DOM HELPER FUNCTIONS & GALLERIES
========================================================= */

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
    const titleElem = document.getElementById("modalTitle");
    const descElem = document.getElementById("modalDescription");
    
    if (titleElem) titleElem.textContent = fallback.title;
    if (descElem) descElem.textContent = fallback.desc;

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
   3. FORM SUBMISSION ENGINE (WHATSAPP & EMAIL)
========================================================= */

function submitEnquiry(type) {
  const name = document.getElementById("userName") ? document.getElementById("userName").value.trim() : "";
  const phone = document.getElementById("userPhone") ? document.getElementById("userPhone").value.trim() : "";
  const query = document.getElementById("userQuery") ? document.getElementById("userQuery").value.trim() : "";

  if (!name || !phone) {
    alert("Please enter your name and contact phone number to continue.");
    return;
  }

  const messageText = `*New Travel Enquiry - Cogo Tours*\n` +
                      `-------------------------------\n` +
                      `*Service/Package:* ${activeServiceTitle}\n` +
                      `*Customer Name:* ${name}\n` +
                      `*Contact Number:* ${phone}\n` +
                      `*Notes/Preferences:* ${query || 'N/A'}`;

  if (type === 'whatsapp') {
    const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
  } else if (type === 'email') {
    const mailtoUrl = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent("Enquiry: " + activeServiceTitle)}&body=${encodeURIComponent(messageText)}`;
    window.location.href = mailtoUrl;
  }
}

/* =========================================================
   4. LIGHTBOX ZOOM & DRAG ENGINE
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

function openPamphletList(imageList, index) {
  currentPamphletList = imageList;
  openPamphletZoom(index);
}

/* =========================================================
   5. ONGOING TOURS CAROUSEL & SLIDERS
========================================================= */

function startDualSliders() {
  const domTrack = document.getElementById('domesticTrack');
  const intlTrack = document.getElementById('intlTrack');

  if (domTrack && !domesticTimer) {
    domesticTimer = setInterval(() => autoScroll(domTrack), 3000);
  }
  if (intlTrack && !intlTimer) {
    intlTimer = setInterval(() => autoScroll(intlTrack), 3000);
  }
}

function stopDualSliders() {
  clearInterval(domesticTimer);
  clearInterval(intlTimer);
  domesticTimer = null;
  intlTimer = null;
}

function autoScroll(trackElement) {
  const card = trackElement.querySelector('.slide-card');
  if (!card) return;
  
  const cardWidth = card.offsetWidth + 12;
  if (trackElement.scrollLeft + trackElement.clientWidth >= trackElement.scrollWidth - 10) {
    trackElement.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    trackElement.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
}

function moveSlide(trackId, direction) {
  const track = document.getElementById(trackId);
  if (track) {
    const card = track.querySelector('.slide-card');
    const cardWidth = card.offsetWidth + 12;
    track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }
}

/* =========================================================
   6. GLOBAL INITIALIZATION & EVENT LISTENERS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const { lightbox, img } = getLightboxElements();

  // Initialize Sliders
  startDualSliders();

  // Pause Sliders on Hover
  ['domesticSliderWrapper', 'intlSliderWrapper'].forEach(id => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.addEventListener('mouseenter', stopDualSliders);
      elem.addEventListener('mouseleave', startDualSliders);
    }
  });

  // Lightbox Mouse Wheel Zoom
  if (lightbox) {
    lightbox.addEventListener("wheel", function (e) {
      if (lightbox.style.display === "flex" || lightbox.classList.contains("show")) {
        e.preventDefault();
        if (e.deltaY < 0) zoomIn();
        else zoomOut();
      }
    }, { passive: false });
  }

  // Lightbox Click & Drag Controls
  if (img) {
    img.addEventListener("click", function (e) {
      if (isDragging) return;
      e.stopPropagation();
      currentZoomScale = (currentZoomScale === 1) ? 2 : 1;
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

  // Control Buttons Mapping
  document.querySelectorAll(".pamphlet-prev, .prev-btn, #prevBtn").forEach(btn => btn.onclick = prevPamphlet);
  document.querySelectorAll(".pamphlet-next, .next-btn, #nextBtn").forEach(btn => btn.onclick = nextPamphlet);
  document.querySelectorAll(".zoom-in, #zoomInBtn").forEach(btn => btn.onclick = zoomIn);
  document.querySelectorAll(".zoom-out, #zoomOutBtn").forEach(btn => btn.onclick = zoomOut);
  document.querySelectorAll(".pamphlet-close, .close-btn, #closeBtn").forEach(btn => btn.onclick = closePamphletZoom);
});

// Unified Keyboard Shortcut Handler
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
