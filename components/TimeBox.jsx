
export default function TimeBox({label, value}) {
  const pad = (n)=>String(n).padStart(2,'0');
  return (
    <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
      <div className="text-4xl font-bold tabular-nums">{pad(value)}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/70">{label}</div>
    </div>
  );
}
