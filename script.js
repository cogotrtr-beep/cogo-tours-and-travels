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

// Global State
let activeServiceTitle = "General Journey Enquiry";
let currentPamphletList = [];
let currentPamphletIndex = 0;

// Drag-to-Pan & Zoom State
let currentZoomScale = 1;
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
  desc: "Fixed tariffs for Sedan, Innova, Crysta, Urbania & Luxury Vehicles.",
  tabs: [
    {
      name: "Standard & Luxury Rates",
      content: `
        <div class="tariff-box">
          <h4>Standard Outstation & Local Hourly Tariff</h4>
          <p>Transparent pricing with verified drivers for local and outstation trips.</p>
          <ul class="bulletin-list">
            <li class="bulletin-item"><span class="bullet-label">Sedan (Dzire / Etios)</span> <span class="bullet-price">₹14 / km</span></li>
            <li class="bulletin-item"><span class="bullet-label">SUV (Ertiga / Marazzo)</span> <span class="bullet-price">₹18 / km</span></li>
            <li class="bulletin-item"><span class="bullet-label">Innova (7+1 Seater)</span> <span class="bullet-price">₹20 / km</span></li>
            <li class="bulletin-item"><span class="bullet-label">Innova Crysta Premium</span> <span class="bullet-price">₹24 / km</span></li>
            <li class="bulletin-item"><span class="bullet-label">Tempo Traveller (12/14/18)</span> <span class="bullet-price">₹28 / km</span></li>
          </ul>
        </div>
      `
    }
  ]
};

