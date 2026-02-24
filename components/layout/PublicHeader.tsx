'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container-app">
        <nav className="flex items-center justify-between" style={{ height: '4.5rem' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-header.png"
              width={60}
              height={100}
              alt="AppSport"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#solution" className="nav-link" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
              Find Your Solution
            </Link>
            <Link href="/about" className="nav-link" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
              About Us
            </Link>
            <Link href="/contact" className="nav-link" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
              Contact Us
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="btn-ghost">Login</Link>
            <Link href="/get-started" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem' }}>
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden" style={{ padding: '1rem 0 1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/#solution" className="btn-ghost" onClick={() => setMenuOpen(false)}>Find Your Solution</Link>
            <Link href="/about" className="btn-ghost" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link href="/contact" className="btn-ghost" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            <div style={{ height: '1px', background: 'var(--color-border)', margin: '0.5rem 0' }} />
            <Link href="/login" className="btn-ghost" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link href="/get-started" className="btn-primary" style={{ width: 'fit-content' }} onClick={() => setMenuOpen(false)}>Get Started</Link>
          </div>
        )}
      </div>
    </header>
  );
}
