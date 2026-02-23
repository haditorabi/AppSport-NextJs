import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/layout/AuthProvider';

export const metadata: Metadata = {
  title: 'AppSport – Sports Matching Platform',
  description: 'Connecting athletes with the right coaches through intelligent matching. Build your profile, grow your network, and find the perfect match.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
