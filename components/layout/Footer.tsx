import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-border)', padding: '3rem 0 2rem' }}>
      <div className="container-app">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
              <div style={{
                width: '1.75rem', height: '1.75rem', borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '0.9rem', color: 'white'
              }}>A</div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>App<span className="text-gradient">Sport</span></span>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '22ch' }}>
              Connecting athletes with the right coaches through intelligent matching.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/about" className="nav-link" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>About</Link>
              <Link href="/contact" className="nav-link" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Contact</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/privacy" className="nav-link" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Privacy Policy</Link>
              <Link href="/terms" className="nav-link" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Terms of Service</Link>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Get Started</h4>
            <Link href="/get-started" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.2rem' }}>
              Join AppSport
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            &copy; {year} AppSport. All rights reserved.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            Built for athletes &amp; coaches worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
