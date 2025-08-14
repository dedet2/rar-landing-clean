
// Countdown to Sept 15, 2025 (price increase)
(function(){
  const el = document.getElementById('countdown');
  if(!el) return;
  const deadline = new Date('2025-09-15T23:59:59-07:00').getTime();
  function tick(){ 
    const now = Date.now();
    const diff = Math.max(0, deadline - now);
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    el.textContent = `Early-bird ends in ${d}d ${h}h ${m}m`;
  }
  tick(); setInterval(tick,60000);
})();

// Stripe links by tier
const depositLinks = {
  tier1: 'https://buy.stripe.com/00wfZh2uq8jH6GG3GV7kc01',
  tier2: 'https://buy.stripe.com/aFaaEX5GCdE14yy4KZ7kc03',
  tier3: 'https://buy.stripe.com/fZucN53yu0Rf0ii6T77kc05'
};
const fullLinks = {
  tier1: 'https://buy.stripe.com/5kQfZh7OKgQd8OOelz7kc02',
  tier2: 'https://buy.stripe.com/bJeaEXc509nL2qqfpD7kc04',
  tier3: 'https://buy.stripe.com/bJecN5d946bz6GGelz7kc06'
};

(function initStripeButtons(){
  const tierSelect = document.getElementById('tier-select');
  const depositBtn = document.getElementById('pay-deposit-btn');
  const fullBtn = document.getElementById('pay-full-btn');
  if(!tierSelect || !depositBtn || !fullBtn) return;
  function refresh(){
    const t = tierSelect.value || 'tier1';
    depositBtn.href = depositLinks[t];
    fullBtn.href = fullLinks[t];
  }
  tierSelect.addEventListener('change', refresh);
  refresh();
})();
