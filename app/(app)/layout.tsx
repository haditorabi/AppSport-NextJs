import type { Metadata } from 'next';
import AppHeader from '@/components/layout/AppHeader';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AppSport – Dashboard',
  description: 'Your AppSport dashboard.',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main style={{ paddingTop: '4.5rem', minHeight: 'calc(100vh - 280px)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
