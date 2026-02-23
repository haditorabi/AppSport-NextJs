import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About AppSport – Bridging Athletes & Coaches',
  description: 'Learn about AppSport, a technology company dedicated to bridging the gap between players, coaches, and sport organizations using advanced matching technology.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,235,0.2) 0%, transparent 70%)',
        textAlign: 'center', paddingBottom: '3rem'
      }}>
        <div className="container-app" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
            About <span className="text-gradient">AppSport</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            AppSport is a technology company dedicated to bridging the gap between players, coaches, and sport organizations using advanced matching technology.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container-app" style={{ maxWidth: '800px' }}>
          <div className="glass" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {[
                {
                  icon: '🎯',
                  title: 'Smart Profile Matching',
                  text: 'We match individuals based on profile compatibility — analyzing sport, experience, location, availability, goals, and budget to surface the most relevant connections.',
                },
                {
                  icon: '🧠',
                  title: 'Skills & Aspirations Analysis',
                  text: 'Our platform analyzes skills and aspirations to create matches that go beyond surface-level criteria — connecting people who are truly aligned in their athletic journey.',
                },
                {
                  icon: '🗄️',
                  title: 'Smart Database Discovery',
                  text: 'A smart, database-driven discovery engine allows athletes and coaches to find each other quickly, with filters across sport type, experience level, and location.',
                },
                {
                  icon: '💪',
                  title: 'Empowering Athletes & Coaches',
                  text: 'Whether you\'re a beginner looking for your first coach or an elite athlete seeking competitive preparation, AppSport empowers both sides of the equation.',
                },
                {
                  icon: '🤝',
                  title: 'Mutually Beneficial Connections',
                  text: 'We create mutually beneficial connections — where athletes grow, coaches thrive, and the sports community flourishes as a whole.',
                },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '2rem', flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
