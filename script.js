// /script.js
(function () {
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // --- SEO injection (fallback so it's DFY even if head isn't edited) ---
  function injectSEO() {
    const head = document.head;
    if (!head) return;
    const inject = (tag, attrs) => {
      const el = document.createElement(tag);
      Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k,v));
      head.appendChild(el);
    };
    if (!document.title || /untitled/i.test(document.title)) {
      document.title = 'Rest as Resistance Retreat — Japan, Dec 8–17, 2025 | Dr Dédé Tetsubayashi';
    }
    inject('meta', { name:'description', content:'A 10-day restorative retreat in Japan led by Dr Dédé Tetsubayashi: onsen rituals, forest bathing, curated ryokan stays, and workshops on the politics & practice of rest.' });
    inject('link', { rel:'canonical', href: window.location.origin + '/' });
    inject('meta', { property:'og:type', content:'website' });
    inject('meta', { property:'og:title', content:'Rest as Resistance Retreat — Japan, Dec 8–17, 2025' });
    inject('meta', { property:'og:description', content:'Onsen rituals, forest bathing, curated ryokan stays, and restorative workshops led by Dr Dédé.' });
    inject('meta', { name:'twitter:card', content:'summary_large_image' });
    inject('meta', { name:'twitter:title', content:'Rest as Resistance Retreat — Japan, Dec 8–17, 2025' });
    inject('meta', { name:'twitter:description', content:'Onsen rituals, forest bathing, curated ryokan stays, and restorative workshops led by Dr Dédé.' });
  }

  // --- Reserve Now Stripe linking ---
  function getStripeLinksFromCards() {
    const map = {};
    const section = $('#pricing') || $('#choose') || document;
    const cards = $$('.tier-card', section);
    cards.forEach(card => {
      const title = ($('h4', card)?.textContent || '').split('\n')[0].trim();
      const depositBtn = $$('a', card).find(a => /deposit/i.test(a.textContent||''));
      if (title && depositBtn?.href) map[title] = depositBtn.href;
    });
    return map;
  }
  function getTierKeyFromSelectValue(val) {
    if (!val) return '';
    if (/Whispering/i.test(val)) return 'Whispering Pines';
    if (/Golden/i.test(val)) return 'Golden Crane';
    if (/Eternal|Blossom/i.test(val)) return 'Eternal Blossom';
    return '';
  }
  function wireReserveNow() {
    const tierSelect = $('#tierSelect') || $('#reserve select') || $('section#reserve select');
    const reserveBtn  = $('#reserveBtn') || $$('section#reserve a').find(a => /reserve now/i.test(a.textContent||''));
    if (!tierSelect || !reserveBtn) return;
    const linksMap = getStripeLinksFromCards();
    function setLink() {
      const key = getTierKeyFromSelectValue(tierSelect.value);
      if (linksMap[key]) {
        reserveBtn.href = linksMap[key];
        reserveBtn.target = '_blank';
        reserveBtn.rel = 'noopener';
      }
    }
    tierSelect.addEventListener('change', setLink);
    setLink();
  }

  // --- Inquiry form to Vercel backend ---
  async function submitInquiry(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const tier = ($('#tierSelect') || $('select', form))?.value || '';
    const name = ($('input[name=name]', form) || $('#fullName'))?.value?.trim() || '';
    const email = ($('input[type=email]', form) || $('#email'))?.value?.trim() || '';
    const message = ($('textarea[name=message]', form) || $('#message'))?.value || '';
    let hp = $('#hpField');
    if (!hp) {
      hp = document.createElement('input');
      hp.type='text'; hp.name='honeypot'; hp.id='hpField';
      hp.style.position='absolute'; hp.style.left='-9999px'; hp.style.opacity='0';
      form.appendChild(hp);
    }
    const btn  = $('#sendInquiryBtn') || $('button[type=submit]', form) || form.querySelector('button');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    try {
      const r = await fetch('/api/send-inquiry', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ tier, name, email, message, honeypot: hp.value || '' })
      });
      const data = await r.json();
      if (data.ok) {
        if (btn) btn.textContent = 'Sent — thank you!';
        form.reset();
      } else {
        if (btn) { btn.disabled = false; btn.textContent = 'Send Inquiry'; }
        alert('There was an issue sending your inquiry. Please try again.');
      }
    } catch (err) {
      if (btn) { btn.disabled = false; btn.textContent = 'Send Inquiry'; }
      alert('Network error. Please try again.');
    }
  }
  function wireInquiryForm() {
    const form = $('#inquiryForm') || $('#inquiry-form') || $('section#reserve form') || $('form');
    if (!form) return;
    form.addEventListener('submit', submitInquiry);
  }

  // --- FAQ upgrades (copy & refund policy) ---
  function upgradeFAQs() {
    const faqs = $('#faqs') || $('#faq') || document;
    const qNodes = $$('h4, h3, dt', faqs);
    const node = qNodes.find(n => /what'?s included in the price/i.test(n.textContent||''));
    if (node) {
      const container = node.nextElementSibling || node.parentElement;
      if (container && !container.dataset.includedUpgraded) {
        container.innerHTML = `
<p>Your journey covers lodging, intercity transport, daily onsen rituals, workshops, curated meals and concierge support. International airfare, visas, travel insurance and add-ons are extra. International airfare (return) is included after 9/15, once the Early Bird Pricing period ends.</p>
<h5>Retreat Pricing (Flights Included) — After September 15</h5>
<ul>
  <li><b>Whispering Pines: $8,700 USD</b><br>
    <small>Double/shared occupancy, all retreat activities, meals, and round-trip airfare.</small>
  </li>
  <li><b>Golden Crane: $11,200 USD</b><br>
    <small>Private room upgrade, additional premium amenities, all retreat activities, meals, and round-trip airfare.</small>
  </li>
  <li><b>Eternal Blossom: $13,500 USD</b><br>
    <small>Single occupancy, maximum privacy, exclusive spa treatment, all retreat activities, meals, and round-trip airfare.</small>
  </li>
</ul>
<p><em>Spaces limited to 10 guests. Pricing reflects our exclusive 2025 all-inclusive package—after this cohort, rates will increase for future seasons.</em></p>`;
        container.dataset.includedUpgraded = '1';
      }
    }
    // Update any "90 days" -> "60 days"
    $$('*', faqs).forEach(el => {
      if (el.childNodes && el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        el.textContent = el.textContent.replace(/refundable up to\s*90\s*days/i, 'refundable up to 60 days');
      } else if (el.innerHTML) {
        el.innerHTML = el.innerHTML.replace(/refundable up to\s*90\s*days/i, 'refundable up to 60 days');
      }
    });
  }

  // --- CSS overrides: Early-bird tweaks & addons headings ---
  function injectCSS() {
    const css = `
      .earlybird-note { font-size: 0.85rem; opacity: 0.9; }
      .time-box span { font-size: 2.2rem; font-weight: 600; }
      @media (max-width: 768px){
        .earlybird-container { flex-direction: row; align-items: center; justify-content: space-between; }
      }
      .addons-category { color: #f4c15d; font-size: 1rem; margin-top: 1rem; margin-bottom: 0.5rem; }
      .reserve-note-small { font-size: 0.85rem; opacity: 0.95; }
    `;
    const el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  function run() {
    injectSEO();
    injectCSS();
    wireReserveNow();
    wireInquiryForm();
    upgradeFAQs();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
