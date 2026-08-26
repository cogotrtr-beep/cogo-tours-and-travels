/* =========================================================
   COGO TOURS & CABS - DYNAMIC ENGINE & SIGHTSEEING TABS
========================================================= */

// --- Scroll Restoration ---
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
window.addEventListener('load', () => setTimeout(() => window.scrollTo(0, 0), 10));

// --- Global State ---
let activeServiceTitle = "General Journey Enquiry";
let currentPamphletList = [];
let currentPamphletIndex = 0;

// Drag-to-Pan & Zoom State
let currentZoomScale = 1;
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

// --- Helper Functions ---
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

// --- Data Engines ---
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
        images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop"],
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
        images: ["Images/images/domestic-flyer.png", "Images/images/domestic-flyer2.png"],
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
        images: ["https://images.unsplash.com/photo-1600100397608-f010e423b971?w=600&auto=format&fit=crop"],
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
        images: ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop"],
        content: `
          <div class="tariff-box">
            <h4 style="font-size: 19px;">🚗 Outstation Vehicle Rates (250 km / Day Base)</h4>
            <ul class="bulletin-list">
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Sedan One Day Pack</span> <span class="bullet-price">₹4,500</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova One Day Pack</span> <span class="bullet-price">₹6,000</span></li>
              <li class="bulletin-item" style="font-size: 17px;"><span class="bullet-label">Innova Crysta One Day Pack</span> <span class="bullet-price">₹6,750</span></li>
            </ul>
            <p style="margin-top: 10px; font-weight: bold; color: #1e293b;">
              🚐 Luxury Cabs, Urbania, Tempo Travellers & Buses are available for long-distance South India tours.
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
   FORM SUBMISSION ENGINE (WHATSAPP & EMAIL)
========================================================= */

function submitEnquiry(type) {
  const name = document.getElementById("userName")?.value.trim() || "";
  const phone = document.getElementById("userPhone")?.value.trim() || "";
  const query = document.getElementById("userQuery")?.value.trim() || "";

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
   LIGHTBOX ZOOM & DRAG ENGINE
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

function openPamphletList(imageList, index) {
  if (!imageList || imageList.length === 0) return;
  currentPamphletList = imageList;
  openPamphletZoom(index);
}

function scrollTrack(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const scrollAmount = track.clientWidth * 0.5;
  track.parentElement.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

/* =========================================================
   GENERIC CUSTOM DROPDOWN FACTORY & SERVICES ENGINE
========================================================= */

/**
 * Initializes a filterable custom dropdown input field.
 */
function initCustomDropdown({ inputId, containerId, items, getLabel, getIcon, onSelect }) {
  const input = document.getElementById(inputId);
  const container = document.getElementById(containerId);
  if (!input || !container) return;

  function render(list) {
    container.innerHTML = "";
    if (list.length === 0) {
      container.innerHTML = '<div class="visa-option">No options found</div>';
      return;
    }
    list.forEach(item => {
      const div = document.createElement("div");
      div.className = "visa-option";
      const iconHtml = getIcon ? `<span class="flag">${getIcon(item)}</span> ` : '';
      const label = getLabel(item);
      div.innerHTML = `${iconHtml}<span>${label}</span>`;
      div.onclick = () => {
        input.value = getIcon ? `${getIcon(item)} ${label}` : label;
        container.classList.remove("show");
        if (onSelect) onSelect(item);
      };
      container.appendChild(div);
    });
  }

  input.addEventListener("focus", () => {
    render(items);
    container.classList.add("show");
  });

  input.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = items.filter(item => getLabel(item).toLowerCase().includes(q));
    render(filtered);
    container.classList.add("show");
  });
}

// Data Arrays
const visaCountriesData = [
  { name: "United States (USA)", flag: "🇺🇸" },
  { name: "United Kingdom (UK)", flag: "🇬🇧" },
  { name: "Schengen / Europe", flag: "🇪🇺" },
  { name: "United Arab Emirates (Dubai)", flag: "🇦🇪" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Saudi Arabia", flag: "🇸🇦" }
];

const cabPickupLocations = [
  "Chennai Airport (MAA)",
  "Chennai Central Railway Station",
  "Chennai Egmore Station",
  "T. Nagar / Kodambakkam",
  "OMR / Sholinganallur (IT Corridor)",
  "Velachery / Guindy",
  "Koyambedu (CMBT)",
  "ECR / Neelankarai"
];

const cabDropLocations = [
  "Pondicherry / Puducherry",
  "Tirupati / Tirumala",
  "Mahabalipuram / ECR Beach Resorts",
  "Kanchipuram Heritage Town",
  "Vellore / Golden Temple",
  "Bengaluru City",
  "Local Chennai Full Day Sightseeing",
  "Local Airport Drop / Transfer"
];

let selectedVisaCountry = null;

function sendVisaWhatsApp() {
  const phoneNumber = "919884066830";
  let countryName = selectedVisaCountry ? selectedVisaCountry.name : document.getElementById("visaCountryInput")?.value;
  const fromDate = document.getElementById("visaFromDate")?.value;
  const toDate = document.getElementById("visaToDate")?.value;
  const pax = document.getElementById("visaPaxSelect")?.value || "1 Person";
  const remarks = document.getElementById("visaRemarksInput")?.value.trim();

  if (!countryName || !countryName.trim()) {
    alert("Please select or type a destination country for Visa Assistance.");
    return;
  }

  let message = `Hello Cogo Tours, I am interested in Visa Assistance.\n\n🌐 *Destination Country:* ${countryName}`;
  if (fromDate && toDate) {
    message += `\n📅 *Travel Period:* ${fromDate} to ${toDate}`;
  } else if (fromDate) {
    message += `\n📅 *Travel Date:* ${fromDate}`;
  }
  message += `\n👥 *Applicants (Pax):* ${pax}`;
  if (remarks) {
    message += `\n📝 *Remarks:* ${remarks}`;
  }
  message += `\n\nPlease share the required document checklist and visa process.`;

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

function handleVisaBooking(btn) {
  const form = btn.closest('form');
  const country = form?.querySelector('#visaCountry')?.value || '';
  const date = form?.querySelector('#visaTravelDate')?.value || '';
  const returnDate = form?.querySelector('#visaReturnDate')?.value || '';
  const pax = form?.querySelector('#visaPax')?.value || '';
  const name = form?.querySelector('#visaName')?.value || '';
  const mobile = form?.querySelector('#visaMobile')?.value || '';
  const remarks = form?.querySelector('#visaRemarks')?.value || '';

  let msg = `*Visa Assistance Enquiry*\n`;
  if (country) msg += `🌐 Country: ${country}\n`;
  if (date) msg += ` Travel Date: ${date}\n`;
  if (returnDate) msg += ` Return Date: ${returnDate}\n`;
  if (pax) msg += ` Applicants: ${pax}\n`;
  if (name) msg += `👤 Name: ${name}\n`;
  if (mobile) msg += `📞 Mobile: ${mobile}\n`;
  if (remarks) msg += `✏️ Remarks: ${remarks}\n`;

  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, '_blank');
}

function sendCabWhatsApp() {
  const phoneNumber = "919884066830";
  const pickup = document.getElementById("cabPickupInput")?.value.trim();
  const drop = document.getElementById("cabDropInput")?.value.trim();
  const travelDate = document.getElementById("cabDateInput")?.value;
  const travelTime = document.getElementById("cabTimeInput")?.value;
  const vehicle = document.getElementById("cabVehicleSelect")?.value;
  const pack = document.getElementById("cabPackSelect")?.value;

  if (!pickup || !drop) {
    alert("Please enter or select both Pickup and Destination locations.");
    return;
  }

  let message = `Hello Cogo Tours, I want to book/enquire a cab.\n\n📍 *Pickup:* ${pickup}\n🎯 *Destination:* ${drop}`;
  if (travelDate) message += `\n📅 *Date:* ${travelDate}`;
  if (travelTime) message += `\n⏰ *Time:* ${travelTime}`;
  if (vehicle) message += `\n🚗 *Vehicle:* ${vehicle}`;
  if (pack) message += `\n⏱️ *Trip Pack:* ${pack}`;
  message += `\n\nPlease share availability and fare details.`;

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

function handleCabBooking(btn) {
  const form = btn.closest('form');
  const pickup = form?.querySelector('#pickupLocation')?.value || '';
  const drop = form?.querySelector('#dropLocation')?.value || '';
  const date = form?.querySelector('#cabDate')?.value || '';
  const returnDate = form?.querySelector('#cabReturnDate')?.value || '';
  const time = form?.querySelector('#cabTime')?.value || '';
  const vehicle = form?.querySelector('#cabVehicle')?.value || '';
  const pack = form?.querySelector('#cabPackage')?.value || '';
  const name = form?.querySelector('#cabName')?.value || '';
  const mobile = form?.querySelector('#cabMobile')?.value || '';
  const remarks = form?.querySelector('#cabRemarks')?.value || '';

  let msg = `*Cab Service Enquiry*\n`;
  if (pickup) msg += ` Pickup: ${pickup}\n`;
  if (drop) msg += ` Drop: ${drop}\n`;
  if (date) msg += ` Travel Date: ${date}\n`;
  if (returnDate) msg += ` Return Date: ${returnDate}\n`;
  if (time) msg += `⏰ Pickup Time: ${time}\n`;
  if (vehicle) msg += ` Vehicle: ${vehicle}\n`;
  if (pack) msg += ` Package: ${pack}\n`;
  if (name) msg += `👤 Name: ${name}\n`;
  if (mobile) msg += `📞 Mobile: ${mobile}\n`;
  if (remarks) msg += `✏️ Remarks: ${remarks}\n`;

  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, '_blank');
}

/* =========================================================
   FLIGHT BOOKING ENGINE
========================================================= */

function toggleReturnDate(isRoundTrip) {
  const returnInput = document.getElementById("flightReturnDate");
  if (returnInput) {
    returnInput.style.display = isRoundTrip ? "block" : "none";
  }
}

function sendFlightWhatsApp() {
  const phoneNumber = "919884066830";
  const scope = document.querySelector('input[name="flightScope"]:checked')?.value || "Domestic";
  const type = document.querySelector('input[name="flightType"]:checked')?.value || "One-Way";
  const fromCity = document.getElementById("flightFromInput")?.value.trim();
  const toCity = document.getElementById("flightToInput")?.value.trim();
  const departDate = document.getElementById("flightDepartDate")?.value;
  const returnDate = document.getElementById("flightReturnDate")?.value;
  const preferredTime = document.getElementById("flightTimeSelect")?.value;
  const passengers = document.getElementById("flightPaxSelect")?.value || "1 Passenger";

  if (!fromCity || !toCity) {
    alert("Please enter both Departure and Destination cities.");
    return;
  }

  let message = `Hello Cogo Tours, I want to book/enquire a flight ticket.\n\n🌐 *Type:* ${scope} (${type})\n🛫 *From:* ${fromCity}\n🛬 *To:* ${toCity}`;
  if (departDate) message += `\n📅 *Departure Date:* ${departDate}`;
  if (type === "Round Trip" && returnDate) message += `\n📅 *Return Date:* ${returnDate}`;
  if (preferredTime) message += `\n⏰ *Preferred Time:* ${preferredTime}`;
  message += `\n👥 *Passengers:* ${passengers}`;
  message += `\n\nPlease check for available flights and best fare deals.`;

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

function handleFlightBooking(btn) {
  const form = btn.closest('form');
  const flightType = form?.querySelector('input[name="flightType"]:checked')?.value || 'Domestic';
  const tripType = form?.querySelector('input[name="tripType"]:checked')?.value || 'One-Way';
  const from = form?.querySelector('#departureCity')?.value || '';
  const to = form?.querySelector('#destinationCity')?.value || '';
  const date = form?.querySelector('#flightDate')?.value || '';
  const returnDate = form?.querySelector('#flightReturnDate')?.value || '';
  const timeBand = form?.querySelector('#flightTimeBand')?.value || '';
  const name = form?.querySelector('#flightName')?.value || '';
  const mobile = form?.querySelector('#flightMobile')?.value || '';
  const remarks = form?.querySelector('#flightRemarks')?.value || '';

  let msg = `*Flight Booking Enquiry*\n`;
  if (flightType) msg += ` Type: ${flightType} (${tripType})\n`;
  if (from) msg += ` From: ${from}\n`;
  if (to) msg += ` To: ${to}\n`;
  if (date) msg += ` Departure Date: ${date}\n`;
  if (returnDate) msg += ` Return Date: ${returnDate}\n`;
  if (timeBand) msg += ` Preferred Time: ${timeBand}\n`;
  if (name) msg += `👤 Name: ${name}\n`;
  if (mobile) msg += `📞 Mobile: ${mobile}\n`;
  if (remarks) msg += `✏️ Remarks: ${remarks}\n`;

  window.open(`https://wa.me/919884066830?text=${encodeURIComponent(msg)}`, '_blank');
}

