import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard – AppSport',
  description: 'Your AppSport dashboard. View matches, requests, and conversations.',
};

export default function DashboardPage() {
  return (
    <div className="section">
      <div className="container-app">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>
              Your <span className="text-gradient">Dashboard</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Welcome back! Here&apos;s what&apos;s happening.</p>
          </div>
          <Link href="/profile" className="btn-secondary">View Profile</Link>
        </div>

        {/* Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🎯', label: 'Matches Found', value: '0', color: 'var(--color-primary)' },
            { icon: '📤', label: 'Sent Requests', value: '0', color: 'var(--color-secondary)' },
            { icon: '📥', label: 'Received', value: '0', color: 'var(--color-success)' },
            { icon: '💬', label: 'Active Chats', value: '0', color: 'var(--color-warning)' },
          ].map(stat => (
            <div key={stat.label} className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.35rem', fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Recommended Matches (Client) / Incoming Requests (Coach) */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recommended Matches</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', background: 'var(--color-surface-3)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>0 new</span>
            </div>
            <div style={{
              textAlign: 'center', padding: '2.5rem 1rem',
              border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Complete your profile to see matched coaches or athletes.
              </p>
              <Link href="/profile" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
                Complete Profile →
              </Link>
            </div>
          </div>

          {/* Requests */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>My Requests</h2>
              <Link href="/requests" className="btn-ghost" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>View All</Link>
            </div>
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📬</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                No requests yet. Start by exploring matches above.
              </p>
            </div>
          </div>

          {/* Active Conversations */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Active Conversations</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', background: 'var(--color-surface-3)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>Coming soon</span>
            </div>
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Messaging features coming soon. Connect with your matches!
              </p>
            </div>
          </div>

          {/* Saved / Suggested */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Saved Matches</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', background: 'var(--color-surface-3)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>0 saved</span>
            </div>
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>❤️</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Bookmark your favorite coaches or athletes here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
