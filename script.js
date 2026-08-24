// Force page to scroll to top on mobile load/refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

window.addEventListener('load', function() {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});

/* =========================================================
   COGO TOURS & CABS - DYNAMIC ENGINE & SIGHTSEEING TABS
========================================================= */

let activeServiceTitle = "General Journey Enquiry";
let currentPamphletList = [];
let currentPamphletIndex = 0;

let currentZoomScale = 1;
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

function createPamphletGallery(images) {
  if (!images || images.length === 0) return '';
  
  const cardsHtml = images.map((imgUrl, idx) => `
    <div class="pamphlet-card" onclick="openPamphletZoom(${idx})">
      <img src="${imgUrl}" alt="Preview ${idx + 1}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop';" loading="lazy">
    </div>
  `).join('');

  return `
    <div class="pamphlet-swiper">
      ${cardsHtml}
    </div>
    <p style="text-align: center; font-size: 13px; color: #94a3b8; margin-top: 6px; margin-bottom: 12px;">
      👉 Tap image to zoom | Swipe for more previews
    </p>
  `;
}

const categoryData = {
  cabs: {
    title: "🚖 Cab Booking & Cogo Cabs",
    desc: "Transparent tariffs for local hourly rides, full-day packages & outstation trips.",
    tabs: [
      {
        name: "Local Hourly Rates",
        images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 18px;">📍 City Local Packages</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span>Sedan (50 km)</span> <strong>₹1,400</strong></li>
              <li class="bulletin-item"><span>Innova (50 km)</span> <strong>₹2,000</strong></li>
              <li class="bulletin-item"><span>Innova Crysta (10 Hrs / 100 km)</span> <strong>₹4,600</strong></li>
            </ul>
          </div>
        `
      },
      {
        name: "One Day Pack (250 km)",
        images: ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 18px;">🛣️ One Day Outstation Pack (250 km)</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span>Sedan One Day Pack</span> <strong>₹4,500</strong></li>
              <li class="bulletin-item"><span>Innova One Day Pack</span> <strong>₹6,000</strong></li>
              <li class="bulletin-item"><span>Innova Crysta One Day Pack</span> <strong>₹6,750</strong></li>
            </ul>
          </div>
        `
      }
    ]
  },
  chennai: {
    title: "🏛️ Tour Chennai Packages",
    desc: "Explore heritage, temple circuits, coastal ECR, and entertainment hubs.",
    tabs: [
      {
        name: "Vehicle Tariffs",
        images: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 18px;">🚗 Chennai Tour Tariffs</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span>Sedan (50 km)</span> <strong>₹1,400</strong></li>
              <li class="bulletin-item"><span>Innova (50 km)</span> <strong>₹2,000</strong></li>
              <li class="bulletin-item"><span>Innova Crysta (100 km)</span> <strong>₹4,600</strong></li>
            </ul>
          </div>
        `
      }
    ]
  },
  pilgrim: {
    title: "🛕 Pilgrimage Circuits",
    desc: "Sacred temple tours, heritage shrines, and spiritual one-day packages.",
    tabs: [
      {
        name: "Heritage Shrines",
        images: ["https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 18px;">🛕 Popular One-Day Divine Packages</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span>Mahabalipuram & Thirukazhukundram</span></li>
              <li class="bulletin-item"><span>Kanchipuram & Thiruthani Circuit</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  "south-india": {
    title: "🌴 South India Escapes",
    desc: "Misty hill stations, pristine beaches, spiritual temples & scenic escapes.",
    tabs: [
      {
        name: "Hill Stations",
        images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 18px;">🏔️ Popular Getaways</h4>
            <p>• Kodaikanal, Ooty, Coonoor, Munnar, Wayanad & Coorg Escapes.</p>
          </div>
        `
      }
    ]
  }
};

