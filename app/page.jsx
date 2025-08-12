'use client';
import { useMemo, useState, useEffect } from 'react';
import TimeBox from '../components/TimeBox';

const CAMPAIGN = 'rar_earlybird_2025';
const SITE_URL = typeof window !== 'undefined'
  ? window.location.origin
  : (process.env.NEXT_PUBLIC_SITE_URL || 'https://rar-landing.vercel.app');

function withUTM(url, source='website', medium='site', content='primary_cta') {
  const u = new URL(url, SITE_URL);
  u.searchParams.set('utm_source', source);
  u.searchParams.set('utm_medium', medium);
  u.searchParams.set('utm_campaign', CAMPAIGN);
  u.searchParams.set('utm_content', content);
  return u.toString();
}

function podiaCheckoutUrl(content='checkout_cta', tierKey) {
  const base = process.env.NEXT_PUBLIC_PODIA_BASE_URL || '#';
  try {
    const u = new URL(base);
    u.searchParams.set('utm_source', 'website');
    u.searchParams.set('utm_medium', 'site');
    u.searchParams.set('utm_campaign', CAMPAIGN);
    u.searchParams.set('utm_content', content + (tierKey ? '_' + tierKey : ''));
    if (tierKey) u.searchParams.set('tier', tierKey);
    return u.toString();
  } catch { return '#'; }
}

function getTimeLeft(d) {
  const t = Math.max(0, d.getTime() - Date.now());
  return {
    days: Math.floor(t / 86400000),
    hours: Math.floor((t / 3600000) % 24),
    minutes: Math.floor((t / 60000) % 60),
    seconds: Math.floor((t / 1000) % 60),
  };
}

