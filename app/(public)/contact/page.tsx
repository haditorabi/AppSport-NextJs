import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact AppSport – Get in Touch',
  description: 'Contact the AppSport team. We are here to help athletes and coaches connect with support.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,235,0.2) 0%, transparent 70%)',
        textAlign: 'center', paddingBottom: '3rem'
      }}>
        <div className="container-app">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
            Contact <span className="text-gradient">AppSport</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
            Have a question? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container-app" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Contact Info */}
            <div className="glass" style={{ padding: '2.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1.75rem' }}>Get In Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>📞</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Phone</div>
                    <a href="tel:+16473001234" style={{ color: 'var(--color-text)', fontWeight: 500, transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary-light)'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)'}
                    >+1 (647) 300-1234</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>✉️</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Email</div>
                    <a href="mailto:hello@appsport.io" style={{ color: 'var(--color-text)', fontWeight: 500, transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary-light)'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)'}
                    >hello@appsport.io</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>🛟</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Support</div>
                    <p style={{ color: 'var(--color-text)', fontWeight: 500, margin: 0 }}>Available Mon–Fri, 9am–6pm ET</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass" style={{ padding: '2.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1.75rem' }}>Send a Message</h2>
              <form id="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Name</label>
                  <input id="contact-name" name="name" type="text" required placeholder="Your name" className="input-field" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email</label>
                  <input id="contact-email" name="email" type="email" required placeholder="your@email.com" className="input-field" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Message</label>
                  <textarea
                    id="contact-message" name="message" required
                    placeholder="How can we help you?"
                    rows={4}
                    className="input-field"
                    style={{ resize: 'vertical', minHeight: '8rem' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}>
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
