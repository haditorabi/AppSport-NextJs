'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/firebase/auth';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import Image from 'next/image';

export default function AppHeader() {
  const router = useRouter();
  const clearUser = useAuthStore((s) => s.clearUser);

  const handleLogout = async () => {
    await signOut();
    clearUser();
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container-app">
        <nav className="flex items-center justify-between" style={{ height: '4.5rem' }}>
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo-header.png"
              width={50}
              height={100}
              alt="AppSport"
            />
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-2">
            <Link href="/requests" className="btn-ghost">My Requests</Link>
            <Link href="/profile" className="btn-ghost">Profile</Link>
            <button
              id="logout-btn"
              onClick={handleLogout}
              className="btn-secondary"
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.875rem' }}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
