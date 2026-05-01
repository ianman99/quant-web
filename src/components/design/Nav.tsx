import { ThemeToggle } from './ThemeToggle';
import { AuthButton } from '../auth/AuthButton';

interface NavProps {
  active: 'home' | 'community';
  onNavigate: (hash: string) => void;
}

export function Nav({ active, onNavigate }: NavProps) {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <button onClick={() => onNavigate('')} className="nav-brand">
          <span className="nav-brand-mark">Quant Lab</span>
          <span className="nav-brand-sub mono">DX SCHOOL · 6th</span>
        </button>
        <div className="nav-links">
          <button 
            onClick={() => onNavigate('')} 
            className={"nav-link " + (active === 'home' ? 'active' : '')}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('community')} 
            className={"nav-link " + (active === 'community' ? 'active' : '')}
          >
            Community
          </button>
          <div style={{ marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <AuthButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
