// Countdown timer script for Rest as Resistance — Japan 2025

// Set the early‑bird expiration date (ISO format). Adjust as needed.
const targetDate = new Date('2025-10-01T00:00:00');

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