// Complete Master Database for Tour Packages Hub
const tourCategoryDatabase = {
  chennai: {
    title: "Tour Chennai Heritage & Beaches",
    desc: "Explore Mahabalipuram, Marina Beach, Kanchipuram & city sights.",
    tabs: [
      {
        name: "City Sightseeing",
        content: `
          <div class="tariff-box">
            <h4>Chennai Full Day Sightseeing (8 Hrs / 80 Kms)</h4>
            <p>Includes Kapaleeshwarar Temple, Fort St. George, Marina Beach & San Thome Cathedral.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan Cab Pack</span> <span class="bullet-price">₹2,200</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova SUV Pack</span> <span class="bullet-price">₹3,400</span></li>
              <li class="bulletin-item"><span class="bullet-label">Tempo Traveller</span> <span class="bullet-price">₹4,800</span></li>
            </ul>
          </div>
        `
      },
      {
        name: "ECR Coastal Trail",
        content: `
          <div class="tariff-box">
            <h4>ECR & Mahabalipuram Day Trip</h4>
            <p>Covers Shore Temple, Pancha Rathas, Kovalam Beach, and Crocodile Bank.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan Outstation</span> <span class="bullet-price">₹3,000</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova Outstation</span> <span class="bullet-price">₹4,200</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  pilgrim: {
    title: "Spiritual & Temple Circuits",
    desc: "Hassle-free darshan packages for Tirupati, Shirdi, Kanchi & Navagraha.",
    tabs: [
      {
        name: "Tirupati Balaji",
        content: `
          <div class="tariff-box">
            <h4>Chennai to Tirupati Daily Special Package</h4>
            <p>Includes Pickup, Drop, Special Entry Darshan arrangements, and breakfast/lunch.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan (Max 4 Pax)</span> <span class="bullet-price">₹6,500</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova (Max 6 Pax)</span> <span class="bullet-price">₹9,500</span></li>
            </ul>
          </div>
        `
      },
      {
        name: "Navagraha Trail",
        content: `
          <div class="tariff-box">
            <h4>Kumbakonam Navagraha 3-Day Circuit</h4>
            <p>Complete guided circuit covering all 9 Navagraha temples with AC vehicle.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Sedan Pack</span> <span class="bullet-price">₹12,500</span></li>
              <li class="bulletin-item"><span class="bullet-label">Innova Pack</span> <span class="bullet-price">₹17,000</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  'south-india': {
    title: "South India Hill Stations & Backwaters",
    desc: "Experience Ooty, Munnar, Kodaikanal, Coorg & Alleppey.",
    tabs: [
      {
        name: "Misty Munnar & Alleppey",
        content: `
          <div class="tariff-box">
            <h4>5 Days / 4 Nights Kerala Escape</h4>
            <p>Tea plantation visits, Munnar waterfalls, and Alleppey Houseboat stay with meals.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Couple Pack</span> <span class="bullet-price">₹22,500</span></li>
              <li class="bulletin-item"><span class="bullet-label">Family Pack (4 Pax)</span> <span class="bullet-price">₹38,000</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  'north-india': {
    title: "North India & Royal Rajasthan",
    desc: "Golden Triangle, Shimla, Manali & Taj Mahal tours.",
    tabs: [
      {
        name: "Golden Triangle",
        content: `
          <div class="tariff-box">
            <h4>6 Days Delhi - Agra - Jaipur Tour</h4>
            <p>Includes Taj Mahal sunrise view, Amber Fort, Amber Palace, and private transfers.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Standard Tour</span> <span class="bullet-price">₹24,000 / Person</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  'north-east': {
    title: "Pristine North East Valleys",
    desc: "Gangtok, Darjeeling, Shillong, Cherrapunji & Kaziranga.",
    tabs: [
      {
        name: "Sikkim & Darjeeling",
        content: `
          <div class="tariff-box">
            <h4>6 Days Gangtok - Tsomgo Lake - Darjeeling</h4>
            <p>Includes Tiger Hill sunrise, high-altitude permits, and scenic transfer vehicles.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Per Person Fare</span> <span class="bullet-price">₹18,500</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  'rest-of-india': {
    title: "Pan India Offbeat Excursions",
    desc: "Goa, Gujarat Rann of Kutch, Kashmir & Andaman Islands.",
    tabs: [
      {
        name: "Goa Getaway",
        content: `
          <div class="tariff-box">
            <h4>4 Days North & South Goa Package</h4>
            <p>Includes resort stay, Mandovi river cruise, beach tours, and airport pick/drop.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Couple Package</span> <span class="bullet-price">₹16,000</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  international: {
    title: "International Escapes",
    desc: "Hassle-free international holidays with visas and flights included.",
    tabs: [
      {
        name: "Dubai Extravaganza",
        content: `
          <div class="tariff-box">
            <h4>5 Days Dubai & Abu Dhabi Special</h4>
            <p>Burj Khalifa 124th floor, Desert Safari with BBQ, Dhow Cruise & Ferrari World.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Per Person Package</span> <span class="bullet-price">₹48,500</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  corporate: {
    title: "Corporate MICE & Team Retreats",
    desc: "Customized corporate outings, conferences, and team-building events.",
    tabs: [
      {
        name: "Team Outings",
        content: `
          <div class="tariff-box">
            <h4>Mahabalipuram & ECR Beach Resort Outings</h4>
            <p>Day outings with buffet lunch, team activities, audio system, and luxury bus transport.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Per Employee Rate</span> <span class="bullet-price">Starting ₹1,200</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  students: {
    title: "School & College Educational Trips",
    desc: "Safe, budget-friendly industrial visits and excursion tours.",
    tabs: [
      {
        name: "Industrial Visit",
        content: `
          <div class="tariff-box">
            <h4>Bangalore - Mysore - Coorg 4-Day IV</h4>
            <p>Includes luxury sleeper coach transport, factory visits, hotel stays, and all meals.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Per Student Fare</span> <span class="bullet-price">₹4,500</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  adventure: {
    title: "Thrill & Adventure Expeditions",
    desc: "Trekking, water sports, wildlife safaris, and mountain camping.",
    tabs: [
      {
        name: "Dandeli Rafting",
        content: `
          <div class="tariff-box">
            <h4>3 Days Dandeli & Gokarna Beach Trek</h4>
            <p>White water rafting, jungle camping, kayaking, and night bonfire.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Per Person</span> <span class="bullet-price">₹6,800</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  honeymoon: {
    title: "Romantic Honeymoon Packages",
    desc: "Curated romantic getaways with candle-light dinners and luxury stays.",
    tabs: [
      {
        name: "Kodaikanal Bliss",
        content: `
          <div class="tariff-box">
            <h4>4 Days / 3 Nights Romantic Retreat</h4>
            <p>Includes flower bed decoration, candle-light dinner, private cab, and sightseeing.</p>
            <ul class="bulletin-list">
              <li class="bulletin-item"><span class="bullet-label">Couple Special</span> <span class="bullet-price">₹21,000</span></li>
            </ul>
          </div>
        `
      }
    ]
  },
  cabs: cogoCabsData,
  journey: {
    title: "Plan Your Custom Journey",
    desc: "Tell us where you want to travel, and we will build a custom itinerary.",
    tabs: [
      {
        name: "Custom Enquiry",
        content: `
          <div class="tariff-box">
            <h4>Customized Tour Itinerary</h4>
            <p>Fill out the form below with your group details and target destinations to get a free quote within 30 minutes.</p>
          </div>
        `
      }
    ]
  },
  ticket: {
    title: "Flight, Train & Bus Tickets",
    desc: "Instant ticketholder assistance and fare lookup.",
    tabs: [
      {
        name: "Ticket Enquiry",
        content: `
          <div class="tariff-box">
            <h4>Fare Lookup & Reservation</h4>
            <p>Fast track ticket booking for flights, IRCTC trains, and luxury sleeper buses.</p>
          </div>
        `
      }
    ]
  }
};

/* =========================================================
   CATEGORY MODAL & TABS MANAGEMENT
========================================================= */

function openCategoryModal(categoryKey) {
  const modal = document.getElementById('enquiryModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const subTabsContainer = document.getElementById('modalSubTabs');
  const dynamicContent = document.getElementById('modalDynamicContent');

  const category = tourCategoryDatabase[categoryKey] || tourCategoryDatabase['journey'];

  modalTitle.innerText = category.title;
  modalDesc.innerText = category.desc;
  activeServiceTitle = category.title;

  subTabsContainer.innerHTML = '';
  dynamicContent.innerHTML = '';

  if (category.tabs && category.tabs.length > 0) {
    category.tabs.forEach((tab, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `sub-tab-btn tab-color-${index % 4} ${index === 0 ? 'active' : ''}`;
      btn.innerText = tab.name;
      btn.onclick = () => {
        document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        dynamicContent.innerHTML = tab.content;
      };
      subTabsContainer.appendChild(btn);
    });

    dynamicContent.innerHTML = category.tabs[0].content;
  }

  modal.classList.add('show');
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('enquiryModal');
  const categoryModal = document.getElementById('categoryModal');
  
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
  if (categoryModal) {
    categoryModal.classList.remove('show');
    categoryModal.style.display = 'none';
  }
}

function closeCategoryModal(event) {
  if (event) event.stopPropagation();
  closeModal();
}

function closeModalOnOverlay(event) {
  if (event.target.classList.contains('modal-overlay') || event.target.classList.contains('package-modal-overlay')) {
    closeModal();
  }
}

/* =========================================================
   SLIDER SCROLL ENGINE
========================================================= */

function scrollTrack(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const scrollAmount = track.clientWidth * 0.75;
  track.parentElement.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

/* =========================================================
   PAMPHLET LIGHTBOX & ZOOM ENGINE
========================================================= */

function openPamphletList(images, startIndex = 0) {
  if (!images || images.length === 0) return;
  currentPamphletList = images;
  currentPamphletIndex = startIndex;

  const lightbox = document.getElementById('pamphletLightbox');
  const imgElement = document.getElementById('lightboxImage');

  if (lightbox && imgElement) {
    imgElement.src = currentPamphletList[currentPamphletIndex];
    resetZoom();
    lightbox.classList.add('show');
    lightbox.style.display = 'flex';
  }
}

function openPamphletZoom(index) {
  currentPamphletIndex = index;
  const modal = document.getElementById('imageModal');
  const imgModalSrc = document.getElementById('imgModalSrc');

  if (modal && imgModalSrc && currentPamphletList.length > 0) {
    imgModalSrc.src = currentPamphletList[currentPamphletIndex];
    modal.classList.add('show');
    modal.style.display = 'flex';
  }
}

function closePamphletZoom(event) {
  if (event) event.stopPropagation();
  const lightbox = document.getElementById('pamphletLightbox');
  const imageModal = document.getElementById('imageModal');

  if (lightbox) {
    lightbox.classList.remove('show');
    lightbox.style.display = 'none';
  }
  if (imageModal) {
    imageModal.classList.remove('show');
    imageModal.style.display = 'none';
  }
  resetZoom();
}

function navigateLightbox(direction, event) {
  if (event) event.stopPropagation();
  if (!currentPamphletList || currentPamphletList.length === 0) return;

  currentPamphletIndex = (currentPamphletIndex + direction + currentPamphletList.length) % currentPamphletList.length;
  
  const imgElement = document.getElementById('lightboxImage');
  if (imgElement) {
    imgElement.src = currentPamphletList[currentPamphletIndex];
    resetZoom();
  }
}

function changeZoom(factor) {
  currentZoomScale = Math.max(0.5, Math.min(3.5, currentZoomScale + factor));
  applyZoomTransform();
}

function resetZoom() {
  currentZoomScale = 1;
  translateX = 0;
  translateY = 0;
  applyZoomTransform();
}

function applyZoomTransform() {
  const imgElement = document.getElementById('lightboxImage');
  if (imgElement) {
    imgElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoomScale})`;
  }
}

/* =========================================================
   COUNTRY & VISA AUTOCOMPLETE DATA & HANDLERS
========================================================= */

const countryData = [
  { name: 'Dubai / UAE', flag: 'https://flagcdn.com/w40/ae.png' },
  { name: 'Singapore', flag: 'https://flagcdn.com/w40/sg.png' },
  { name: 'Thailand', flag: 'https://flagcdn.com/w40/th.png' },
  { name: 'Malaysia', flag: 'https://flagcdn.com/w40/my.png' },
  { name: 'Schengen (Europe)', flag: 'https://flagcdn.com/w40/eu.png' },
  { name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
  { name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
  { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
  { name: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
  { name: 'Vietnam', flag: 'https://flagcdn.com/w40/vn.png' },
  { name: 'Sri Lanka', flag: 'https://flagcdn.com/w40/lk.png' },
  { name: 'Bali (Indonesia)', flag: 'https://flagcdn.com/w40/id.png' }
];

document.addEventListener('DOMContentLoaded', () => {
  const visaInput = document.getElementById('visaCountry');
  const dropdown = document.getElementById('visaCountryDropdown');
  const flagPreview = document.getElementById('selectedFlag');

  if (visaInput && dropdown && flagPreview) {
    visaInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      dropdown.innerHTML = '';

      if (!val) {
        dropdown.classList.remove('show');
        flagPreview.classList.add('hidden');
        visaInput.classList.remove('has-flag');
        return;
      }

      const matches = countryData.filter(c => c.name.toLowerCase().includes(val));

      if (matches.length > 0) {
        matches.forEach(c => {
          const opt = document.createElement('div');
          opt.className = 'visa-option';
          opt.innerHTML = `<img src="${c.flag}" alt="${c.name}"> <span>${c.name}</span>`;
          opt.onclick = () => {
            visaInput.value = c.name;
            flagPreview.innerHTML = `<img src="${c.flag}" alt="${c.name}">`;
            flagPreview.classList.remove('hidden');
            visaInput.classList.add('has-flag');
            dropdown.classList.remove('show');
          };
          dropdown.appendChild(opt);
        });
        dropdown.classList.add('show');
      } else {
        dropdown.classList.remove('show');
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.visa-country-selector')) {
        dropdown.classList.remove('show');
      }
    });
  }
});

/* =========================================================
   BOOKING & ENQUIRY DISPATCH ENGINE
========================================================= */

function handleCabBooking(buttonEl) {
  const pickup = document.getElementById('pickupLocation')?.value.trim() || '';
  const drop = document.getElementById('dropLocation')?.value.trim() || '';
  const date = document.getElementById('cabDate')?.value || '';
  const returnDate = document.getElementById('cabReturnDate')?.value || '';
  const time = document.getElementById('cabTime')?.value || '';
  const vehicle = document.getElementById('cabVehicle')?.value || '';
  const pack = document.getElementById('cabPackage')?.value || '';
  const name = document.getElementById('cabName')?.value.trim() || '';
  const mobile = document.getElementById('cabMobile')?.value.trim() || '';
  const remarks = document.getElementById('cabRemarks')?.value.trim() || '';

  if (!pickup || !drop || !date || !time || !vehicle || !pack || !name || !mobile) {
    alert('Please fill in all mandatory cab booking fields.');
    return;
  }

  let text = `🚖 *COGO CABS BOOKING REQUEST*\n\n`;
  text += `👤 *Name:* ${name}\n`;
  text += `📞 *Mobile:* ${mobile}\n`;
  text += `📍 *Pickup:* ${pickup}\n`;
  text += `🛬 *Drop:* ${drop}\n`;
  text += `📅 *Date:* ${date} ${time}\n`;
  if (returnDate) text += `🔄 *Return Date:* ${returnDate}\n`;
  text += `🚗 *Vehicle:* ${vehicle}\n`;
  text += `⏱️ *Package:* ${pack}\n`;
  if (remarks) text += `✏️ *Notes:* ${remarks}\n`;

  const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

function handleFlightBooking(buttonEl) {
  const flightType = document.querySelector('input[name="flightType"]:checked')?.value || 'Domestic';
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'One-Way';
  const from = document.getElementById('departureCity')?.value.trim() || '';
  const to = document.getElementById('destinationCity')?.value.trim() || '';
  const date = document.getElementById('flightDate')?.value || '';
  const returnDate = document.getElementById('flightReturnDate')?.value || '';
  const timeBand = document.getElementById('flightTimeBand')?.value || '';
  const name = document.getElementById('flightName')?.value.trim() || '';
  const mobile = document.getElementById('flightMobile')?.value.trim() || '';
  const remarks = document.getElementById('flightRemarks')?.value.trim() || '';

  if (!from || !to || !date || !timeBand || !name || !mobile) {
    alert('Please fill in all mandatory flight enquiry fields.');
    return;
  }

  let text = `✈️ *FLIGHT FARE ENQUIRY*\n\n`;
  text += `👤 *Name:* ${name}\n`;
  text += `📞 *Mobile:* ${mobile}\n`;
  text += `🌐 *Type:* ${flightType} (${tripType})\n`;
  text += `🛫 *From:* ${from}\n`;
  text += `🛬 *To:* ${to}\n`;
  text += `📅 *Departure:* ${date}\n`;
  if (returnDate) text += `🔄 *Return:* ${returnDate}\n`;
  text += `🕒 *Time Band:* ${timeBand}\n`;
  if (remarks) text += `✏️ *Notes:* ${remarks}\n`;

  const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

function handleVisaBooking(buttonEl) {
  const country = document.getElementById('visaCountry')?.value.trim() || '';
  const travelDate = document.getElementById('visaTravelDate')?.value || '';
  const returnDate = document.getElementById('visaReturnDate')?.value || '';
  const pax = document.getElementById('visaPax')?.value || '';
  const name = document.getElementById('visaName')?.value.trim() || '';
  const mobile = document.getElementById('visaMobile')?.value.trim() || '';
  const remarks = document.getElementById('visaRemarks')?.value.trim() || '';

  if (!country || !travelDate || !pax || !name || !mobile) {
    alert('Please fill in all mandatory visa assistance fields.');
    return;
  }

  let text = `🛂 *VISA ASSISTANCE ENQUIRY*\n\n`;
  text += `👤 *Name:* ${name}\n`;
  text += `📞 *Mobile:* ${mobile}\n`;
  text += `🌐 *Destination:* ${country}\n`;
  text += `📅 *Travel Date:* ${travelDate}\n`;
  if (returnDate) text += `🔄 *Return Date:* ${returnDate}\n`;
  text += `👥 *Applicants:* ${pax}\n`;
  if (remarks) text += `✏️ *Notes:* ${remarks}\n`;

  const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

function submitEnquiry(channel) {
  const name = document.getElementById('userName')?.value.trim() || '';
  const phone = document.getElementById('userPhone')?.value.trim() || '';
  const notes = document.getElementById('userQuery')?.value.trim() || '';

  if (!name || !phone) {
    alert('Please provide your Name and Mobile Number.');
    return;
  }

  if (channel === 'whatsapp') {
    let text = `📋 *${activeServiceTitle.toUpperCase()}*\n\n`;
    text += `👤 *Name:* ${name}\n`;
    text += `📞 *Phone:* ${phone}\n`;
    if (notes) text += `📝 *Notes:* ${notes}\n`;

    const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  } else if (channel === 'email') {
    const subject = encodeURIComponent(`Enquiry: ${activeServiceTitle}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nNotes:\n${notes}`);
    window.location.href = `mailto:cogotrtr@gmail.com?subject=${subject}&body=${body}`;
  }

  closeModal();
}

function openWhatsAppForm(packageName) {
  const modal = document.getElementById('waFormModal');
  const pkgInput = document.getElementById('waPackageName');
  if (modal && pkgInput) {
    pkgInput.value = packageName;
    modal.style.display = 'flex';
  }
}

function closeWhatsAppForm() {
  const modal = document.getElementById('waFormModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function sendWhatsAppEnquiry(event) {
  event.preventDefault();
  const pkg = document.getElementById('waPackageName')?.value || '';
  const name = document.getElementById('waGuestName')?.value.trim() || '';
  const phone = document.getElementById('waGuestPhone')?.value.trim() || '';
  const msg = document.getElementById('waGuestMsg')?.value.trim() || '';

  let text = `🌟 *PACKAGE ENQUIRY: ${pkg}*\n\n`;
  text += `👤 *Name:* ${name}\n`;
  text += `📞 *Phone:* ${phone}\n`;
  if (msg) text += `💬 *Message:* ${msg}\n`;

  const waUrl = `https://wa.me/919884066830?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
  closeWhatsAppForm();
}
// Image Modal Expand & Pan/Zoom Functionality
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
let scale = 1;
let isPanning = false;
let startX = 0, startY = 0, translateX = 0, translateY = 0;

// Expand image to full screen on click
document.querySelectorAll(".image-wrapper").forEach(wrapper => {
  wrapper.addEventListener("click", function () {
    const img = this.querySelector("img");
    modal.style.display = "flex";
    modalImg.src = img.src;
    resetZoom();
  });
});

function closeModal() {
  modal.style.display = "none";
  resetZoom();
}

function resetZoom() {
  scale = 1;
  translateX = 0;
  translateY = 0;
  updateTransform();
}

function updateTransform() {
  modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Mouse Wheel Zooming
modalImg.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomFactor = e.deltaY < 0 ? 1.2 : 0.8;
  scale = Math.min(Math.max(1, scale * zoomFactor), 5);
  updateTransform();
});

// Drag to Pan when Zoomed
modalImg.addEventListener("mousedown", (e) => {
  if (scale > 1) {
    isPanning = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    modalImg.style.cursor = "grabbing";
  }
});

window.addEventListener("mousemove", (e) => {
  if (!isPanning) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  updateTransform();
});

window.addEventListener("mouseup", () => {
  isPanning = false;
  modalImg.style.cursor = "grab";
});

// Touch Pinch-to-Zoom for Mobile Devices
let initialDistance = 0;

modalImg.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    initialDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
  }
});

modalImg.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    const currentDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    const zoomFactor = currentDistance / initialDistance;
    scale = Math.min(Math.max(1, scale * zoomFactor), 5);
    updateTransform();
    initialDistance = currentDistance;
  }
});

// Enquire Button Action
function openCategoryModal(category) {
  // If you have an existing modal with ID "categoryModal" or "journeyModal", it will open here
  const modal = document.getElementById('categoryModal') || document.getElementById('journeyModal');
  if (modal) {
    modal.style.display = 'flex';
  } else {
    // Fallback alert if no modal is found
    alert("Enquiry requested for this tour package.");
  }
}

// Object to track current slide index for each slider track
const slideIndices = {};

function scrollTrack(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const slides = track.querySelectorAll('.tour-card');
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  if (slideIndices[trackId] === undefined) {
    slideIndices[trackId] = 0;
  }

  // Update index based on left (-1) or right (1) arrow click
  slideIndices[trackId] += direction;

  // Loop back if index goes past bounds
  if (slideIndices[trackId] < 0) {
    slideIndices[trackId] = totalSlides - 1;
  } else if (slideIndices[trackId] >= totalSlides) {
    slideIndices[trackId] = 0;
  }

  // Ensure transition effect and translate track
  track.style.transition = 'transform 0.4s ease-in-out';
  const percentage = slideIndices[trackId] * 100;
  track.style.transform = `translateX(-${percentage}%)`;
}
