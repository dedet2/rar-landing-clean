// Countdown timer for the Early‑Bird section
// This script calculates the time remaining until September 15, 2025 and updates
// the DOM every second. It also ensures that the countdown stops at zero.

document.addEventListener('DOMContentLoaded', () => {
  const endDate = new Date('2025-09-15T00:00:00');

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    let diff = endDate - now;
    // If the date has passed, stop the countdown at zero
    if (diff < 0) diff = 0;

    const secondsTotal = Math.floor(diff / 1000);
    const days = Math.floor(secondsTotal / (24 * 60 * 60));
    const hours = Math.floor((secondsTotal % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((secondsTotal % 3600) / 60);
    const seconds = secondsTotal % 60;

    // Update DOM elements
    document.getElementById('days').textContent = pad(days);
    document.getElementById('hours').textContent = pad(hours);
    document.getElementById('minutes').textContent = pad(minutes);
    document.getElementById('seconds').textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});