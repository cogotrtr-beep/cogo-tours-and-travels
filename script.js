// Function for Quick Enquiry Popup
function openEnquiryForm(serviceName) {
  alert("Thank you for choosing CoGo Tours! Booking enquiry for: " + serviceName + "\n\nOur team will contact you shortly.");
}

// Function for Category Modal
function openCategoryModal(category) {
  if (category === 'cabs') {
    alert("CoGo Cabs Rates:\n- Local Hatchback: ₹12/km\n- Sedan: ₹14/km\n- SUV (Innova/Ertiga): ₹18/km\n\nCall +91 9876543210 to book instantly!");
  } else if (category === 'domestic') {
    alert("Domestic Packages available for Kerala, Ooty, Goa & Himachal. Contact us for custom itineraries!");
  } else if (category === 'international') {
    alert("International Tour Packages available for Thailand, Dubai, Singapore & Europe!");
  }
}
