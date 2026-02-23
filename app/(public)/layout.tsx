import type { Metadata } from 'next';
import PublicHeader from '@/components/layout/PublicHeader';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AppSport – Sports Matching Platform',
  description: 'Connecting athletes with the right coaches through intelligent matching.',
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main style={{ paddingTop: '4.5rem' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
