import { useThemeStore } from '../../store/themeStore';

export function ThemeToggle() {
  const { theme, toggle } = useThemeStore();

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <span className="theme-toggle-thumb">
        <svg className="theme-toggle-icon sun-icon" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3" fill="currentColor"/>
          {[0,1,2,3,4,5,6,7].map(i => {
            const a = (i * Math.PI) / 4;
            const x1 = 8 + Math.cos(a) * 5;
            const y1 = 8 + Math.sin(a) * 5;
            const x2 = 8 + Math.cos(a) * 6.8;
            const y2 = 8 + Math.sin(a) * 6.8;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>;
          })}
        </svg>
        <svg className="theme-toggle-icon moon-icon" viewBox="0 0 16 16" fill="none">
          <path d="M11.5 9.5 A4 4 0 1 1 7.5 4 a3 3 0 0 0 4 5.5z" fill="currentColor"/>
        </svg>
      </span>
    </button>
  );
}
