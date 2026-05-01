export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="rule" style={{marginBottom: 32}}/>
        <div className="footer-grid">
          <div>
            <div className="footer-mark">Quant Lab — DX School 6</div>
            <div style={{marginTop: 6}} className="mono">© 2026 · Internal Society Site</div>
          </div>
          <div style={{display:'flex', gap: 32}}>
            <span className="mono">v 1.0.4</span>
            <span className="mono">last updated · 2026.04.28</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
