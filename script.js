/* =========================================================
   COGO TOURS - INTERACTIVE ENGINE & PAMPHLETS
========================================================= */

// Helper function to build slidable pamphlet gallery HTML
function createPamphletGallery(images) {
  if (!images || images.length === 0) return '';
  
  const cardsHtml = images.map((imgUrl, idx) => `
    <div class="pamphlet-card" onclick="openPamphletZoom(${idx})">
      <img src="${imgUrl}" alt="Package Pamphlet ${idx + 1}" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x500?text=Cogo+Tours+Flyer';" loading="lazy">
    </div>
  `).join('');

  return `
    <div class="pamphlet-swiper">
      ${cardsHtml}
    </div>
    <p style="text-align: center; font-size: 12px; color: #64748b; margin-top: -5px; margin-bottom: 15px;">
      👉 Tap flyer to expand | Swipe left/right for more
    </p>
  `;
}

// Category Data
const categoryData = {
  chennai: {
    title: "🏛️ Tour Chennai Packages",
    desc: "Explore top tourist spots around Chennai and coastal Tamil Nadu.",
    tabs: [
      {
        name: "City Sightseeing",
        pamphlets: [
          "https://raw.githubusercontent.com/cogo-tours/assets/main/chennai-1.jpg", 
          "https://raw.githubusercontent.com/cogo-tours/assets/main/chennai-2.jpg"
        ],
        content: `
          <div class="tariff-box">
            <h4>📍 Chennai City Day Tour (5 Hours Package)</h4>
            <p><strong>Covered Attractions:</strong> Marina Beach, Kapaleeshwarar Temple, San Thome Basilica, Fort St. George.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan (4 Seater)</span> <span class="bullet-price">₹1,400</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova (7 Seater)</span> <span class="bullet-price">₹2,000</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  "south-india": {
    title: "🌴 Tour South India",
    desc: "Hill stations, backwaters, and heritage trails.",
    tabs: [
      {
        name: "Kerala & Ooty",
        pamphlets: [],
        content: `<div class="tariff-box"><p>Munnar tea gardens, Alleppey houseboats, Kodaikanal misty hills & Ooty escapes.</p></div>`
      }
    ]
  },
  cabs: {
    title: "🚖 Cab Booking & Tariff",
    desc: "Reliable outstation drops and local rentals.",
    tabs: [
      {
        name: "Standard Tariff",
        pamphlets: [],
        content: `<div class="tariff-box"><p>Local 8Hrs/80Kms sedan starting at ₹1,800. Outstation cabs available at competitive per-km rates.</p></div>`
      }
    ]
  }
};

const defaultCategoryInfo = {
  cabservices: { 
    title: "🚘 Cab Services", 
    desc: "Long distance and corporate fleet.", 
    content: "Round-trip outstation cabs, one-way drops, and monthly rentals."
  },
  tickets: {
    title: "🎟️ Ticket Booking",
    desc: "Flight, Train & Bus Reservations.",
    content: "Instant ticketing assistance for all domestic and international transit."
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
   MAIN MODAL FUNCTIONS (OPEN / CLOSE)
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
      title: categoryData[catKey]?.title || "Enquiry", 
      desc: categoryData[catKey]?.desc || "Custom Travel Package", 
      content: "Contact us directly for custom pricing, route maps, and tailored itineraries." 
    };
    
    activeServiceTitle = fallback.title;
    document.getElementById("modalTitle").textContent = fallback.title;
    document.getElementById("modalDescription").textContent = fallback.desc;
    
    currentPamphletList = fallback.pamphlets || [];
    const galleryHtml = createPamphletGallery(currentPamphletList);
    if (contentBody) contentBody.innerHTML = `<div class="tariff-box"><p>${fallback.content}</p></div>` + galleryHtml;
  }

  showModalElement("enquiryModal");
}

function openEnquiryForm(title) {
  activeServiceTitle = title;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = "Fill in your details below to request a personalized quote.";

  const subTabs = document.getElementById("modalSubTabs");
  const contentBody = document.getElementById("modalDynamicContent");
  if (subTabs) subTabs.innerHTML = "";
  if (contentBody) contentBody.innerHTML = "";

  showModalElement("enquiryModal");
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

// Primary Close Function
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

// Overlay Click Dismissal
function closeModalOnOverlay(e) {
  if (e.target.id === "enquiryModal") {
    closeModal();
  }
}

function renderTabContent(tab) {
  const contentBody = document.getElementById("modalDynamicContent");
  currentPamphletList = tab.pamphlets || [];
  const galleryHtml = createPamphletGallery(currentPamphletList);
  if (contentBody) contentBody.innerHTML = tab.content + galleryHtml;
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
   LIGHTBOX ZOOM ENGINE & NAVIGATION
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

function navigateLightbox(direction, e) {
  if (e) e.stopPropagation();
  if (currentPamphletList.length === 0) return;

  currentPamphletIndex += direction;
  if (currentPamphletIndex < 0) currentPamphletIndex = currentPamphletList.length - 1;
  if (currentPamphletIndex >= currentPamphletList.length) currentPamphletIndex = 0;

  const lightboxImg = document.getElementById("lightboxImage");
  if (lightboxImg) {
    lightboxImg.src = currentPamphletList[currentPamphletIndex];
    resetZoom();
  }
}

function changeZoom(amount) {
  const lightboxImg = document.getElementById("lightboxImage");
  if (!lightboxImg) return;

  currentZoomScale += amount;
  if (currentZoomScale < 0.6) currentZoomScale = 0.6;
  if (currentZoomScale > 3.5) currentZoomScale = 3.5;

  lightboxImg.style.transform = `scale(${currentZoomScale})`;
}

function resetZoom() {
  currentZoomScale = 1;
  const lightboxImg = document.getElementById("lightboxImage");
  if (lightboxImg) lightboxImg.style.transform = `scale(1)`;
}

/* =========================================================
   KEYBOARD ESC & TOUCH HANDLERS
========================================================= */

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
