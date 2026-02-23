import type { Metadata } from 'next';
import PublicHeader from '@/components/layout/PublicHeader';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AppSport – Unleash Your Potential',
  description: 'Athletes and coaches come together on AppSport, fostering connections and finding opportunities to reach the next level.',
};

const features = [
  { icon: '🎯', title: 'Personalized Matchmaking', desc: 'AI-driven matching based on sport, goals, location, and budget.' },
  { icon: '💬', title: 'Streamlined Communication', desc: 'Connect directly with coaches or athletes through our platform.' },
  { icon: '📊', title: 'Powerful Analytics', desc: 'Track your performance and growth with detailed insights.' },
  { icon: '🏆', title: 'Performance Tracking', desc: 'Monitor progress and celebrate milestones along your journey.' },
  { icon: '🔍', title: 'Talent Identification', desc: 'Coaches discover promising athletes ready to level up.' },
  { icon: '📱', title: 'Mobile Optimization', desc: 'Seamless experience across all devices, anytime anywhere.' },
];

const community = [
  { icon: '💰', title: 'Fundraising Support', desc: 'Get the resources you need to reach your goals.' },
  { icon: '🤝', title: 'Inclusive Sports Community', desc: 'A welcoming space for athletes of all backgrounds.' },
  { icon: '📈', title: 'Data-Driven Insights', desc: 'Make informed decisions powered by deep analytics.' },
  { icon: '📲', title: 'Social Media Integration', desc: 'Share your journey and inspire others.' },
  { icon: '🎓', title: 'Simplified Recruiting', desc: 'Streamlined process from discovery to partnership.' },
  { icon: '✨', title: 'Endless Possibilities', desc: 'The platform grows with your ambitions.' },
];

const steps = [
  { num: '01', title: 'Build your profile', desc: 'Share your sport, goals, experience, and availability to get started.' },
  { num: '02', title: 'Build your network', desc: 'Connect with athletes and coaches who match your vision.' },
  { num: '03', title: 'Explore opportunities', desc: 'Browse curated matches tailored specifically for you.' },
  { num: '04', title: 'Connect and engage', desc: 'Start conversations and take your performance to the next level.' },
];

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main style={{ paddingTop: '4.5rem' }}>
        {/* ── Hero Section ── */}
        <section style={{
          padding: '5rem 0',
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.25) 0%, transparent 70%)',
          minHeight: '90vh', display: 'flex', alignItems: 'center'
        }}>
          <div className="container-app" style={{ textAlign: 'center' }}>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem',
                background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: 'var(--radius-full)', fontSize: '0.85rem', color: 'var(--color-primary-light)',
                fontWeight: 600, marginBottom: '2rem'
              }}>
                ⚡ The Future of Sports Matching
              </span>
            </div>
            <h1 className="animate-fade-in-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.5rem', animationDelay: '0.2s' }}>
              Unleash Your Potential.<br />
              <span className="text-gradient">Join the AppSport Community</span> Today!
            </h1>
            <p className="animate-fade-in-up" style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--color-text-muted)',
              maxWidth: '55ch', margin: '0 auto 2.5rem', lineHeight: 1.7, animationDelay: '0.3s'
            }}>
              Athletes and coaches come together on AppSport, fostering connections and finding opportunities to reach the next level.
            </p>
            <div className="animate-fade-in-up" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', animationDelay: '0.4s' }}>
              <Link href="/get-started" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.9rem 2.2rem' }}>
                Join Now →
              </Link>
              <Link href="#solution" className="btn-secondary" style={{ fontSize: '1.05rem', padding: '0.9rem 2.2rem' }}>
                Find Your Solution
              </Link>
            </div>
            {/* Stats */}
            <div className="animate-fade-in-up" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '4rem', flexWrap: 'wrap', animationDelay: '0.5s' }}>
              {[{ val: '10K+', label: 'Athletes' }, { val: '2K+', label: 'Coaches' }, { val: '50+', label: 'Sports' }].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.val}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Find Your Solution ── */}
        <section id="solution" style={{ padding: '5rem 0', background: 'var(--color-surface-2)' }}>
          <div className="container-app">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>Find Your Solution</h2>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '45ch', margin: '0 auto' }}>Choose your path and let us connect you with the perfect match.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
              {[
                { icon: '🏃', title: 'For Athletes', desc: 'Find the perfect coach tailored just for you.', href: '/get-started?role=client', cta: 'Find a Coach' },
                { icon: '🎓', title: 'For Coaches', desc: 'Discover all the players you need to complete your dream team.', href: '/get-started?role=coach', cta: 'Find Athletes' },
              ].map(card => (
                <div key={card.title} className="glass" style={{ padding: '2.5rem 2rem', textAlign: 'center', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{card.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{card.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.75rem', lineHeight: 1.7 }}>{card.desc}</p>
                  <Link href={card.href} className="btn-primary">{card.cta} →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why AppSport ── */}
        <section style={{ padding: '5rem 0' }}>
          <div className="container-app">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>Why AppSport?</h2>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '45ch', margin: '0 auto' }}>A simple 4-step journey to transform your athletic career.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {steps.map((step, i) => (
                <div key={step.num} className="glass" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-0.5rem', right: '1rem', fontSize: '4rem', fontWeight: 900, color: 'rgba(37,99,235,0.1)', lineHeight: 1, userSelect: 'none' }}>{step.num}</div>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, marginBottom: '1rem' }}>{i + 1}</div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.6rem' }}>{step.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Features ── */}
        <section style={{ padding: '5rem 0', background: 'var(--color-surface-2)' }}>
          <div className="container-app">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
                Everything You <span className="text-gradient">Need to Succeed</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {features.map(f => (
                <div key={f.title} className="glass" style={{ padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '2rem', flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{f.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Community ── */}
        <section style={{ padding: '5rem 0' }}>
          <div className="container-app">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
                Community &amp; <span className="text-gradient">Growth</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {community.map(c => (
                <div key={c.title} className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.75rem', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.3rem' }}>{c.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Waitlist ── */}
        <section style={{ padding: '5rem 0', background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%), var(--color-surface-2)' }}>
          <div className="container-app" style={{ maxWidth: '580px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              Join the <span className="text-gradient">Network</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
              Be the first to experience the future of sports matching. Sign up for early access.
            </p>
            <form id="waitlist-form" style={{ textAlign: 'left' }} className="glass" action="#" method="POST">
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="waitlist-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Full Name</label>
                  <input id="waitlist-name" name="fullName" type="text" required placeholder="Jane Smith" className="input-field" />
                </div>
                <div>
                  <label htmlFor="waitlist-email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address</label>
                  <input id="waitlist-email" name="email" type="email" required placeholder="jane@example.com" className="input-field" />
                </div>
                <div>
                  <label htmlFor="waitlist-role" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>I am a...</label>
                  <select id="waitlist-role" name="role" required className="input-field" style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="">Select your role</option>
                    <option value="athlete">🏃 Athlete</option>
                    <option value="coach">🎓 Coach</option>
                    <option value="team">👥 Team</option>
                  </select>
                </div>
                <button type="submit" id="waitlist-submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.9rem' }}>
                  Join Early Access →
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
