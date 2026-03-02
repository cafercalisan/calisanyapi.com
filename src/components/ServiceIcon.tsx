const icons: Record<string, React.ReactNode> = {
  sineklik: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  ),
  "cam-balkon": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M6 8l2 2-2 2" />
    </svg>
  ),
  pimapen: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  dusakabin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v16h16" />
      <line x1="4" y1="4" x2="20" y2="20" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" />
      <circle cx="8" cy="10" r="0.5" fill="currentColor" />
      <circle cx="10" cy="6" r="0.5" fill="currentColor" />
      <path d="M20 12v8" />
      <circle cx="17" cy="17" r="1" />
    </svg>
  ),
  "cam-kapi": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <rect x="7" y="5" width="10" height="14" rx="1" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  "aluminyum-dograma": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="1" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <rect x="4" y="5" width="6" height="6" rx="0.5" />
      <rect x="14" y="5" width="6" height="6" rx="0.5" />
      <rect x="4" y="13" width="6" height="6" rx="0.5" />
      <rect x="14" y="13" width="6" height="6" rx="0.5" />
    </svg>
  ),
  kepenk: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="11" x2="21" y2="11" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="3" y1="19" x2="21" y2="19" />
      <path d="M10 15l2 2 2-2" />
    </svg>
  ),
  "akordiyon-kapi": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16" />
      <path d="M2 4l5 2v12l-5 2" />
      <path d="M7 6l5-2v16l-5-2" />
      <path d="M12 4l5 2v12l-5 2" />
      <path d="M17 6l5-2v16l-5-2" />
    </svg>
  ),
  "aluminyum-kupeste": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="6" y1="8" x2="6" y2="20" />
      <line x1="12" y1="8" x2="12" y2="20" />
      <line x1="18" y1="8" x2="18" y2="20" />
      <line x1="2" y1="20" x2="22" y2="20" />
      <circle cx="6" cy="6" r="2" />
    </svg>
  ),
  panjur: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="5" y1="10" x2="19" y2="10" />
      <line x1="5" y1="13" x2="19" y2="13" />
      <line x1="5" y1="16" x2="19" y2="16" />
    </svg>
  ),
};

export default function ServiceIcon({
  slug,
  size = 24,
  className = "",
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const icon = icons[slug];
  if (!icon) return null;
  return (
    <div className={className} style={{ width: size, height: size }}>
      {icon}
    </div>
  );
}
