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
// Mapping of tier values (from the select dropdown) to Podia checkout URLs.
// Updated Podia checkout URLs. When the user clicks the deposit button,
// they will be taken straight to the corresponding checkout page for the
// selected tier. The `/buy` suffix ensures the link points to the
// checkout form rather than the product overview page.
const depositLinks = {
  tier1: 'https://drdede.podia.com/rest-as-resistance-japan-2025-deposit/buy',
  tier2: 'https://drdede.podia.com/private-indulgence-japan-2025-deposit/buy',
  tier3: 'https://drdede.podia.com/vip-sanctuary-deposit-japan-2025/buy'
};

// Attach event listener to the deposit button if it exists
document.addEventListener('DOMContentLoaded', () => {
  const depositBtn = document.getElementById('deposit-button');
  const tierSelect = document.getElementById('tier-select');
  if (depositBtn && tierSelect) {
    depositBtn.addEventListener('click', () => {
      const selectedTier = tierSelect.value;
      // If a valid tier is selected, redirect to the associated Podia link
      const url = depositLinks[selectedTier];
      if (url) {
        window.location.href = url;
      }
    });
  }
});