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

// === DFY agent addon (2025-08-17) ===
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    try {
      // Spots remaining
      window.spotsRemaining = 5;
      var spotEl = document.getElementById('spots-left');
      if (spotEl) spotEl.textContent = String(spotsRemaining);
    } catch(e){ console.warn('spots update failed', e); }

    // Update hero blurb if selector exists
    var heroBlurb = document.querySelector('.hero-subtitle, .hero p, .hero-copy, .hero .subtitle');
    if (heroBlurb) {
      heroBlurb.textContent = "For Black women reclaiming rest as a right. Slow mornings, onsen rituals, forest bathing and ryokan care—crafted for deep restoration, community and liberation. Space is limited to curate an intimate group where all guests will be pampered and poured into, regardless of their chosen package.";
    }

    // Remove badge pills if present by matching known text
    var textsToRemove = ["6–8 client spots","White‑glove concierge","White-glove concierge","Early‑Bird live","Early-bird pricing available"];
    Array.from(document.querySelectorAll('body *')).forEach(function(el){
      var t = (el.textContent||'').trim();
      if (t && textsToRemove.some(x => t.includes(x))) {
        el.remove();
      }
    });

    // Insert Early-Birds banner if missing
    if (!document.getElementById('early-birds-banner')) {
      var hero = document.querySelector('header.hero, .hero-section, header.hero-section');
      if (hero && hero.parentElement){
        var b = document.createElement('div');
        b.id = 'early-birds-banner';
        b.className = 'early-banner';
        b.innerHTML = 'Early‑Birds: secure your rest with a deposit by <strong>September 15, 2025</strong> — <strong><span id=\"spots-left\">5</span> guest spots remaining!</strong>';
        hero.parentElement.insertBefore(b, hero.nextSibling);
      }
    }

    // Rename headings and labels
    var renames = [
      {re:/Itinerary\\s*Highlights/i, to:'Your Restorative Oasis Itinerary'},
      {re:/Choose\\s*Your\\s*Tier/i, to:'Choose Your Rest Journey'},
      {re:/What'?s\\s*Not\\s*Included/i, to:'Journey Add-ons'},
      {re:/Meet\\s*Dr\\.?\\s*D[ée]dé/i, to:'Meet Your Host'}
    ];
    document.querySelectorAll('h1,h2,h3,h4').forEach(function(h){
      renames.forEach(function(r){
        if (r.re.test(h.textContent)) h.textContent = r.to;
      });
      h.textContent = h.textContent.replace(/\\bTier\\s*(\\d)\\b/i, 'Journey $1');
    });

    // Ensure anchor links go to #reserve
    document.querySelectorAll('a').forEach(function(a){
      var txt = (a.textContent || '').trim();
      if (/^Reserve\\s+Your\\s+Spot$/i.test(txt) || /^Reserve\\s+Now$/i.test(txt)) {
        a.setAttribute('href', '#reserve');
        a.removeAttribute('target');
        a.removeAttribute('rel');
      }
    });

    // FAQ accordion enhance
    document.querySelectorAll('.faq-item .question').forEach(function(q){
      q.style.cursor = 'pointer';
      q.addEventListener('click', function(){
        q.parentElement.classList.toggle('open');
      });
    });

    // QA badge via ?qa=1
    if (new URLSearchParams(location.search).has('qa')) {
      var badge = document.createElement('div');
      badge.textContent = 'BUILD design-full-2025-08-17';
      badge.style.cssText = 'position:fixed;top:8px;right:8px;padding:6px 10px;border:1px solid #d4a640;background:rgba(20,16,28,.85);color:#f4c15d;font:12px/1.2 system-ui,sans-serif;border-radius:6px;z-index:9999';
      document.body.appendChild(badge);
      console.log('[QA] build: design-full-2025-08-17');
    }
  });
})();

