const reasons = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
      </svg>
    ),
    title: "Ücretsiz Keşif",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Hızlı Teslimat",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "10+ Yıl Tecrübe",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Güvenilir Fiyat",
  },
];

export default function WhyUs() {
  return (
    <section className="py-28 px-5 lg:px-10" id="neden-biz">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[520px] mb-14">
          <div className="text-[11px] text-accent font-bold tracking-[3px] uppercase mb-3 flex items-center gap-2">
            <div className="w-6 h-px bg-accent/30" />
            Neden Biz?
          </div>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] text-white font-bold leading-[1.1] tracking-tight">
            Binlerce müşterinin
            <br />
            güvendiği firma
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group glass rounded-2xl p-8 hover:border-accent/15 transition-all duration-500 text-center"
            >
              <div className="w-14 h-14 bg-accent/[0.06] border border-accent/[0.1] rounded-xl flex items-center justify-center text-accent/50 group-hover:text-accent group-hover:border-accent/20 group-hover:bg-accent/[0.1] transition-all duration-500 mx-auto mb-5">
                {r.icon}
              </div>
              <div className="text-[15px] font-bold text-white tracking-tight">
                {r.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
