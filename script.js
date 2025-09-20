// Countdown timer for the Early‑Bird section
// This script calculates the time remaining until September 15, 2025 and updates
// the DOM every second. It also ensures that the countdown stops at zero.

document.addEventListener('DOMContentLoaded', () => {
  const endDate = new Date('2025-09-15T00:00:00');

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  // --- Reservation and Inquiry form logic ---
  // Mapping of journey values to Stripe checkout links. These links correspond
  // to the “Pay Deposit” buttons in the pricing cards. Updating the values
  // here ensures the Reserve Now button always opens the correct checkout.
  const depositLinks = {
    'whispering-pines': 'https://buy.stripe.com/00wfZh2uq8jH6GG3GV7kc01',
    'golden-crane': 'https://buy.stripe.com/aFaaEX5GCdE14yy4KZ7kc03',
    'eternal-blossom': 'https://buy.stripe.com/fZucN53yu0Rf0ii6T77kc05'
  };

  const journeySelect = document.getElementById('journey-select');
  const reserveBtn = document.getElementById('payment-button');

  function updateReserveLink() {
    const journey = journeySelect.value;
    const url = depositLinks[journey] || '#';
    // Set the click handler to open Stripe in a new tab
    reserveBtn.onclick = () => {
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener');
      }
    };
  }

  if (journeySelect && reserveBtn) {
    journeySelect.addEventListener('change', updateReserveLink);
    updateReserveLink();
  }

  // Handle Send Inquiry submission
  const inquiryBtn = document.querySelector('.form-actions .secondary-btn');
  if (inquiryBtn && journeySelect) {
    inquiryBtn.addEventListener('click', async () => {
      const nameInput = document.getElementById('full-name');
      const emailInput = document.getElementById('email');
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const tierOption = journeySelect.options[journeySelect.selectedIndex].text;
      const tierName = tierOption.split('—')[0].trim();

      if (!name || !email) {
        alert('Please enter your name and email.');
        return;
      }

      inquiryBtn.disabled = true;
      const originalText = inquiryBtn.textContent;
      inquiryBtn.textContent = 'Sending…';

      try {
        const response = await fetch('/api/send-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: tierName, name, email, honeypot: '' })
        });
        const data = await response.json();
        if (data && data.ok) {
          inquiryBtn.textContent = 'Sent!';
          // Reset form fields
          nameInput.value = '';
          emailInput.value = '';
        } else {
          // If SendGrid is not configured, gracefully fall back to mailto link
          const err = data && data.error ? String(data.error) : '';
          if (err.includes('SENDGRID_API_KEY')) {
            // Compose a mailto link with subject and body prefilled
            const subject = encodeURIComponent(`RAR Retreat Inquiry — ${tierName}`);
            const body = encodeURIComponent(`Selected Tier: ${tierName}\nName: ${name}\nEmail: ${email}`);
            const mailto = (data && data.url)
                ? data.url
                : `mailto:rar@dr-dede.com,info@dr-dede.com?subject=${subject}&body=${body}`;
            window.location.href = mailto;
            inquiryBtn.disabled = false;
            inquiryBtn.textContent = originalText;
          } else {
            inquiryBtn.disabled = false;
            inquiryBtn.textContent = originalText;
            alert(err || 'There was an issue sending your inquiry. Please try again.');
          }
        }
      } catch (err) {
        inquiryBtn.disabled = false;
        inquiryBtn.textContent = originalText;
        alert('Network error. Please try again.');
      }
    });
  }
});
