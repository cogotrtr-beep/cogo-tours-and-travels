/* =========================================================
   1. GLOBAL STATE & DATA
========================================================= */
let currentGallery = [];
let currentGalleryIndex = 0;
let currentZoomScale = 1;

// Category Data Stores
const categoryData = {
  // Cabs Engine
  cabs: {
    title: "🚖 Cab Booking & Tariffs",
    desc: "Reliable outstation & local cab rentals with professional drivers.",
    tabs: [
      {
        name: "Local Sightseeing",
        images: [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4>Sedan / SUV Rates (Chennai Local)</h4>
            <p><strong>8 Hours / 80 Kms:</strong> Sedan ₹2,000 | Innova ₹3,200</p>
            <p><strong>12 Hours / 120 Kms:</strong> Sedan ₹2,800 | Innova ₹4,200</p>
            <p><em>Extra km / hour charges apply beyond package limit.</em></p>
          </div>
        `
      }
    ]
  },

  // Ticket Booking Engine
  ticket: {
    title: "🎟️ Ticket Bookings & Reservations",
    desc: "Fast flight, train, bus, and outstation transport booking services.",
    tabs: [
      {
        name: "✈️ Flight Booking",
        images: ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4>✈️ Domestic & International Flights</h4>
            <p>Fast ticket bookings, best fare comparisons, seat selection, and hassle-free flight rescheduling assistance.</p>
          </div>
        `
      },
      {
        name: "🚆 Train Bookings",
        images: ["https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4>🚆 Express & Tatkal Reservations</h4>
            <p>Assistance with IRCTC reservations, tourist quota bookings, and confirmed seat options across South India.</p>
          </div>
        `
      },
      {
        name: "🚌 Bus & Outstation Cabs",
        images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4>🚌 AC Sleeper Buses & Private Fleet</h4>
            <p>Book luxury sleeper buses, Tempo Travellers, or private long-distance Cogo Cabs for group travel.</p>
          </div>
        `
      }
    ]
  },

  // Plan Your Journey Engine
  journey: {
    title: "🗺️ Plan Your Journey",
    desc: "Have a travel question or need a custom itinerary? Tell us your plans and our team will guide you!",
    tabs: [
      {
        name: "🧳 Custom Trip Query",
        images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4>🗺️ Tailor-Made Itineraries & Advice</h4>
            <p>Tell us your dream destination, dates, budget, or general queries. We will handle complete routing, hotel suggestions, and travel guidance for your group!</p>
          </div>
        `
      },
      {
        name: "💬 General Travel Assistance",
        images: ["https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4>💬 Free Consultation & Support</h4>
            <p>Need advice on weather, best places to visit, group rates, or documentation? Drop your details below and we will contact you directly!</p>
          </div>
        `
      }
    ]
  },

  // Visa Engine
  visa: {
    title: "🛂 Visa Assistance & Guidance",
    desc: "End-to-end documentation & visa processing.",
    tabs: [
      {
        name: "Tourist & Business Visa",
        images: ["https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4>Fast Track Visa Services</h4>
            <p>Complete documentation review, slot booking, and submission support for Singapore, Malaysia, UAE, Schengen, and USA.</p>
          </div>
        `
      }
    ]
  },

  // Pilgrim Engine
  pilgrim: {
    title: "🛕 Tour Pilgrim Circuits",
    desc: "Spiritual temple tours & divine pilgrimages.",
    tabs: [
      {
        name: "Shirdi Sai Pilgrimage",
        images: [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop"
        ],
        content: `
          <div class="tariff-box">
            <h4>Shirdi Divine Tour (2 Days / 1 Night)</h4>
            <p><strong>Inclusions:</strong> Chennai-Pune Flight Tickets, AC Tempo Traveler, VIP Darshan, 1 Night AC Stay, All Meals.</p>
          </div>
        `
      }
    ]
  },

  // Chennai Local Engine
  chennai: {
    title: "🏛️ Tour Chennai Heritage & Coast",
    desc: "City tours, ECR beach escapes, and heritage temples.",
    tabs: [
      {
        name: "City Sightseeing",
        images: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4>Chennai Local Highlights</h4>
            <p>Cover Marina Beach, Kapaleeshwarar Temple, Fort St. George, and Santhome Church in 1 Day full package.</p>
          </div>
        `
      }
    ]
  }
};

/* =========================================================
   2. CATEGORY MODAL LOGIC
========================================================= */
function openCategoryModal(key) {
  const data = categoryData[key];
  if (!data) return;

  const modal = document.getElementById("enquiryModal");
  const title = document.getElementById("modalTitle");
  const desc = document.getElementById("modalDescription");
  const subTabs = document.getElementById("modalSubTabs");
  const content = document.getElementById("modalDynamicContent");

  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;

  // Build Sub Tabs
  if (subTabs) {
    subTabs.innerHTML = "";
    if (data.tabs && data.tabs.length > 0) {
      data.tabs.forEach((tab, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `sub-tab-btn ${index === 0 ? "active" : ""}`;
        btn.textContent = tab.name;
        btn.onclick = (e) => {
          e.stopPropagation();
          document.querySelectorAll(".sub-tab-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          loadTabContent(tab);
        };
        subTabs.appendChild(btn);
      });
    }
  }

  // Load First Tab
  if (data.tabs && data.tabs.length > 0) {
    loadTabContent(data.tabs[0]);
  }

  if (modal) modal.style.display = "flex";
}

function loadTabContent(tab) {
  const content = document.getElementById("modalDynamicContent");
  if (!content) return;

  // Set gallery array for lightbox
  currentGallery = tab.images || [];

  let html = `<div class="modal-tab-body">${tab.content || ''}</div>`;

  if (currentGallery.length > 0) {
    html += `<div class="pamphlet-swiper" style="display:flex; gap:10px; overflow-x:auto; margin-top:15px; padding-bottom:10px;">`;
    currentGallery.forEach((imgUrl, idx) => {
      html += `
        <img src="${imgUrl}" 
             alt="Preview ${idx + 1}" 
             onclick="openPamphletLightbox(${idx}, event)" 
             style="height:220px; border-radius:8px; cursor:pointer; object-fit:cover; transition:transform 0.2s;"
             onmouseenter="this.style.transform='scale(1.02)'"
             onmouseleave="this.style.transform='scale(1)'"
             draggable="false"
        />
      `;
    });
    html += `</div><p style="font-size:12px; color:#666; text-align:center; margin-top:5px;">👆 Tap image to open full zoom view</p>`;
  }

  content.innerHTML = html;
}

function closeModal() {
  const modal = document.getElementById("enquiryModal");
  if (modal) modal.style.display = "none";
}

function closeModalOnOverlay(e) {
  if (e.target.id === "enquiryModal") {
    closeModal();
  }
}

/* =========================================================
   3. LIGHTBOX & ZOOM ENGINE
========================================================= */
function openPamphletLightbox(index, event) {
  if (event) event.stopPropagation();

  const lightbox = document.getElementById("pamphletLightbox");
  const lightboxImg = document.getElementById("lightboxImage");

  if (!lightbox || !lightboxImg) return;

  currentGalleryIndex = index;
  currentZoomScale = 1;

  lightboxImg.src = currentGallery[currentGalleryIndex] || "";
  lightboxImg.style.transform = `scale(${currentZoomScale})`;

  lightbox.style.display = "flex";
}

function closePamphletZoom(e) {
  if (e) e.stopPropagation();
  const lightbox = document.getElementById("pamphletLightbox");
  if (lightbox) lightbox.style.display = "none";
  resetZoom();
}

function navigateLightbox(direction, event) {
  if (event) event.stopPropagation();
  if (!currentGallery || currentGallery.length === 0) return;

  currentGalleryIndex += direction;

  if (currentGalleryIndex < 0) {
    currentGalleryIndex = currentGallery.length - 1;
  } else if (currentGalleryIndex >= currentGallery.length) {
    currentGalleryIndex = 0;
  }

  const lightboxImg = document.getElementById("lightboxImage");
  if (lightboxImg) {
    lightboxImg.src = currentGallery[currentGalleryIndex];
    resetZoom();
  }
}

function changeZoom(amount) {
  currentZoomScale += amount;
  if (currentZoomScale < 0.5) currentZoomScale = 0.5;
  if (currentZoomScale > 3.0) currentZoomScale = 3.0;

  const lightboxImg = document.getElementById("lightboxImage");
  if (lightboxImg) {
    lightboxImg.style.transform = `scale(${currentZoomScale})`;
    lightboxImg.style.transition = "transform 0.2s ease";
  }
}

function resetZoom() {
  currentZoomScale = 1;
  const lightboxImg = document.getElementById("lightboxImage");
  if (lightboxImg) {
    lightboxImg.style.transform = "scale(1)";
  }
}

/* =========================================================
   4. TOUCH / SWIPE AND DRAG PREVENTIONS
========================================================= */
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("pamphletLightbox");

  if (lightbox) {
    // Touch start for mobile swipe
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    // Touch end for mobile swipe
    lightbox.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  // Prevent standard image drag preview artifact across browser
  document.addEventListener("dragstart", function (e) {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });
});

function handleSwipe() {
  const threshold = 40; // Minimum distance for swipe
  if (touchEndX < touchStartX - threshold) {
    navigateLightbox(1, null); // Swipe Left -> Next
  }
  if (touchEndX > touchStartX + threshold) {
    navigateLightbox(-1, null); // Swipe Right -> Prev
  }
}

/* =========================================================
   5. LEAD FORM SUBMISSION (WhatsApp & Email)
========================================================= */
function submitEnquiry(type) {
  const name = document.getElementById("userName")?.value.trim();
  const phone = document.getElementById("userPhone")?.value.trim();
  const query = document.getElementById("userQuery")?.value.trim();
  const title = document.getElementById("modalTitle")?.textContent || "General Query";

  if (!name || !phone) {
    alert("Please enter your Name and Phone Number.");
    return;
  }

  const message = `*New Travel Enquiry*\n*Category:* ${title}\n*Name:* ${name}\n*Phone:* ${phone}\n*Details:* ${query || 'N/A'}`;

  if (type === "whatsapp") {
    const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  } else if (type === "email") {
    const mailtoUrl = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent("Enquiry: " + title)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  }
}
