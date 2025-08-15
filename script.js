// Countdown timer and dynamic spots for Rest as Resistance — Japan 2025

// Set the early‑bird expiration date (Pacific Time). Early bird ends on
// September 15 2025 at midnight in the user’s local timezone. Adjust as
// needed.
const countdownTarget = new Date('2025-09-15T00:00:00-07:00');

function updateCountdown() {
  const now = new Date();
  const diff = countdownTarget - now;
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
  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Dynamic guest spots (update this number as spots fill). The number is
// displayed in the Early‑Birds section. In a real implementation this
// could be fetched from a database.
let spotsRemaining = 6;
function updateSpots() {
  const spotsEl = document.getElementById('spots-left');
  if (spotsEl) {
    spotsEl.textContent = spotsRemaining;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCountdown();
  updateSpots();
  setInterval(updateCountdown, 1000);
});