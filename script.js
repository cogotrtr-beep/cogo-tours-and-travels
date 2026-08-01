/* =========================================================
   COGO TOURS & CABS - DYNAMIC ENGINE & SIGHTSEEING TABS
========================================================= */

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
    <p style="text-align: center; font-size: 12px; color: #64748b; margin-top: 4px; margin-bottom: 12px;">
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
          <h4>⚡ Standard Rental Charges</h4>
          <ul class="bulletin-list">
            <li class="bulletin-item"><span class="bullet-label">Sedan (50km)</span> <span class="bullet-price">₹1,400</span></li>
            <li class="bulletin-item"><span class="bullet-label">Innova (50km)</span> <span class="bullet-price">₹2,000</span></li>
            <li class="bulletin-item"><span class="bullet-label">Innova Crysta (10H 100km)</span> <span class="bullet-price">₹4,600</span></li>
            <li class="bulletin-item"><span class="bullet-label">Sedan 250km Pack</span> <span class="bullet-price">₹4,500</span></li>
            <li class="bulletin-item"><span class="bullet-label">Innova 250km Pack</span> <span class="bullet-price">₹6,000</span></li>
            <li class="bulletin-item"><span class="bullet-label">Crysta 250km Pack</span> <span class="bullet-price">₹6,750</span></li>
          </ul>
        </div>
      `
    }
  ]
};

// Category Data Engine
const categoryData = {
  // 1. General Cab Booking
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
            <h4>📍 City Local Packages</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan (50 km)</span> <span class="bullet-price">₹1,400</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova (50 km)</span> <span class="bullet-price">₹2,000</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova Crysta (10 Hrs / 100 km)</span> <span class="bullet-price">₹4,600</span></li>
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
            <h4>🛣️ One Day Outstation / Long Pack (250 km included)</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan One Day Pack</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova One Day Pack</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova Crysta One Day Pack</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
            <p style="margin-top: 10px; font-size: 13px; color: #475569;">
              🚌 <strong>Large Group or Luxury Ride?</strong> Urbania, Tempo Traveller, Buses & Premium Luxury Cars available at ultra-competitive rates!
            </p>
          </div>
        `
      }
    ]
  },

  // 2. Cogo Cabs & Cab Services share the exact same data
  "cogo-cabs": cogoCabsData,
  cabservices: cogoCabsData,

  // 3. Tour Chennai
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
            <h4>🌊 ECR Coastal & Heritage Day Circuit</h4>
            <p><strong>Places Covered:</strong> DakshinaChitra Heritage Museum → Muttukadu Boating → Kovalam Beach → Crocodile Park → Tiger Cave → Mahabalipuram.</p>
            <hr style="border:0; border-top: 1px dashed #cbd5e1; margin: 10px 0;">
            <p><strong>Package Tariff (250km Pack):</strong></p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova Crysta</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
          </div>
        `
      },
      {
        name: "Theme Parks & Fun",
        images: [
          "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4>🎡 Theme Park Day Circuits</h4>
            <p><strong>Option A:</strong> VGP Universal Kingdom + DakshinaChitra + Muttukadu Boating & Kovalam Beach.</p>
            <p style="margin-top: 6px;"><strong>Option B:</strong> MGM Dizzee World + DakshinaChitra + Muttukadu Boating or Kovalam Beach.</p>
            <hr style="border:0; border-top: 1px dashed #cbd5e1; margin: 10px 0;">
            <p><strong>Vehicle Fare (250km Limit):</strong></p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova Crysta</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
          </div>
        `
      }
    ]
  },

  // 4. Tour Pilgrim
  pilgrim: {
    title: "🛕 Tour Pilgrim Circuits",
    desc: "Sacred temple tours, heritage shrines, and spiritual one-day packages.",
    tabs: [
      {
        name: "Heritage & Sakthi Circuits",
        images: [
          "https://images.unsplash.com/photo-1621831815065-9ec3a70868a5?w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1609946782200-d3a39e763137?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4>🛕 Popular One-Day Divine Packages</h4>
            <p>• <strong>Mahabalipuram & Thirukazhukundram</strong></p>
            <p>• <strong>Kanchipuram & Thirukazhukundram</strong></p>
            <p>• <strong>Periyapalayam & Thiruthani</strong></p>
            <p>• <strong>Kanchipuram & Thiruthani</strong></p>
            <hr style="border:0; border-top: 1px dashed #cbd5e1; margin: 10px 0;">
            <p><strong>Fixed Tariff (250km Pack):</strong></p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova Crysta</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
          </div>
        `
      },
      {
        name: "West Chennai Temple Belt",
        images: [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4>🚩 West Chennai Temple Circuit</h4>
            <p><strong>Route:</strong> Putlur → Tiruvallur → Sriperumbudur → Thirumazhisai → Thiruverkadu.</p>
            <hr style="border:0; border-top: 1px dashed #cbd5e1; margin: 10px 0;">
            <p><strong>Fixed Tariff (250km Pack):</strong></p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova Crysta</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
          </div>
        `
      }
    ]
  },

  // 5. Tour South India
  "south-india": {
    title: "🌴 Tour South India",
    desc: "Scenic hill stations, pristine backwaters, and long-distance heritage tours.",
    tabs: [
      {
        name: "Hill Stations & Kerala",
        images: [
          "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4>⛰️ South India Outstation Tours</h4>
            <p>Explore Ooty, Kodaikanal, Yercaud, Munnar tea gardens & Alleppey houseboats with our reliable outstation drivers.</p>
            <hr style="border:0; border-top: 1px dashed #cbd5e1; margin: 10px 0;">
            <p><strong>Standard Outstation Rates:</strong></p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan (250km / day)</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova (250km / day)</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova Crysta (250km / day)</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
            <p style="margin-top: 10px; font-size: 13px; color: #475569;">
              🚌 Urbania, Tempo Traveller, and Buses available for large group tours!
            </p>
          </div>
        `
      }
    ]
  }
};

const defaultCategoryInfo = {
  tickets: {
    title: "🎟️ Ticket Booking",
    desc: "Flight, Train & Bus Reservations.",
    content: "Instant ticketing assistance for domestic and international transit."
  },
  visa: {
    title: "🛂 Visa Assistance",
    desc: "Documentation & Guidance.",
    content: "Comprehensive assistance for tourist, business, and transit visas globally."
  }
};

let activeServiceTitle = "General Journey Enquiry";
let currentPamphletList = [];
let currentPamphletIndex = 0;
let currentZoomScale = 1;

/* =========================================================
   MODAL OPEN / CLOSE HANDLERS
========================================================= */

function openCategoryModal(catKey) {
  const data = categoryData[catKey];
  const subTabContainer = document.getElementById("modalSubTabs");
  const contentBody = document.getElementById("modalDynamicContent");

  if (subTabContainer) subTabContainer.innerHTML = "";

  if (data && data.tabs) {
    activeServiceTitle = data.title;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalDescription").textContent = data.desc;

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
    const fallback = defaultCategoryInfo[catKey] || { 
      title: "Enquiry", 
      desc: "Custom Travel Package", 
      content: "Contact us directly for custom pricing, route maps, and tailored itineraries." 
    };
    
    activeServiceTitle = fallback.title;
    document.getElementById("modalTitle").textContent = fallback.title;
    document.getElementById("modalDescription").textContent = fallback.desc;
    
    currentPamphletList = fallback.images || [];
    const galleryHtml = createPamphletGallery(currentPamphletList);
    if (contentBody) contentBody.innerHTML = `<div class="tariff-box"><p>${fallback.content}</p></div>` + galleryHtml;
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
    modal.style.opacity = "0";
    modal.style.pointerEvents = "none";
  }
  document.body.style.overflow = "";
}

function closeModalOnOverlay(e) {
  if (e.target.id === "enquiryModal") {
    closeModal();
  }
}

/* =========================================================
   FORM SUBMISSION (WHATSAPP / EMAIL)
========================================================= */

function submitEnquiry(type) {
  const nameInput = document.getElementById("userName");
  const phoneInput = document.getElementById("userPhone");
  const queryInput = document.getElementById("userQuery");

  const name = nameInput ? nameInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const query = queryInput ? queryInput.value.trim() : "";

  if (!name || !phone) {
    alert("Please enter your Name and Phone Number.");
    return;
  }

  const messageText = `Hi Cogo Tours & Travels 👋\n\nI want to enquire about: *${activeServiceTitle}*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💬 *Query:* ${query || "Please share details and package quotes."}`;

  if (type === 'whatsapp') {
    window.open(`https://wa.me/919884066830?text=${encodeURIComponent(messageText)}`, '_blank');
  } else if (type === 'email') {
    const subject = encodeURIComponent(`Enquiry: ${activeServiceTitle} - ${name}`);
    const body = encodeURIComponent(messageText);
    window.location.href = `mailto:cogotrtr@gmail.com?subject=${subject}&body=${body}`;
  }

  if (nameInput) nameInput.value = "";
  if (phoneInput) phoneInput.value = "";
  if (queryInput) queryInput.value = "";

  closeModal();
}

/* =========================================================
   LIGHTBOX ZOOM ENGINE
========================================================= */

function openPamphletZoom(index) {
  if (!currentPamphletList || currentPamphletList.length === 0) return;
  
  currentPamphletIndex = index;
  const lightbox = document.getElementById("pamphletLightbox");
  const lightboxImg = document.getElementById("lightboxImage");

  if (lightbox && lightboxImg) {
    lightboxImg.src = currentPamphletList[currentPamphletIndex];
    resetZoom();
    lightbox.classList.add("show");
    lightbox.style.display = "flex";
    lightbox.style.opacity = "1";
    lightbox.style.pointerEvents = "auto";
  }
}

function closePamphletZoom(e) {
  if (e) e.stopPropagation();
  const lightbox = document.getElementById("pamphletLightbox");
  if (lightbox) {
    lightbox.classList.remove("show");
    lightbox.style.display = "none";
    lightbox.style.opacity = "0";
    lightbox.style.pointerEvents = "none";
    resetZoom();
  }
}

function resetZoom() {
  currentZoomScale = 1;
  const lightboxImg = document.getElementById("lightboxImage");
  if (lightboxImg) lightboxImg.style.transform = `scale(1)`;
}

/* ESC KEY HANDLER */
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    const lightbox = document.getElementById("pamphletLightbox");
    const enquiryModal = document.getElementById("enquiryModal");

    if (lightbox && lightbox.style.display === "flex") {
      closePamphletZoom();
    } else if (enquiryModal && enquiryModal.style.display === "flex") {
      closeModal();
    }
  }
});
