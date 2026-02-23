import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile – AppSport',
  description: 'View and edit your AppSport profile.',
};

export default function ProfilePage() {
  return (
    <div className="section">
      <div className="container-app" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>
          My <span className="text-gradient">Profile</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
          View and edit your profile information.
        </p>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Personal Info Card */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Personal Information</h2>
              <button className="btn-ghost" style={{ fontSize: '0.875rem' }}>Edit</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'First Name', placeholder: 'Loading...' },
                { label: 'Last Name', placeholder: 'Loading...' },
                { label: 'Email', placeholder: 'Loading...' },
                { label: 'Role', placeholder: 'Loading...' },
              ].map(field => (
                <div key={field.label}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>{field.label}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>{field.placeholder}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sport & Preferences Card */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Sport &amp; Preferences</h2>
              <button className="btn-ghost" style={{ fontSize: '0.875rem' }}>Edit</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'Sport', placeholder: '—' },
                { label: 'Experience Level', placeholder: '—' },
                { label: 'Training Goal / Focus', placeholder: '—' },
                { label: 'Availability', placeholder: '—' },
              ].map(field => (
                <div key={field.label}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>{field.label}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>{field.placeholder}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Card */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Location</h2>
              <button className="btn-ghost" style={{ fontSize: '0.875rem' }}>Edit</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[{ label: 'City', placeholder: '—' }, { label: 'Postal Code', placeholder: '—' }].map(field => (
                <div key={field.label}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>{field.label}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>{field.placeholder}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget / Pricing Card */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Budget / Pricing</h2>
              <button className="btn-ghost" style={{ fontSize: '0.875rem' }}>Edit</button>
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>Not set — connect Firebase to load your profile data.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
