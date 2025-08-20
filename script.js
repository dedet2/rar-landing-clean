// /script.js
(function () {
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // Map Stripe checkout link to Reserve Now by reading the "Pay Deposit" buttons
  function getStripeLinksFromCards() {
    const map = {};
    const section = $('#pricing') || $('#choose') || document;
    const cards = $$('.tier-card', section);
    cards.forEach(card => {
      const title = ($('h3.tier-name', card)?.textContent || '').trim();
      const depositBtn = $$('a', card).find(a => /deposit/i.test(a.textContent||''));
      if (title && depositBtn?.href) map[title] = depositBtn.href;
    });
    return map;
  }
  function getTierKeyFromSelectValue(val) {
    if (!val) return '';
    if (/Whispering/i.test(val)) return 'Whispering Pines';
    if (/Golden/i.test(val)) return 'Golden Crane';
    if (/Eternal|Blossom/i.test(val)) return 'Eternal Blossom';
    return '';
  }
  function wireReserveNow() {
    const tierSelect = $('#journey-select');
    const reserveBtn  = $('#payment-button');
    if (!tierSelect || !reserveBtn) return;
    const linksMap = getStripeLinksFromCards();
    function setLink() {
      const key = getTierKeyFromSelectValue(tierSelect.value);
      if (linksMap[key]) {
        reserveBtn.onclick = () => window.open(linksMap[key], '_blank', 'noopener');
      }
    }
    tierSelect.addEventListener('change', setLink);
    setLink();
  }

  // Send Inquiry -> Vercel backend
  async function submitInquiry(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const tierSelect = $('#journey-select');
    const tier = tierSelect ? tierSelect.options[tierSelect.selectedIndex].text.split(' — ')[0] : '';
    const name = $('#full-name')?.value?.trim() || '';
    const email = $('#email')?.value?.trim() || '';
    const message = ($('textarea[name=message]', form) || $('#message'))?.value || '';
    let hp = $('#hpField');
    if (!hp) {
      hp = document.createElement('input');
      hp.type='text'; hp.name='honeypot'; hp.id='hpField';
      hp.style.position='absolute'; hp.style.left='-9999px'; hp.style.opacity='0';
      form.appendChild(hp);
    }
    const btn  = $('.form-actions .secondary-btn') || form.querySelector('button[type=submit]');
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
    const form = $('.reserve-form');
    if (!form) return;
    // Convert the left button ("Send Inquiry") into a submitter
    const sendBtn = $('.form-actions .secondary-btn', form);
    if (sendBtn) {
      sendBtn.type = 'submit';
      sendBtn.id = 'sendInquiryBtn';
    }
    form.addEventListener('submit', submitInquiry);
  }

  // Upgrade FAQs (ensure permanent content remains consistent if older HTML is present)
  function upgradeFAQs() {
    const faqs = $('#faq') || document;
    // Also fix any lingering "90 days" text
    $$('*', faqs).forEach(el => {
      if (el.childNodes && el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        el.textContent = el.textContent.replace(/refundable up to\s*90\s*days/i, 'refundable up to 60 days');
      } else if (el.innerHTML) {
        el.innerHTML = el.innerHTML.replace(/refundable up to\s*90\s*days/i, 'refundable up to 60 days');
      }
    });
  }

  function run() {
    wireReserveNow();
    wireInquiryForm();
    upgradeFAQs();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
