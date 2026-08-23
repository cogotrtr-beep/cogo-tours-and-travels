let selectedPackage = '';

function openEnquiry(packageName) {
  selectedPackage = packageName;
  const modalTitle = document.getElementById('modalTitle');
  const enquiryModal = document.getElementById('enquiryModal');
  
  if (modalTitle) {
    modalTitle.innerText = 'Enquire: ' + packageName;
  }
  if (enquiryModal) {
    enquiryModal.classList.add('active');
  }
}

function closeEnquiry() {
  const enquiryModal = document.getElementById('enquiryModal');
  if (enquiryModal) {
    enquiryModal.classList.remove('active');
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('userName').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const notes = document.getElementById('userNotes').value.trim();

  if (!name || !phone) {
    alert("Please enter your name and contact phone number.");
    return;
  }

  const whatsappMessage = `Hello Cogo Tours,%0A%0AI want to enquire about *${encodeURIComponent(selectedPackage)}*.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Notes:* ${encodeURIComponent(notes || 'N/A')}`;
  
  // Cogo Tours WhatsApp Number
  const whatsappNumber = "919884066830"; 
  window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  
  closeEnquiry();
}

// Close modal when clicking outside the box
document.addEventListener("DOMContentLoaded", function () {
  const enquiryModal = document.getElementById('enquiryModal');
  if (enquiryModal) {
    enquiryModal.addEventListener('click', function (e) {
      if (e.target === enquiryModal) {
        closeEnquiry();
      }
    });
  }
});
