import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AppSport – Get Started',
  description: 'Create your account and find the right coach or athlete.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {children}
    </main>
  );
}
