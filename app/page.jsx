
'use client';
import { useEffect, useMemo, useState } from 'react';
import TimeBox from '../components/TimeBox';

const CAMPAIGN = 'rar_earlybird_2025';
const HERO_URL = 'https://source.unsplash.com/1600x900/?kamakura,shonan,coast,japan';
const GALLERY = [
  { alt:'Kamakura coast', url:'https://source.unsplash.com/1000x700/?kamakura,coast,japan' },
  { alt:'Beppu onsen steam', url:'https://source.unsplash.com/1000x700/?beppu,onsen,steam,japan' },
  { alt:'Miyajima torii', url:'https://source.unsplash.com/1000x700/?miyajima,torii,japan' },
];

function withUTM(url, {source='website', medium='site', content='primary_cta'}={}) {
  const base = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || 'https://rar-landing.vercel.app');
  const u = new URL(url, base);
  u.searchParams.set('utm_source', source);
  u.searchParams.set('utm_medium', medium);
  u.searchParams.set('utm_campaign', CAMPAIGN);
  u.searchParams.set('utm_content', content);
  return u.toString();
}

function podiaCheckoutUrl(content='podia_deposit', tierKey) {
  const base = process.env.NEXT_PUBLIC_PODIA_BASE_URL || '#';
  try {
    const u = new URL(base);
    u.searchParams.set('utm_source','website');
    u.searchParams.set('utm_medium','site');
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

export default function Page() {
  const earlyBirdEnd = useMemo(() => new Date('2025-09-16T06:59:59.000Z'), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(earlyBirdEnd));
  useEffect(() => { const id = setInterval(()=>setTimeLeft(getTimeLeft(earlyBirdEnd)),1000); return ()=>clearInterval(id); }, [earlyBirdEnd]);

  const prices = { t1: 7600, t2: 10100, t3: 12400 };
  const [selectedTier, setSelectedTier] = useState('t2');
  const [form, setForm] = useState({ name:'', email:'' });

  const [heroOk, setHeroOk] = useState(true);
  const [galleryOk, setGalleryOk] = useState([true,true,true]);

  async function submitForm(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/inquiry', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...form, tier: selectedTier })
      });
      if (!res.ok) throw new Error('Network');
      alert('Thanks! We received your inquiry and will email you shortly.');
    } catch {
      const subject = encodeURIComponent('RAR Japan Inquiry — '+selectedTier);
      const body = encodeURIComponent('Name: '+form.name+'\nEmail: '+form.email);
      const email = (process.env.EMAIL_CONTACT || 'info@incluu.us');
      window.location.href = 'mailto:'+email+'?subject='+subject+'&body='+body;
    }
  }

  const selectTier = (tier)=> (e)=>{ e?.preventDefault?.(); setSelectedTier(tier); document.getElementById('reserve')?.scrollIntoView({behavior:'smooth'}); };

  return (
    <div className="min-h-screen w-full">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          {heroOk ? (
            <img src={HERO_URL} onError={()=>setHeroOk(false)} className="hero-image" alt="Kamakura / Shōnan coast" />
          ) : (
            <div className="hero-image" style={{background:'linear-gradient(180deg, #2a1850 0%, #154137 60%, #b88746 100%)'}} />
          )}
        </div>
        <div className="relative section py-16 md:py-24">
          <p className="uppercase tracking-widest text-xs text-white/80">Dec 8–17, 2025 • Tokyo • Kamakura • Beppu • Miyajima</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-[1.1]">Rest as Resistance
            <span className="block text-white/90">A Luxury Healing Journey in Japan</span>
          </h1>
          <p className="mt-6 text-white/85 max-w-3xl">
            For Black women reclaiming rest as a right. Slow mornings, onsen rituals, forest bathing, and ryokan care—crafted for deep restoration, community, and liberation.
          </p>
          <div className="mt-6 text-sm text-white/80 space-x-3">
            <span className="badge"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> Only 6 client spots</span>
            <span className="badge"><span className="inline-block h-2 w-2 rounded-full bg-brand-gold" /> White‑glove concierge</span>
            <span className="badge"><span className="inline-block h-2 w-2 rounded-full bg-blue-400" /> Early‑Bird live</span>
          </div>
        </div>
      </section>

      <section className="py-6 border-y border-white/10 bg-white/5">
        <div className="section flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm"><span className="font-semibold">Early‑Bird</span> — lock your rate while spots last.</div>
          <div className="flex gap-3 text-center">
            <TimeBox label="Days" value={timeLeft.days} />
            <TimeBox label="Hours" value={timeLeft.hours} />
            <TimeBox label="Minutes" value={timeLeft.minutes} />
            <TimeBox label="Seconds" value={timeLeft.seconds} />
          </div>
        </div>
      </section>

      <section id="tiers" className="py-12">
        <div className="section">
          <div className="flex items-end justify-between gap-6 mb-8">
            <h2 className="text-3xl font-semibold">Choose Your Tier</h2>
            <p className="text-white/80">Dec 8–17, 2025 • 6–8 guests + 2 hosts</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="tier-card" style={{background:'linear-gradient(180deg, rgba(52,32,77,.5), rgba(18,59,49,.45), rgba(184,135,70,.4))'}}>
              <div className="text-sm uppercase tracking-widest text-white/80">Tier 1</div>
              <div className="mt-1 text-2xl font-semibold">Essential</div>
              <div className="mt-3 text-4xl font-bold">${prices.t1.toLocaleString()} <span className="text-sm font-medium text-white/70">pp</span></div>
              <ul className="mt-4 space-y-2 text-sm text-white/90">
                <li>• Boutique hotels + ryokans (shared at Sakura‑Sakura)</li>
                <li>• Onsen rituals in Shichirigahama & Beppu</li>
                <li>• Iwaso Ryokan stay on Miyajima</li>
                <li>• Two live workshops designed for Black women</li>
                <li>• Concierge messaging & luggage forwarding</li>
              </ul>
              <a href="#reserve" onClick={selectTier('t1')} className="tier-cta tier-cta-primary mt-6 block">Inquiry</a>
              <a href={podiaCheckoutUrl('deposit','t1')} target="_blank" rel="noreferrer" className="tier-cta tier-cta-outline mt-2 block">Pay Deposit</a>
            </div>

            <div className="tier-card" style={{background:'linear-gradient(180deg, rgba(52,32,77,.55), rgba(18,59,49,.5), rgba(184,135,70,.45))'}}>
              <div className="text-sm uppercase tracking-widest text-white/80">Tier 2</div>
              <div className="mt-1 text-2xl font-semibold">Private Indulgence</div>
              <div className="mt-3 text-4xl font-bold">${prices.t2.toLocaleString()} <span className="text-sm font-medium text-white/70">pp</span></div>
              <ul className="mt-4 space-y-2 text-sm text-white/90">
                <li>• All Tier 1 inclusions</li>
                <li>• More private rooming where available*</li>
                <li>• Premium dining curation & hosted tea ceremony</li>
                <li>• Priority spa scheduling</li>
              </ul>
              <div className="text-xs text-white/70 mt-2">*Sakura‑Sakura has 3 rooms for our group; those nights are shared across all tiers.</div>
              <a href="#reserve" onClick={selectTier('t2')} className="tier-cta tier-cta-primary mt-6 block">Inquiry</a>
              <a href={podiaCheckoutUrl('deposit','t2')} target="_blank" rel="noreferrer" className="tier-cta tier-cta-outline mt-2 block">Pay Deposit</a>
            </div>

            <div className="tier-card" style={{background:'linear-gradient(180deg, rgba(52,32,77,.6), rgba(18,59,49,.55), rgba(184,135,70,.5))'}}>
              <div className="text-sm uppercase tracking-widest text-white/80">Tier 3</div>
              <div className="mt-1 text-2xl font-semibold">VIP Sanctuary</div>
              <div className="mt-3 text-4xl font-bold">${prices.t3.toLocaleString()} <span className="text-sm font-medium text-white/70">pp</span></div>
              <ul className="mt-4 space-y-2 text-sm text-white/90">
                <li>• All Tier 2 inclusions</li>
                <li>• Best‑available rooms throughout the journey*</li>
                <li>• VIP welcome & departure amenities</li>
                <li>• Optional luxury culinary night (add‑on)</li>
              </ul>
              <a href="#reserve" onClick={selectTier('t3')} className="tier-cta tier-cta-primary mt-6 block">Inquiry</a>
              <a href={podiaCheckoutUrl('deposit','t3')} target="_blank" rel="noreferrer" className="tier-cta tier-cta-outline mt-2 block">Pay Deposit</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section py-6">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { alt:'Kamakura coast', url:'https://source.unsplash.com/1000x700/?kamakura,coast,japan' },
            { alt:'Beppu onsen steam', url:'https://source.unsplash.com/1000x700/?beppu,onsen,steam,japan' },
            { alt:'Miyajima torii', url:'https://source.unsplash.com/1000x700/?miyajima,torii,japan' }
          ].map((g,i)=> (
            <div key={g.alt}>
              {galleryOk[i] ? (
                <img src={g.url} alt={g.alt} className="gallery-img" onError={()=>setGalleryOk(prev=>{const n=[...prev]; n[i]=false; return n;})} />
              ) : (
                <div className="gallery-img" style={{background:'linear-gradient(180deg, #34204d 0%, #154137 60%, #b88746 100%)', display:'grid', placeItems:'center'}}>
                  <span className="text-xs text-white/70">{g.alt} — fallback</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 border-t border-white/10">
        <div className="section">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h3 className="font-semibold">Itinerary Highlights</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/90">
                <li><b>Days 1–2 • Tokyo Arrival & Intention Setting</b><br/>Evening arrival, gentle start, slow morning. Intention‑setting circle and restorative dinner.</li>
                <li><b>Days 3–4 • Kamakura — Open House Sakura‑Sakura</b><br/>Private 3‑room heritage home booked entirely for our group. Shichirigahama onsen ritual & forest bathing.</li>
                <li><b>Day 5–6 • Beppu Hot Springs</b><br/>Onsen capital. Sand baths, mud baths, and a complimentary 60‑min treatment.</li>
                <li><b>Days 7–8 • Miyajima — Iwaso Ryokan</b><br/>Iconic island, torii gate views, multi‑course kaiseki. Deep rest with caretaking hospitality.</li>
                <li><b>Days 9–10 • Return Tokyo & Depart</b><br/>Integration time, optional shopping, depart for U.S.</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="font-semibold">Workshops: Rest as Resistance</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/90">
                <li>• Workshop 1: The Politics & Practice of Rest — $1,000 value</li>
                <li>• Workshop 2: Embodied Stillness & Care — $1,000 value</li>
              </ul>
              <h3 className="font-semibold mt-6">What’s Included</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/90">
                <li>• Hotels & traditional ryokans (shared at Sakura‑Sakura)</li>
                <li>• All intercity transport + luggage forwarding</li>
                <li>• Onsen experiences in Shichirigahama & Beppu</li>
                <li>• Iwaso Ryokan stay on Miyajima</li>
                <li>• White‑glove concierge & host team</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-white/10">
        <div className="section">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h2 className="text-2xl font-semibold">Your Investment, Maximized Value</h2>
              <ul className="mt-4 space-y-2 text-white/90 text-sm">
                <li>• Lodging & ryokans — <span className="font-medium">$6,200</span></li>
                <li>• Train & transfers — <span className="font-medium">$1,000</span></li>
                <li>• Onsen & wellness experiences — <span className="font-medium">$1,500</span></li>
                <li>• Two workshops ($1,100 each) — <span className="font-medium">$2,200</span></li>
                <li>• White‑glove Concierge & hosting — <span className="font-medium">$20,000</span></li>
                <li className="font-semibold mt-2 text-2xl">Estimated total value — <span className="text-brand-gold">$30,000+</span></li>
              </ul>
            </div>
            <div className="card">
              <h3 className="font-semibold">Launch pricing:</h3>
              <ul className="mt-2 space-y-2 text-white/90">
                <li>• Tier 1 — ${prices.t1.toLocaleString()}</li>
                <li>• Tier 2 — ${prices.t2.toLocaleString()}</li>
                <li>• Tier 3 — ${prices.t3.toLocaleString()}</li>
              </ul>
              <a href="#reserve" className="btn-primary inline-block mt-6">Reserve Now</a>
            </div>
          </div>
        </div>
      </section>

      <section id="reserve" className="py-12 border-t border-white/10">
        <div className="section max-w-5xl">
          <div className="card p-8">
            <h2 className="text-3xl font-semibold">Reserve Your Spot</h2>
            <p className="text-white/80 mt-2">Two Kamakura nights are at Sakura‑Sakura — an intimate heritage home with only three rooms reserved entirely for our group.</p>
            <form onSubmit={submitForm} className="space-y-4 mt-6">
              <div>
                <label className="block text-sm text-white/80">Selected Tier</label>
                <select value={selectedTier} onChange={(e)=>setSelectedTier(e.target.value)} className="mt-1 w-full rounded-xl bg-black/30 border border-white/20 px-4 py-3">
                  <option value="t1">Tier 1 – Essential — ${prices.t1.toLocaleString()}</option>
                  <option value="t2">Tier 2 – Private Indulgence — ${prices.t2.toLocaleString()}</option>
                  <option value="t3">Tier 3 – VIP Sanctuary — ${prices.t3.toLocaleString()}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/80">Full Name</label>
                <input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="mt-1 w-full rounded-xl bg-black/30 border border-white/20 px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm text-white/80">Email</label>
                <input type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="mt-1 w-full rounded-xl bg-black/30 border border-white/20 px-4 py-3" />
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                <button type="submit" className="w-full btn-primary">Send Inquiry</button>
                <a href={podiaCheckoutUrl('deposit',selectedTier)} target="_blank" rel="noreferrer" className="w-full text-center rounded-2xl border border-white/40 text-white px-4 py-3 font-semibold hover:bg-white/10">Proceed to Secure Deposit (Podia)</a>
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
