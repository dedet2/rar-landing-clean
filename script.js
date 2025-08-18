
// Countdown + spots + Stripe routing
const countdownTarget = new Date('2025-09-15T00:00:00-07:00');
let spotsRemaining = 5;

function updateCountdown(){
  const now=new Date();
  const diff=countdownTarget-now;
  const ids=['days','hours','minutes','seconds'];
  const els=ids.map(id=>document.getElementById(id));
  if(!els[0]) return;
  if(diff<=0){els.forEach((el,i)=>{el.textContent='00'});return;}
  const totalSeconds=Math.floor(diff/1000);
  const d=Math.floor(totalSeconds/86400);
  const h=Math.floor((totalSeconds%86400)/3600);
  const m=Math.floor((totalSeconds%3600)/60);
  const s=totalSeconds%60;
  document.getElementById('days').textContent=String(d).padStart(2,'0');
  document.getElementById('hours').textContent=String(h).padStart(2,'0');
  document.getElementById('minutes').textContent=String(m).padStart(2,'0');
  document.getElementById('seconds').textContent=String(s).padStart(2,'0');
}

function updateSpots(){
  const el=document.getElementById('spots-left');
  if(el) el.textContent=spotsRemaining;
}

document.addEventListener('DOMContentLoaded',()=>{
  updateCountdown(); setInterval(updateCountdown,1000);
  updateSpots();
  const payBtn=document.getElementById('payment-button');
  const select=document.getElementById('journey-select');
  const links={
    journey1:'https://buy.stripe.com/00wfZh2uq8jH6GG3GV7kc01',
    journey2:'https://buy.stripe.com/aFaaEX5GCdE14yy4KZ7kc03',
    journey3:'https://buy.stripe.com/fZucN53yu0Rf0ii6T77kc05'
  };
  if(payBtn && select){
    payBtn.addEventListener('click',()=>{
      const url=links[select.value];
      if(url) window.open(url,'_blank');
    });
  }
});
