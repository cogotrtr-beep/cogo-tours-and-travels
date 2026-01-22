/* =========================================================
   CO GO TOURS & TRAVELS - SCRIPT.JS (FULL)
   ✅ Fixes:
   - No alert popups
   - Contact form success note
   - All cards (including Chennai/ECR) get:
        ✅ WhatsApp dynamic message
        ✅ View Details modal
        ✅ Removes note/alert blocks
   - Plan Your Journey WhatsApp + Email
========================================================= */

/* ✅ Enquiry Form Submit Message (NO alert popup) */
function showMessage(event) {
  event.preventDefault();
  event.target.reset();

  const note = document.getElementById("formSuccessNote");
  if (note) {
    note.classList.add("show");
    setTimeout(() => note.classList.remove("show"), 3000);
  }
}

/* ✅ Back to Top Button */
const topBtn = document.getElementById("topBtn");
if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const WA_NUMBER = "919884066830";
  const EMAIL_ID = "cogotrtr@gmail.com";

  /* ==============================
     ✅ Modal Creation (View Details)
  ============================== */
  let modal = document.getElementById("detailsModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "detailsModal";
    modal.className = "details-modal";
    modal.innerHTML = `
      <div class="details-backdrop" data-close="1"></div>
      <div class="details-box">
        <button class="details-close" data-close="1">✕</button>
        <h3 id="detailsTitle">Package Details</h3>
        <div id="detailsBody"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close) modal.classList.remove("open");
  });

  function getText(el) {
    return el ? el.innerText.trim() : "";
  }

  /* ==============================
     ✅ WhatsApp message generator
  ============================== */
  function buildWaMessage(card) {
    const title =
      getText(card.querySelector("h3")) ||
      getText(card.querySelector("h2")) ||
      "Tour Package";

    const subtitle =
      getText(card.querySelector(".tour-meta")) ||
      getText(card.querySelector(".subtitle")) ||
      getText(card.querySelector("p")) ||
      "";

    const duration =
      getText(card.querySelector(".badge.days")) ||
      getText(card.querySelector(".duration")) ||
      "";

    const price =
      getText(card.querySelector(".badge.price")) ||
      getText(card.querySelector(".price")) ||
      "";

    const lis = Array.from(card.querySelectorAll("ul li"))
      .slice(0, 5)
      .map(li => li.innerText.replace(/^✔\s*/,"").trim())
      .filter(Boolean);

    const highlights = lis.length
      ? "%0AHighlights:%0A" + lis.map(h => `• ${encodeURIComponent(h)}`).join("%0A")
      : "";

    const msg =
      `Hi Cogo Tours & Travels 😊%0A%0A` +
      `I’m interested in: *${encodeURIComponent(title)}*%0A` +
      (subtitle ? `Type: ${encodeURIComponent(subtitle)}%0A` : "") +
      (duration ? `Duration: ${encodeURIComponent(duration)}%0A` : "") +
      (price ? `Budget/Price: ${encodeURIComponent(price)}%0A` : "") +
      highlights +
      `%0A%0APlease share full itinerary, inclusions & best quote.`;

    return `https://wa.me/${WA_NUMBER}?text=${msg}`;
  }

  /* ==============================
     ✅ View Details modal content
  ============================== */
  function openDetails(card) {
    const title =
      getText(card.querySelector("h3")) ||
      getText(card.querySelector("h2")) ||
      "Package Details";

    const meta =
      getText(card.querySelector(".tour-meta")) ||
      getText(card.querySelector(".subtitle")) ||
      getText(card.querySelector("p")) ||
      "";

    const lis = Array.from(card.querySelectorAll("ul li"))
      .slice(0, 8)
      .map(li => `<li>${li.innerText}</li>`)
      .join("");

    document.getElementById("detailsTitle").innerText = title;

    document.getElementById("detailsBody").innerHTML = `
      <p style="opacity:.85;margin-top:6px;"><b>${meta}</b></p>
      <div class="details-section">
        <h4>Package Highlights</h4>
        <ul class="details-list">${lis || "<li>Dummy package highlights will be updated soon.</li>"}</ul>
      </div>
      <div class="details-section">
        <h4>Dummy Itinerary</h4>
        <p class="details-note">This is a dummy note. You can update full itinerary later.</p>
        <ol class="details-itinerary">
          <li>Pickup & start sightseeing</li>
          <li>Main attractions visit</li>
          <li>Lunch break</li>
          <li>Shopping / leisure</li>
          <li>Drop back</li>
        </ol>
      </div>
    `;

    modal.classList.add("open");
  }

  /* ==============================
     ✅ Apply to ALL cards (including Chennai/ECR)
  ============================== */
  const cards = document.querySelectorAll(".tour-card, .card, .package-card");

  cards.forEach(card => {
    // remove old note/alert blocks inside cards
    card.querySelectorAll(".note, .alert, .info-box").forEach(x => x.remove());

    // find / create actions area
    let actions =
      card.querySelector(".tour-actions") ||
      card.querySelector(".actions");

    if (!actions) {
      actions = document.createElement("div");
      actions.className = "tour-actions";
      actions.style.marginTop = "14px";
      card.appendChild(actions);
    }

    // find whatsapp button
    let waBtn =
      card.querySelector(".wa-quote") ||
      card.querySelector(".whatsapp-btn") ||
      Array.from(card.querySelectorAll("a,button")).find(b => /whatsapp/i.test(b.innerText));

    // create if missing
    if (!waBtn) {
      waBtn = document.createElement("a");
      waBtn.className = "tour-btn wa-quote";
      waBtn.innerText = "WhatsApp Enquiry";
      actions.appendChild(waBtn);
    }

    // if it is button, convert to link
    if (waBtn.tagName.toLowerCase() === "button") {
      const a = document.createElement("a");
      a.className = waBtn.className;
      a.innerText = waBtn.innerText;
      waBtn.replaceWith(a);
      waBtn = a;
    }

    waBtn.href = buildWaMessage(card);
    waBtn.target = "_blank";
    waBtn.rel = "noopener";

    // ensure view details exists
    let vdBtn =
      card.querySelector(".view-details") ||
      Array.from(card.querySelectorAll("button,a")).find(b => /view details/i.test(b.innerText));

    if (!vdBtn) {
      vdBtn = document.createElement("button");
      vdBtn.className = "tour-btn view-details";
      vdBtn.type = "button";
      vdBtn.innerText = "View Details";
      actions.appendChild(vdBtn);
    }

    vdBtn.onclick = () => openDetails(card);
  });

  /* ==============================
     ✅ Override ALL WhatsApp links globally
     (even hardcoded wa.me links)
  ============================== */
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach((btn) => {
    const card = btn.closest(".tour-card") || btn.closest(".card") || btn.closest(".package-card");
    if (!card) return;
    btn.href = buildWaMessage(card);
    btn.target = "_blank";
    btn.rel = "noopener";
  });

  /* ==============================
     ✅ Plan Your Journey buttons
     (works if IDs present)
  ============================== */
 const pyjWhatsapp = document.getElementById("contactWhatsApp");
