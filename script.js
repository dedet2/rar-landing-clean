// Countdown timer script for Rest as Resistance — Japan 2025

// Set the early‑bird expiration date (ISO format). Adjust as needed.
// Early‑bird pricing ends on 15 September 2025 at midnight PST
const targetDate = new Date('2025-09-15T00:00:00-07:00');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  // DOM elements
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  if (!daysEl) return;
  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const displayHours = hours % 24;
  const displayMinutes = minutes % 60;
  const displaySeconds = seconds % 60;
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(displayHours).padStart(2, '0');
  minutesEl.textContent = String(displayMinutes).padStart(2, '0');
  secondsEl.textContent = String(displaySeconds).padStart(2, '0');
}

// Kick off countdown updates every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Deposit redirect logic for tier-based checkout
// Mapping of tier values (from the select dropdown) to Stripe checkout URLs.
// These payment links were provided by the client and replace the
// previous Podia checkout pages. When the user clicks the deposit
// button, they are taken straight to the secure Stripe payment form.
// Updated Stripe payment links for each tier (deposit only). These
// values were provided by the client on August 14 2025 and replace
// the previous test URLs. To add full‑price links, define a similar
// mapping (e.g. fullLinks) and update the button handlers.
const depositLinks = {
  // Essential Tier — deposit payment link (Tier 1)
  tier1: 'https://buy.stripe.com/00wfZh2uq8jH6GG3GV7kc01',
  // Private Indulgence — deposit payment link (Tier 2)
  tier2: 'https://buy.stripe.com/aFaaEX5GCdE14yy4KZ7kc03',
  // VIP Sanctuary — deposit payment link (Tier 3)
  tier3: 'https://buy.stripe.com/fZucN53yu0Rf0ii6T77kc05'
};

// Attach event listener to the deposit button if it exists
document.addEventListener('DOMContentLoaded', () => {
  const depositBtn = document.getElementById('deposit-button');
  const tierSelect = document.getElementById('tier-select');
  if (depositBtn && tierSelect) {
    depositBtn.addEventListener('click', () => {
      const selectedTier = tierSelect.value;
      // If a valid tier is selected, redirect to the associated payment link
      const url = depositLinks[selectedTier];
      if (url) {
        window.location.href = url;
      }
    });
  }
});