const defaultCategoryInfo = {
  journey: { title: "✈️ Plan Your Journey", desc: "Tailor-made itineraries for your next dream vacation.", content: "Share your travel dates and preferences for custom quotes." },
  corporate: { title: "🏢 Corporate & School Tours", desc: "MICE, Team Outings & Educational Excursions.", content: "Custom group packages and transport arrangements." }
};

/* Modal Functions */
function openCategoryModal(catKey) {
  const data = categoryData[catKey];
  const subTabContainer = document.getElementById("modalSubTabs");
  if (subTabContainer) subTabContainer.innerHTML = "";

  if (data && data.tabs) {
    activeServiceTitle = data.title;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalDescription").textContent = data.desc;

    data.tabs.forEach((tab, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `sub-tab-btn ${index === 0 ? 'active' : ''}`;
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
    const fallback = defaultCategoryInfo[catKey] || { title: "Travel Enquiry", desc: "Custom Travel Package", content: "Contact us directly for custom pricing." };
    activeServiceTitle = fallback.title;
    document.getElementById("modalTitle").textContent = fallback.title;
    document.getElementById("modalDescription").textContent = fallback.desc;
    renderTabContent({ content: `<div class="tariff-box"><p>${fallback.content}</p></div>`, images: [] });
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
    modal.style.display = "flex";
  }
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("enquiryModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "";
}

function closeModalOnOverlay(e) {
  if (e.target.id === "enquiryModal") closeModal();
}

/* Submission Handlers */
function submitEnquiry(type) {
  const name = document.getElementById("userName")?.value.trim();
  const phone = document.getElementById("userPhone")?.value.trim();
  const query = document.getElementById("userQuery")?.value.trim();

  if (!name || !phone) {
    alert("Please enter your name and phone number.");
    return;
  }

  const msg = `*New Travel Enquiry - Cogo Tours*\nService: ${activeServiceTitle}\nName: ${name}\nPhone: ${phone}\nNotes: ${query || 'N/A'}`;

  if (type === 'whatsapp') {
    window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, '_blank');
  } else {
    window.location.href = `mailto:cogotrtr@gmail.com?subject=${encodeURIComponent("Enquiry: " + activeServiceTitle)}&body=${encodeURIComponent(msg)}`;
  }
}

/* Lightbox Functions */
function openPamphletList(imageList, index) {
  if (!imageList || imageList.length === 0) return;
  currentPamphletList = imageList;
  openPamphletZoom(index);
}

function openPamphletZoom(index) {
  currentPamphletIndex = index;
  const lightbox = document.getElementById("pamphletLightbox");
  const img = document.getElementById("lightboxImage");

  if (lightbox && img) {
    img.src = currentPamphletList[currentPamphletIndex];
    resetZoom();
    lightbox.style.display = "flex";
  }
}

function closePamphletZoom(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const lightbox = document.getElementById("pamphletLightbox");
  if (lightbox) lightbox.style.display = "none";
}

function resetZoom() {
  currentZoomScale = 1;
  translateX = 0;
  translateY = 0;
  applyZoomTransform();
}

function applyZoomTransform() {
  const img = document.getElementById("lightboxImage");
  if (img) {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoomScale})`;
  }
}

function zoomIn() {
  currentZoomScale = Math.min(currentZoomScale + 0.5, 3.5);
  applyZoomTransform();
}

function zoomOut() {
  currentZoomScale = Math.max(currentZoomScale - 0.5, 1);
  applyZoomTransform();
}

function prevPamphlet(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  if (currentPamphletList.length <= 1) return;
  currentPamphletIndex = (currentPamphletIndex - 1 + currentPamphletList.length) % currentPamphletList.length;
  openPamphletZoom(currentPamphletIndex);
}

function nextPamphlet(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  if (currentPamphletList.length <= 1) return;
  currentPamphletIndex = (currentPamphletIndex + 1) % currentPamphletList.length;
  openPamphletZoom(currentPamphletIndex);
}

function scrollTrack(trackId, direction) {
  const track = document.getElementById(trackId);
  if (track) {
    track.scrollBy({ left: direction * 320, behavior: 'smooth' });
  }
}

/* Form Interactivity & WhatsApp Triggers */
const visaCountries = [
  { name: "United States (USA)", flag: "🇺🇸" },
  { name: "United Kingdom (UK)", flag: "🇬🇧" },
  { name: "Schengen / Europe", flag: "🇪🇺" },
  { name: "United Arab Emirates (Dubai)", flag: "🇦🇪" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Thailand", flag: "🇹🇭" }
];

function populateVisaCountries(list = visaCountries) {
  const container = document.getElementById("visaDropdownList");
  if (!container) return;
  container.innerHTML = list.map(c => `
    <div class="visa-option" onclick="selectVisaCountry('${c.flag} ${c.name}')">
      ${c.flag} ${c.name}
    </div>
  `).join('');
}

function showVisaDropdown() {
  populateVisaCountries();
  document.getElementById("visaDropdownList")?.classList.add("show");
}

function filterVisaCountries() {
  const q = document.getElementById("visaCountryInput").value.toLowerCase();
  populateVisaCountries(visaCountries.filter(c => c.name.toLowerCase().includes(q)));
}

function selectVisaCountry(val) {
  const input = document.getElementById("visaCountryInput");
  if (input) input.value = val;
  document.getElementById("visaDropdownList")?.classList.remove("show");
}

function sendCabWhatsApp() {
  const pickup = document.getElementById("cabPickupInput")?.value.trim();
  const drop = document.getElementById("cabDropInput")?.value.trim();
  if (!pickup || !drop) {
    alert("Please enter pickup and destination locations.");
    return;
  }
  const date = document.getElementById("cabDateInput")?.value;
  const time = document.getElementById("cabTimeInput")?.value;
  const vehicle = document.getElementById("cabVehicleSelect")?.value;
  const pack = document.getElementById("cabPackSelect")?.value;

  const msg = `*Cab Enquiry - Cogo Tours*\nPickup: ${pickup}\nDrop: ${drop}\nDate: ${date || 'N/A'}\nTime: ${time || 'N/A'}\nVehicle: ${vehicle}\nPack: ${pack}`;
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, '_blank');
}

function sendVisaWhatsApp() {
  const country = document.getElementById("visaCountryInput")?.value.trim();
  if (!country) {
    alert("Please select or type a destination country.");
    return;
  }
  const from = document.getElementById("visaFromDate")?.value;
  const to = document.getElementById("visaToDate")?.value;
  const pax = document.getElementById("visaPaxSelect")?.value;
  const remarks = document.getElementById("visaRemarksInput")?.value.trim();

  const msg = `*Visa Enquiry - Cogo Tours*\nCountry: ${country}\nTravel Dates: ${from || 'N/A'} to ${to || 'N/A'}\nApplicants: ${pax}\nNotes: ${remarks || 'N/A'}`;
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, '_blank');
}

function toggleReturnDate(isRoundTrip) {
  const el = document.getElementById("flightReturnDate");
  if (el) el.style.display = isRoundTrip ? "block" : "none";
}

function sendFlightWhatsApp() {
  const scope = document.querySelector('input[name="flightScope"]:checked')?.value;
  const type = document.querySelector('input[name="flightType"]:checked')?.value;
  const from = document.getElementById("flightFromInput")?.value.trim();
  const to = document.getElementById("flightToInput")?.value.trim();

  if (!from || !to) {
    alert("Please enter departure and destination cities.");
    return;
  }
  const msg = `*Flight Enquiry - Cogo Tours*\nType: ${scope} (${type})\nFrom: ${from}\nTo: ${to}\nDepart: ${document.getElementById("flightDepartDate")?.value || 'N/A'}`;
  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, '_blank');
}

document.addEventListener("click", function(e) {
  if (!e.target.closest(".custom-select-wrapper")) {
    document.querySelectorAll(".custom-dropdown-list").forEach(el => el.classList.remove("show"));
  }
});