// Smooth scroll to reserve form
function scrollToReserve(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  const el = document.getElementById('reserve');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Page() {
  const earlyBirdEnd = useMemo(() => new Date('2025-09-16T06:59:59.000Z'), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(earlyBirdEnd));
  useEffect(() => { const id = setInterval(() => setTimeLeft(getTimeLeft(earlyBirdEnd)), 1000); return () => clearInterval(id); }, [earlyBirdEnd]);
  const isEarlyBird = Date.now() < earlyBirdEnd.getTime();

  // PRICING — Updated launch pricing
  const BASE = { t1: 7600, t2: 10100, t3: 12400 };
  const prices = { ...BASE };

  const [selectedTier, setSelectedTier] = useState('t2');
  const [form, setForm] = useState({ name: '', email: '' });

  async function submitForm(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tier: selectedTier }),
      });
      if (!res.ok) throw new Error('Network');
      alert('Thanks! We received your inquiry and will email you shortly.');
    } catch {
      const subject = encodeURIComponent('RAR Japan Inquiry — ' + selectedTier);
      const body = encodeURIComponent('Name: ' + form.name + '\nEmail: ' + form.email);
      const email = (process.env.EMAIL_CONTACT || 'info@incluu.us');
      window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    }
  }

  function selectTier(tierKey) {
    return (e) => { setSelectedTier(tierKey); scrollToReserve(e); };
  }

  return (
    <div className="min-h-screen w-full">
      <header className="sticky top-0 z-30 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="section h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-gold" />
            <span className="font-semibold tracking-wide">Rest as Resistance — Japan 2025</span>
          </div>
          <a href="#reserve" onClick={scrollToReserve} className="btn-outline text-sm">Reserve Your Spot</a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146e?q=80&w=2000&auto=format&fit=crop" alt="Misty forest in Japan" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="relative section py-24 lg:py-36">
          <div className="max-w-3xl">
            <p className="uppercase tracking-widest text-xs text-white/70 mb-3">Dec 8–17, 2025 • Tokyo • Kamakura • Beppu • Miyajima</p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1]">Rest as Resistance<span className="block text-white/80">A Luxury Healing Journey in Japan</span></h1>
            <p className="mt-6 text-lg text-white/80">For Black women reclaiming rest as a right. Slow mornings, onsen rituals, forest bathing, and ryokan care—crafted for deep restoration, community, and liberation.</p>
            <div className="mt-6 text-sm text-white/80 space-x-3">
              <span className="badge"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> Only 6 client spots</span>
              <span className="badge"><span className="inline-block h-2 w-2 rounded-full bg-brand-gold" /> White‑glove concierge</span>
              <span className="badge"><span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> Early‑Bird live</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-y border-white/10 bg-white/5">
        <div className="section flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm">
            <span><span className="font-semibold">Early‑Bird</span> — lock your rate while spots last.</span>
          </div>
          <div className="flex gap-3 text-center">
            <TimeBox label="Days" value={timeLeft.days} />
            <TimeBox label="Hours" value={timeLeft.hours} />
            <TimeBox label="Minutes" value={timeLeft.minutes} />
            <TimeBox label="Seconds" value={timeLeft.seconds} />
          </div>
        </div>
      </section>

      <section id="tiers" className="py-16">
        <div className="section">
          <div className="flex items-end justify-between gap-6 mb-8">
            <h2 className="text-3xl font-semibold">Choose Your Tier</h2>
            <p className="text-white/70">Dec 8–17, 2025 • 6 paying guests + 2 hosts</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#2a241f] p-6 hover:bg-[#342c25]">
              <div className="text-sm uppercase tracking-widest text-white/70">Tier 1</div>
              <div className="mt-1 text-2xl font-semibold">Essential</div>
              <div className="mt-3 text-4xl font-bold">
                ${prices.t1.toLocaleString()} <span className="text-base font-medium text-white/60">pp</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>• Boutique hotels + ryokans (shared at Sakura‑Sakura)</li>
                <li>• Onsen rituals in Shichirigahama & Beppu</li>
                <li>• Iwaso Ryokan stay on Miyajima</li>
                <li>• Two live workshops on wellness & rest for Black women</li>
                <li>• Concierge messaging & luggage forwarding</li>
              </ul>
              <a href="#reserve" onClick={selectTier('t1')} className="mt-6 inline-block btn-primary w-full text-center">Select Essential</a>
              <a href={podiaCheckoutUrl('podia_deposit_button','t1')} target="_blank" rel="noreferrer" className="mt-2 inline-block w-full text-center rounded-2xl border border-brand-gold text-brand-gold px-4 py-3 font-semibold hover:bg-brand-gold/10">Deposit via Podia</a>
            </div>

            <div className="rounded-3xl border border-[#d6b38a]/50 bg-[#3a2f26] p-6 hover:bg-[#43362c]">
              <div className="text-sm uppercase tracking-widest text-white/70">Tier 2</div>
              <div className="mt-1 text-2xl font-semibold">Private Indulgence</div>
              <div className="mt-3 text-4xl font-bold">
                ${prices.t2.toLocaleString()} <span className="text-base font-medium text-white/60">pp</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>• All Tier 1 inclusions</li>
                <li>• More private rooming where available*</li>
                <li>• Premium dining curation & hosted tea ceremony</li>
                <li>• Priority spa scheduling</li>
              </ul>
              <div className="text-xs text-white/60 mt-2">*Sakura‑Sakura has 3 rooms reserved for our group; those nights are shared across all tiers.</div>
              <a href="#reserve" onClick={selectTier('t2')} className="mt-6 inline-block btn-primary w-full text-center">Select Private Indulgence</a>
              <a href={podiaCheckoutUrl('podia_deposit_button','t2')} target="_blank" rel="noreferrer" className="mt-2 inline-block w-full text-center rounded-2xl border border-brand-gold text-brand-gold px-4 py-3 font-semibold hover:bg-brand-gold/10">Deposit via Podia</a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#2e2620] p-6 hover:bg-[#382e26]">
              <div className="text-sm uppercase tracking-widest text-white/70">Tier 3</div>
              <div className="mt-1 text-2xl font-semibold">VIP Sanctuary</div>
              <div className="mt-3 text-4xl font-bold">
                ${prices.t3.toLocaleString()} <span className="text-base font-medium text-white/60">pp</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>• All Tier 2 inclusions</li>
                <li>• Best‑available rooms throughout the journey*</li>
                <li>• VIP welcome & departure amenities</li>
                <li>• Optional luxury culinary night (add‑on)</li>
              </ul>
              <a href="#reserve" onClick={selectTier('t3')} className="mt-6 inline-block btn-primary w-full text-center">Select VIP Sanctuary</a>
              <a href={podiaCheckoutUrl('podia_deposit_button','t3')} target="_blank" rel="noreferrer" className="mt-2 inline-block w-full text-center rounded-2xl border border-brand-gold text-brand-gold px-4 py-3 font-semibold hover:bg-brand-gold/10">Deposit via Podia</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section py-10">
        <div className="grid md:grid-cols-3 gap-4">
          <img className="rounded-2xl border border-white/10 object-cover w-full h-56" alt="Kamakura coast" src="https://images.unsplash.com/photo-1548783305-6bfb9a7b8a02?q=80&w=1200&auto=format&fit=crop" />
          <img className="rounded-2xl border border-white/10 object-cover w-full h-56" alt="Beppu onsen steam" src="https://images.unsplash.com/photo-1590559899731-2fc8b1a79cd4?q=80&w=1200&auto=format&fit=crop" />
          <img className="rounded-2xl border border-white/10 object-cover w-full h-56" alt="Miyajima torii gate" src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1200&auto=format&fit=crop" />
        </div>
      </section>

      <section id="itinerary" className="py-16 border-t border-white/10">
        <div className="section">
          <h2 className="text-3xl font-semibold">Itinerary Highlights</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h3 className="font-semibold">Days 1–2 • Tokyo Arrival & Intention Setting</h3>
              <p className="text-white/80 mt-2 text-sm">Evening arrival, gentle start, slow morning. Intention‑setting circle and restorative dinner.</p>
              <h3 className="font-semibold mt-6">Days 3–4 • Kamakura — Open House Sakura‑Sakura</h3>
              <p className="text-white/80 mt-2 text-sm">Private 3‑room heritage home booked entirely for our group. Shichirigahama onsen ritual & forest bathing.</p>
              <h3 className="font-semibold mt-6">Day 5–6 • Beppu Hot Springs</h3>
              <p className="text-white/80 mt-2 text-sm">Onsen capital. Sand baths, mud baths, and a complimentary 60‑min treatment.</p>
              <h3 className="font-semibold mt-6">Days 7–8 • Miyajima — Iwaso Ryokan</h3>
              <p className="text-white/80 mt-2 text-sm">Iconic island, torii gate views, multi‑course kaiseki. Deep rest with caretaking hospitality.</p>
              <h3 className="font-semibold mt-6">Days 9–10 • Return Tokyo & Depart</h3>
              <p className="text-white/80 mt-2 text-sm">Integration time, optional shopping, depart for U.S.</p>
            </div>

            <div className="card">
              <h3 className="font-semibold">Workshops: Rest as Resistance</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/80">
                <li>• <span className="font-medium">Workshop 1:</span> The Politics & Practice of Rest — $1,000 value</li>
                <li>• <span className="font-medium">Workshop 2:</span> Embodied Stillness & Care — $1,000 value</li>
              </ul>
              <h3 className="font-semibold mt-6">What’s Included</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/80">
                <li>• Hotels & traditional ryokans (shared at Sakura‑Sakura)</li>
                <li>• All intercity transport + luggage forwarding</li>
                <li>• Onsen experiences in Shichirigahama & Beppu</li>
                <li>• Iwaso Ryokan stay on Miyajima</li>
                <li>• White‑glove concierge & host team</li>
              </ul>
              <h3 className="font-semibold mt-6">Good‑to‑Know</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/80">
                <li>• Cultural care for hair/skin needs; vetted Black‑traveler tips</li>
                <li>• Onsen etiquette guidance; private/low‑exposure options where possible</li>
                <li>• Flexible opt‑out culture; slow mornings; quiet hour daily</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="value" className="py-16 border-t border-white/10">
        <div className="section">
          <h2 className="text-3xl font-semibold">Your Investment, Maximized Value</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card">
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Lodging & ryokans — <span className="font-medium">$6,200</span></li>
                <li>• Train & transfers — <span className="font-medium">$1,000</span></li>
                <li>• Onsen & wellness experiences — <span className="font-medium">$1,500</span></li>
                <li>• Two workshops ($1,100 each) — <span className="font-medium">$2,200</span></li>
                <li>• White-glove Concierge & hosting — <span className="font-medium">$20,000</span></li>
                <li className="font-semibold mt-2 text-2xl">Estimated total value — <span className="text-brand-gold">$30,000+</span></li>
              </ul>
            </div>
            <div className="card-alt">
              <p className="text-white/80 text-sm">Launch pricing:</p>
              <div className="mt-2 text-3xl font-semibold">Tier 1 ${prices.t1.toLocaleString()} • Tier 2 ${prices.t2.toLocaleString()} • Tier 3 ${prices.t3.toLocaleString()}</div>
              <a href="#reserve" onClick={scrollToReserve} className="mt-6 inline-block btn-primary">Reserve Now</a>
            </div>
          </div>
        </div>
      </section>

      <section id="trust" className="py-16 border-t border-white/10">
        <div className="section">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card"><h3 className="font-semibold">White‑Glove Care</h3><p className="text-sm text-white/80 mt-2">From itinerary to on‑the‑ground support, you’re nurtured at every step. We carry the mental load so you can rest.</p></div>
            <div className="card"><h3 className="font-semibold">Transparent Billing</h3><p className="text-sm text-white/80 mt-2">Clear payment schedule with reminders. Optional payment plan at checkout via Podia.</p></div>
            <div className="card"><h3 className="font-semibold">Community First</h3><p className="text-sm text-white/80 mt-2">Designed for Black women’s rest, safety, and joy—with cultural care woven through everything.</p></div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 border-t border-white/10">
        <div className="section max-w-3xl">
          <h2 className="text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 space-y-3">
            <details className="card p-4"><summary className="cursor-pointer font-semibold">Can I bring a friend or my daughter?</summary><p className="text-sm text-white/80 mt-2">Yes. We offer a “pair credit” add‑on at checkout to thank you for sharing rest with your circle.</p></details>
            <details className="card p-4"><summary className="cursor-pointer font-semibold">What about Sakura‑Sakura’s 3 rooms?</summary><p className="text-sm text-white/80 mt-2">Those two nights are shared across all tiers. The rest of the journey follows your tier’s privacy level.</p></details>
            <details className="card p-4"><summary className="cursor-pointer font-semibold">Hair, skin, and onsen etiquette?</summary><p className="text-sm text-white/80 mt-2">We provide guidance, vetted suppliers, and low‑exposure options where possible, so you feel at ease and cared for.</p></details>
          </div>
        </div>
      </section>

      <section id="reserve" className="py-16 border-t border-white/10">
        <div className="section max-w-5xl">
          <div className="card p-8">
            <h2 className="text-3xl font-semibold">Reserve Your Spot</h2>
            <p className="text-white/70 mt-2">Two Kamakura nights are at Sakura‑Sakura — an intimate heritage home with only three rooms reserved entirely for our group.</p>
            <form onSubmit={submitForm} className="space-y-4 mt-6">
              <div>
                <label className="block text-sm text-white/80">Selected Tier</label>
                <select value={selectedTier} onChange={(e)=>setSelectedTier(e.target.value)} className="mt-1 w-full rounded-xl bg-black/30 border border-white/20 px-4 py-3">
                  <option value="t1">Tier 1 – Essential — ${prices.t1.toLocaleString()}</option>
                  <option value="t2">Tier 2 – Private Indulgence — ${prices.t2.toLocaleString()}</option>
                  <option value="t3">Tier 3 – VIP Sanctuary — ${prices.t3.toLocaleString()}</option>
                </select>
              </div>
              <div><label className="block text-sm text-white/80">Full Name</label>
                <input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="mt-1 w-full rounded-xl bg-black/30 border border-white/20 px-4 py-3" />
              </div>
              <div><label className="block text-sm text-white/80">Email</label>
                <input type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="mt-1 w-full rounded-xl bg-black/30 border border-white/20 px-4 py-3" />
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                <button type="submit" className="w-full btn-primary">Send Inquiry</button>
                <a href={podiaCheckoutUrl('podia_deposit_button',selectedTier)} target="_blank" rel="noreferrer" className="w-full text-center rounded-2xl border border-brand-gold text-brand-gold px-4 py-3 font-semibold hover:bg-brand-gold/10">Proceed to Secure Deposit (Podia)</a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-white/10 text-center text-white/70">
        <div className="section">
          <p>© {new Date().getFullYear()} Rest as Resistance • A Dr. Dédé Healing Journey</p>
        </div>
      </footer>
    </div>
  );
}
