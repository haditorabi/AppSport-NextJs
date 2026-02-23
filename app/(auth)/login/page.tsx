import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login – AppSport',
  description: 'Sign in to your AppSport account.',
};

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(37,99,235,0.12) 0%, transparent 70%)'
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
        <div style={{
          width: '2.2rem', height: '2.2rem', borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white'
        }}>A</div>
        <span style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.03em' }}>
          App<span className="text-gradient">Sport</span>
        </span>
      </Link>

      <div className="glass" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome back</h1>
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Sign in to your AppSport account
        </p>

        <form id="login-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email</label>
            <input id="login-email" name="email" type="email" required placeholder="you@example.com" className="input-field" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Password</label>
            <input id="login-password" name="password" type="password" required placeholder="••••••••" className="input-field" />
          </div>
          <button type="submit" id="login-submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Don&apos;t have an account?{' '}
          <Link href="/get-started" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
}