const pyjEmail = document.getElementById("contactEmail");
  if (pyjWhatsapp) {
    pyjWhatsapp.addEventListener("click", () => {
      const msg = `Hi Cogo Tours & Travels 😊%0A%0AI want to plan my journey. Please contact me with details.`;
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    });
  }

  if (pyjEmail) {
    pyjEmail.addEventListener("click", () => {
      window.location.href =
        `mailto:${EMAIL_ID}?subject=Travel%20Enquiry%20-%20Cogo%20Tours&body=Hi%20Cogo%20Team,%0A%0AI%20want%20to%20plan%20my%20journey.%20Please%20share%20details.%0A%0AThanks.`;
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const WA_NUMBER = "919884066830";

  function buildMsg(title) {
    const msg =
      `Hi Cogo Tours & Travels 😊%0A%0A` +
      `I’m interested in: *${encodeURIComponent(title)}*%0A%0A` +
      `Please share full itinerary, inclusions & best quote.`;
    return `https://wa.me/${WA_NUMBER}?text=${msg}`;
  }

  // ✅ override EVERY whatsapp link in the entire website
  document.querySelectorAll('a[href*="wa.me"]').forEach((a) => {
    const card = a.closest(".tour-card") || a.closest(".card") || a.closest(".package-card");
    const title =
      card?.querySelector("h3")?.innerText?.trim() ||
      card?.querySelector("h2")?.innerText?.trim() ||
      "Tour Package";

    a.href = buildMsg(title);
    a.target = "_blank";
    a.rel = "noopener";
  });
});



