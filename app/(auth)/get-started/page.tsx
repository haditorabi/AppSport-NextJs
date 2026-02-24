import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image'

import './page.css';

export const metadata: Metadata = {
  title: 'Get Started – AppSport',
  description: 'Connecting athletes with the right coaches. Choose your role and begin your journey.',
};

export default function GetStartedPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(37,99,235,0.15) 0%, transparent 70%)'
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '3rem' }}>
        <Image
          src="/logo-header.png"
          width={200}
          height={200}
          alt="AppSport"
        />
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '50ch' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
          Connecting athletes with the right coaches
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Find, connect, and chat with coaches that match your goals. Get started by choosing your role.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '680px' }}>
        {[
          {
            id: 'client-card',
            icon: '🏃',
            title: "I'm a Client",
            desc: 'I\'m an athlete looking for a professional coach to help me reach my goals.',
            href: '/onboarding/client',
            gradient: 'linear-gradient(135deg, rgba(37,99,235,0.8), rgba(29,78,216,0.9))',
          },
          {
            id: 'coach-card',
            icon: '🎓',
            title: "I'm a Coach",
            desc: 'I\'m a coach looking to find and connect with athletes who need my expertise.',
            href: '/onboarding/coach',
            gradient: 'linear-gradient(135deg, rgba(249,115,22,0.8), rgba(234,88,12,0.9))',
          },
        ].map(card => (
          <Link
            key={card.id}
            id={card.id}
            href={card.href}
            className="glass onboarding-card"
            style={{
              padding: '2.5rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              display: 'block',
              textDecoration: 'none',
            }}
          // onMouseEnter={e => {
          //   const el = e.currentTarget as HTMLAnchorElement;
          //   el.style.transform = 'translateY(-4px)';
          //   el.style.boxShadow = '0 20px 40px rgba(37,99,235,0.25)';
          // }}
          // onMouseLeave={e => {
          //   const el = e.currentTarget as HTMLAnchorElement;
          //   el.style.transform = 'translateY(0)';
          //   el.style.boxShadow = '';
          // }}
          >
            <div style={{
              width: '5rem', height: '5rem', borderRadius: '50%',
              background: card.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem', margin: '0 auto 1.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}>
              {card.icon}
            </div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{card.title}</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{card.desc}</p>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: '2.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: 'var(--color-primary-light)', fontWeight: 600, transition: 'opacity 0.2s' }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