/* =========================================================
   INITIALIZATION & EVENT LISTENERS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const { lightbox, img } = getLightboxElements();

  // --- Initialize Custom Dropdowns ---
  initCustomDropdown({
    inputId: "visaCountryInput",
    containerId: "visaDropdownList",
    items: visaCountriesData,
    getLabel: (item) => item.name,
    getIcon: (item) => item.flag,
    onSelect: (item) => { selectedVisaCountry = item; }
  });

  initCustomDropdown({
    inputId: "cabPickupInput",
    containerId: "cabPickupList",
    items: cabPickupLocations,
    getLabel: (item) => item
  });

  initCustomDropdown({
    inputId: "cabDropInput",
    containerId: "cabDropList",
    items: cabDropLocations,
    getLabel: (item) => item
  });

  // Dynamic Flag CDN Dropdown
  const flagVisaCountries = [
    { name: "Australia", code: "au" },
    { name: "Canada", code: "ca" },
    { name: "Dubai (UAE)", code: "ae" },
    { name: "France", code: "fr" },
    { name: "Germany", code: "de" },
    { name: "Indonesia (Bali)", code: "id" },
    { name: "Italy", code: "it" },
    { name: "Japan", code: "jp" },
    { name: "Malaysia", code: "my" },
    { name: "Singapore", code: "sg" },
    { name: "Switzerland", code: "ch" },
    { name: "Thailand", code: "th" },
    { name: "United Kingdom", code: "gb" },
    { name: "United States", code: "us" },
    { name: "Vietnam", code: "vn" }
  ];

  const flagCountryInput = document.getElementById("visaCountry");
  const flagDropdownList = document.getElementById("visaCountryDropdown");
  const flagPreview = document.getElementById("selectedFlag");

  if (flagCountryInput && flagDropdownList && flagPreview) {
    const renderFlagOptions = (filterText = "") => {
      flagDropdownList.innerHTML = "";
      const filtered = flagVisaCountries.filter(c => c.name.toLowerCase().includes(filterText.toLowerCase()));

      if (filtered.length === 0) {
        flagDropdownList.innerHTML = `<div class="no-match-option">No matching countries found</div>`;
        flagDropdownList.classList.add("show");
        return;
      }

      filtered.forEach(country => {
        const option = document.createElement("div");
        option.className = "visa-option";
        option.innerHTML = `
          <img src="https://flagcdn.com/w40/${country.code}.png" alt="${country.name} Flag">
          <span>${country.name}</span>
        `;
        option.addEventListener("click", () => {
          flagCountryInput.value = country.name;
          flagPreview.innerHTML = `<img src="https://flagcdn.com/w40/${country.code}.png" alt="${country.name} Flag">`;
          flagPreview.classList.remove("hidden");
          flagCountryInput.classList.add("has-flag");
          flagDropdownList.classList.remove("show");
        });
        flagDropdownList.appendChild(option);
      });

      flagDropdownList.classList.add("show");
    };

    flagCountryInput.addEventListener("input", (e) => {
      flagPreview.classList.add("hidden");
      flagPreview.innerHTML = "";
      flagCountryInput.classList.remove("has-flag");
      renderFlagOptions(e.target.value.trim());
    });

    flagCountryInput.addEventListener("focus", () => {
      renderFlagOptions(flagCountryInput.value.trim());
    });
  }

  // --- Lightbox Listeners ---
  if (lightbox) {
    lightbox.addEventListener("wheel", (e) => {
      if (lightbox.style.display === "flex" || lightbox.classList.contains("show")) {
        e.preventDefault();
        if (e.deltaY < 0) zoomIn();
        else zoomOut();
      }
    }, { passive: false });
  }

  if (img) {
    img.addEventListener("click", (e) => {
      if (isDragging) return;
      e.stopPropagation();
      currentZoomScale = currentZoomScale === 1 ? 2 : 1;
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

    // Touch event listeners optimized for smooth scrolling
    img.addEventListener("touchstart", (e) => {
      if (currentZoomScale > 1 && e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;
      applyZoomTransform();
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDragging = false;
    }, { passive: true });
  }

  // Element Control Handlers
  document.querySelectorAll(".pamphlet-prev, .prev-btn, #prevBtn").forEach(btn => btn.onclick = prevPamphlet);
  document.querySelectorAll(".pamphlet-next, .next-btn, #nextBtn").forEach(btn => btn.onclick = nextPamphlet);
  document.querySelectorAll(".zoom-in, #zoomInBtn").forEach(btn => btn.onclick = zoomIn);
  document.querySelectorAll(".zoom-out, #zoomOutBtn").forEach(btn => btn.onclick = zoomOut);
  document.querySelectorAll(".pamphlet-close, .close-btn, #closeBtn").forEach(btn => btn.onclick = closePamphletZoom);
});

// --- Keyboard Navigation ---
document.addEventListener("keydown", (e) => {
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

// --- Outside Click Handler for Dropdowns ---
document.addEventListener("click", (e) => {
  const visaWrapper = document.querySelector(".custom-select-wrapper");
  if (visaWrapper && !visaWrapper.contains(e.target)) {
    document.getElementById("visaDropdownList")?.classList.remove("show");
  }

  const pickupWrap = document.getElementById("cabPickupInput")?.parentElement;
  const dropWrap = document.getElementById("cabDropInput")?.parentElement;

  if (pickupWrap && !pickupWrap.contains(e.target)) {
    document.getElementById("cabPickupList")?.classList.remove("show");
  }
  if (dropWrap && !dropWrap.contains(e.target)) {
    document.getElementById("cabDropList")?.classList.remove("show");
  }

  if (!e.target.closest(".visa-country-selector")) {
    document.getElementById("visaCountryDropdown")?.classList.remove("show");
  }
});
