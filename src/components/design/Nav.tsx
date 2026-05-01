import { ThemeToggle } from './ThemeToggle';
import { AuthButton } from '../auth/AuthButton';

interface NavProps {
  active: 'home' | 'community';
  onNavigate: (hash: string) => void;
}

export function Nav({ active, onNavigate }: NavProps) {
  return (
    <nav className="nav">
      <div className="wrap nav-inner" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
        <button onClick={() => onNavigate('')} className="nav-brand" style={{ justifySelf: 'start' }}>
          <span className="nav-brand-mark">Quant Club</span>
        </button>

        <div className="nav-links" style={{ justifySelf: 'center' }}>
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
        </div>

        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <AuthButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
