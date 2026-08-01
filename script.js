/* =========================================================
   COGO TOURS - INTERACTIVE MULTI-TAB SERVICE ENGINE & PAMPHLETS
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

// Category Data — Update image filenames to match what you upload to GitHub!
const categoryData = {
  chennai: {
    title: "🏛️ Tour Chennai Packages",
    desc: "Explore top tourist spots around Chennai and coastal Tamil Nadu.",
    tabs: [
      {
        name: "City Sightseeing",
        pamphlets: [
          "chennai-1.jpg", 
          "chennai-2.jpg"
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
  domestic: {
    title: "🏔️ Tour Domestic Packages",
    desc: "Handcrafted Indian holiday itineraries.",
    tabs: [
      {
        name: "Kerala & Hill Stations",
        pamphlets: [
          "domestic-flyer.png",
          "domestic-flyer2.png"
        ],
        content: `<div class="tariff-box"><strong>God's Own Country:</strong> Munnar Tea Gardens, Alleppey Houseboat, & Ooty Lake.</div>`
      }
    ]
  }
};

const defaultCategoryInfo = {
  cabservices: { 
    title: "🚘 Cab Services", 
    desc: "Long distance and corporate fleet.", 
    content: "Round-trip outstation cabs, one-way drops, and monthly rentals.",
    pamphlets: ["cabs-flyer.jpg"]
  }
};

let activeServiceTitle = "General Journey Enquiry";
let currentPamphletList = [];
let currentPamphletIndex = 0;
let currentZoomScale = 1;

/* =========================================================
   MAIN MODAL CONTROLS (OPEN / CLOSE / SUBMIT)
========================================================= */

function openCategoryModal(catKey) {
  const data = categoryData[catKey];
  const subTabContainer = document.getElementById("modalSubTabs");
  const contentBody = document.getElementById("modalDynamicContent");

  if (!subTabContainer || !contentBody) return;
  subTabContainer.innerHTML = "";

  if (data && data.tabs) {
    activeServiceTitle = data.title;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalDescription").textContent = data.desc;

    data.tabs.forEach((tab, index) => {
      const btn = document.createElement("button");
      const colorClass = `tab-color-${index % 4}`;
      btn.className = `sub-tab-btn ${colorClass} ${index === 0 ? 'active' : ''}`;
      btn.textContent = tab.name;
      btn.onclick = () => {
        document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTabContent(tab);
      };
      subTabContainer.appendChild(btn);
    });

    renderTabContent(data.tabs[0]);

  } else {
    const fallback = defaultCategoryInfo[catKey] || { title: "Enquiry", desc: "", content: "Please contact us for more information." };
    activeServiceTitle = fallback.title;
    document.getElementById("modalTitle").textContent = fallback.title;
    document.getElementById("modalDescription").textContent = fallback.desc;
    
    currentPamphletList = fallback.pamphlets || [];
    const galleryHtml = createPamphletGallery(currentPamphletList);
    contentBody.innerHTML = `<div class="tariff-box"><p>${fallback.content}</p></div>` + galleryHtml;
  }

  const modal = document.getElementById("enquiryModal");
  if (modal) {
    modal.classList.add("show");
    modal.style.display = "flex"; // Fallback inline toggle
  }
  document.body.style.overflow = "hidden";
}

function openEnquiryForm(title) {
  activeServiceTitle = title;
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = "Fill in your details below to request a personalized itinerary or quote.";

  const subTabs = document.getElementById("modalSubTabs");
  const contentBody = document.getElementById("modalDynamicContent");
  if (subTabs) subTabs.innerHTML = "";
  if (contentBody) contentBody.innerHTML = "";

  const modal = document.getElementById("enquiryModal");
  if (modal) {
    modal.classList.add("show");
    modal.style.display = "flex";
  }
  document.body.style.overflow = "hidden";
}

// Function triggered by the top-right X button
function closeModal() {
  const modal = document.getElementById("enquiryModal");
  if (modal) {
    modal.classList.remove("show");
    modal.style.display = "none";
  }
  document.body.style.overflow = "";
}

function renderTabContent(tab) {
  const contentBody = document.getElementById("modalDynamicContent");
  currentPamphletList = tab.pamphlets || [];
  const galleryHtml = createPamphletGallery(currentPamphletList);
  contentBody.innerHTML = tab.content + galleryHtml;
}

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
  }
}

function closePamphletZoom(e) {
  if (e) e.stopPropagation();
  const lightbox = document.getElementById("pamphletLightbox");
  if (lightbox) {
    lightbox.classList.remove("show");
    lightbox.style.display = "none";
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
   KEYBOARD ESC & TOUCH/SWIPE HANDLERS
========================================================= */

// Pressing ESC step-by-step closes Zoom Lightbox first, then Modal
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    const lightbox = document.getElementById("pamphletLightbox");
    const enquiryModal = document.getElementById("enquiryModal");

    if (lightbox && (lightbox.classList.contains("show") || lightbox.style.display === "flex")) {
      closePamphletZoom();
    } else if (enquiryModal && (enquiryModal.classList.contains("show") || enquiryModal.style.display === "flex")) {
      closeModal();
    }
  }
});

// Mobile Swipe gesture handling
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", function(e) {
  const lightbox = document.getElementById("pamphletLightbox");
  if (lightbox && lightbox.classList.contains("show")) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }
}, { passive: true });

document.addEventListener("touchend", function(e) {
  const lightbox = document.getElementById("pamphletLightbox");
  if (!lightbox || !lightbox.classList.contains("show")) return;

  const touchEndX = e.changedTouches[0].screenX;
  const touchEndY = e.changedTouches[0].screenY;

  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  // Swipe Up to Close
  if (diffY < -80 && Math.abs(diffY) > Math.abs(diffX)) {
    closePamphletZoom();
    return;
  }

  // Swipe Left / Right to cycle flyers
  if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX < 0) {
      navigateLightbox(1);
    } else {
      navigateLightbox(-1);
    }
  }
}, { passive: true });
