'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClientOnboardingStore } from '@/lib/stores/useClientOnboardingStore';
import { signUp } from '@/lib/firebase/auth';
import { createUserProfile } from '@/lib/firebase/firestore';
import Image from 'next/image';

const TOTAL_STEPS = 5;

const ontarioCities = [
  'Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton',
  'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor',
  'Richmond Hill', 'Oakville', 'Burlington', 'Oshawa', 'Barrie',
  'Sudbury', 'Kingston', 'Guelph', 'Thunder Bay', 'Waterloo',
];

const sports = [
  'Soccer', 'Basketball', 'Tennis', 'Swimming', 'Running',
  'Cycling', 'Hockey', 'Baseball', 'Volleyball', 'Golf',
  'Martial Arts', 'Boxing', 'Cricket', 'Rugby', 'Other',
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
          Step {current} of {total}
        </span>
        <span style={{ fontSize: '0.875rem', color: 'var(--color-primary-light)', fontWeight: 700 }}>
          {Math.round((current / total) * 100)}%
        </span>
      </div>
      <div style={{ height: '6px', background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
          width: `${(current / total) * 100}%`, transition: 'width 0.4s ease'
        }} />
      </div>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.4rem' }}>{message}</p>;
}

export default function ClientOnboardingPage() {
  const router = useRouter();
  const store = useClientOnboardingStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (store.currentStep === 1 && !store.sport) e.sport = 'Please select a sport';
    if (store.currentStep === 2) {
      if (!store.trainingGoal) e.trainingGoal = 'Please select a training goal';
      if (!store.experienceLevel) e.experienceLevel = 'Please select your experience level';
    }
    if (store.currentStep === 3) {
      if (!store.city) e.city = 'Please select a city';
      if (!store.postalCode) e.postalCode = 'Please enter your postal code';
      if (!store.availability?.length) e.availability = 'Please select your availability';
    }
    if (store.currentStep === 5) {
      if (!store.firstName) e.firstName = 'First name is required';
      if (!store.lastName) e.lastName = 'Last name is required';
      if (!store.email) e.email = 'Email is required';
      if (!store.password || store.password.length < 8) e.password = 'Password must be at least 8 characters';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (store.currentStep < TOTAL_STEPS) store.nextStep();
  };

  const handleBack = () => store.prevStep();

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const cred = await signUp(store.email!, store.password!);
      await createUserProfile(cred.user.uid, {
        role: 'client',
        firstName: store.firstName!,
        lastName: store.lastName!,
        email: store.email!,
        sport: store.sport!,
        trainingGoal: store.trainingGoal as 'fitness_conditioning' | 'improve_skills' | 'competition_prep',
        experienceLevel: store.experienceLevel as 'beginner' | 'intermediate' | 'advanced',
        city: store.city!,
        postalCode: store.postalCode!,
        availability: store.availability!,
        budgetMin: store.budgetMin ?? 0,
        budgetMax: store.budgetMax ?? 60,
      } as any);
      store.reset();
      router.push('/profile');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrors({ submit: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(37,99,235,0.12) 0%, transparent 70%)'
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <Image
          src="/logo-header.png"
          width={100}
          height={100}
          alt="AppSport"
        />
      </Link>

      <div className="glass" style={{ width: '100%', maxWidth: '520px', padding: '2.5rem' }}>
        <StepIndicator current={store.currentStep} total={TOTAL_STEPS} />

        {/* Step 1 – Sport */}
        {store.currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Which sport are you looking for a coach in?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Select the sport you want to train in.</p>
            <select id="client-sport" className="input-field" style={{ appearance: 'none', cursor: 'pointer' }}
              value={store.sport ?? ''}
              onChange={e => store.setStep1({ sport: e.target.value })}>
              <option value="">Select a sport...</option>
              {sports.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <FieldError message={errors.sport} />
          </div>
        )}

        {/* Step 2 – Training Preferences */}
        {store.currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Training Preferences</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Tell us about your goals and experience.</p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.875rem', fontSize: '0.9rem' }}>TRAINING GOAL</label>
              {[
                { val: 'fitness_conditioning', label: '💪 Fitness / conditioning' },
                { val: 'improve_skills', label: '🎯 Improve skills' },
                { val: 'competition_prep', label: '🏆 Competition prep' },
              ].map(opt => (
                <label key={opt.val} id={`goal-${opt.val}`} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)', border: `1px solid ${store.trainingGoal === opt.val ? 'var(--color-primary-light)' : 'var(--color-border)'}`,
                  background: store.trainingGoal === opt.val ? 'rgba(59,130,246,0.1)' : 'transparent',
                  cursor: 'pointer', marginBottom: '0.5rem', transition: 'all 0.2s',
                }}>
                  <input type="radio" name="trainingGoal" value={opt.val} checked={store.trainingGoal === opt.val}
                    onChange={() => store.setStep2({ trainingGoal: opt.val as 'fitness_conditioning' | 'improve_skills' | 'competition_prep', experienceLevel: store.experienceLevel as 'beginner' | 'intermediate' | 'advanced' ?? 'beginner' })}
                    style={{ accentColor: 'var(--color-primary-light)' }} />
                  {opt.label}
                </label>
              ))}
              <FieldError message={errors.trainingGoal} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.875rem', fontSize: '0.9rem' }}>EXPERIENCE LEVEL</label>
              {[
                { val: 'beginner', label: '🌱 Beginner' },
                { val: 'intermediate', label: '⚡ Intermediate' },
                { val: 'advanced', label: '🔥 Advanced' },
              ].map(opt => (
                <label key={opt.val} id={`exp-${opt.val}`} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)', border: `1px solid ${store.experienceLevel === opt.val ? 'var(--color-primary-light)' : 'var(--color-border)'}`,
                  background: store.experienceLevel === opt.val ? 'rgba(59,130,246,0.1)' : 'transparent',
                  cursor: 'pointer', marginBottom: '0.5rem', transition: 'all 0.2s',
                }}>
                  <input type="radio" name="experienceLevel" value={opt.val} checked={store.experienceLevel === opt.val}
                    onChange={() => store.setStep2({ experienceLevel: opt.val as 'beginner' | 'intermediate' | 'advanced', trainingGoal: store.trainingGoal as 'fitness_conditioning' | 'improve_skills' | 'competition_prep' ?? 'fitness_conditioning' })}
                    style={{ accentColor: 'var(--color-primary-light)' }} />
                  {opt.label}
                </label>
              ))}
              <FieldError message={errors.experienceLevel} />
            </div>
          </div>
        )}

        {/* Step 3 – Location & Availability */}
        {store.currentStep === 3 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Location &amp; Availability</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Help us find coaches near you.</p>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>City</label>
              <select id="client-city" className="input-field" style={{ appearance: 'none', cursor: 'pointer' }}
                value={store.city ?? ''}
                onChange={e => store.setStep3({ city: e.target.value, postalCode: store.postalCode ?? '', availability: store.availability ?? [] })}>
                <option value="">Select your city...</option>
                {ontarioCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <FieldError message={errors.city} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Postal Code</label>
              <input id="client-postal" type="text" placeholder="M5V 3A1" className="input-field"
                value={store.postalCode ?? ''}
                onChange={e => store.setStep3({ postalCode: e.target.value, city: store.city ?? '', availability: store.availability ?? [] })} />
              <FieldError message={errors.postalCode} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.875rem', fontSize: '0.9rem' }}>AVAILABILITY</label>
              {[
                { val: 'weekdays', label: '📅 Weekdays' },
                { val: 'weekends', label: '🎉 Weekends' },
                { val: 'flexible', label: '🌀 Flexible' },
              ].map(opt => {
                const checked = store.availability?.includes(opt.val as 'weekdays' | 'weekends' | 'flexible') ?? false;
                return (
                  <label key={opt.val} id={`avail-${opt.val}`} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem',
                    borderRadius: 'var(--radius-md)', border: `1px solid ${checked ? 'var(--color-primary-light)' : 'var(--color-border)'}`,
                    background: checked ? 'rgba(59,130,246,0.1)' : 'transparent',
                    cursor: 'pointer', marginBottom: '0.5rem', transition: 'all 0.2s',
                  }}>
                    <input type="checkbox" value={opt.val} checked={checked}
                      style={{ accentColor: 'var(--color-primary-light)', width: '1rem', height: '1rem' }}
                      onChange={e => {
                        const cur = store.availability ?? [];
                        const val = opt.val as 'weekdays' | 'weekends' | 'flexible';
                        const next = e.target.checked ? [...cur, val] : cur.filter(v => v !== val);
                        store.setStep3({ availability: next, city: store.city ?? '', postalCode: store.postalCode ?? '' });
                      }} />
                    {opt.label}
                  </label>
                );
              })}
              <FieldError message={errors.availability} />
            </div>
          </div>
        )}

        {/* Step 4 – Budget (optional) */}
        {store.currentStep === 4 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Preferred Budget Range</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Per session. This step is optional — you can skip it.</p>
            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 700 }}>${store.budgetMin ?? 0}</span>
                <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>–</span>
                <span style={{ fontWeight: 700 }}>${store.budgetMax ?? 60}</span>
              </div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Min budget per session</label>
              <input id="client-budget-min" type="range" min={0} max={120} step={5}
                value={store.budgetMin ?? 0}
                onChange={e => store.setStep4({ budgetMin: Number(e.target.value), budgetMax: store.budgetMax ?? 60 })}
                style={{ width: '100%', accentColor: 'var(--color-primary-light)', marginBottom: '1.5rem' }} />
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Max budget per session</label>
              <input id="client-budget-max" type="range" min={0} max={120} step={5}
                value={store.budgetMax ?? 60}
                onChange={e => store.setStep4({ budgetMax: Number(e.target.value), budgetMin: store.budgetMin ?? 0 })}
                style={{ width: '100%', accentColor: 'var(--color-primary-light)' }} />
            </div>
          </div>
        )}

        {/* Step 5 – Account Creation */}
        {store.currentStep === 5 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create Your Account</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Almost there! Set up your login credentials.</p>
            <div style={{ display: 'flex', gap: '0.875rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>First Name</label>
                <input id="client-first-name" type="text" placeholder="Jane" className="input-field"
                  value={store.firstName ?? ''} onChange={e => store.setStep5({ ...store as { firstName: string; lastName: string; email: string; password: string }, firstName: e.target.value })} />
                <FieldError message={errors.firstName} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Last Name</label>
                <input id="client-last-name" type="text" placeholder="Smith" className="input-field"
                  value={store.lastName ?? ''} onChange={e => store.setStep5({ ...store as { firstName: string; lastName: string; email: string; password: string }, lastName: e.target.value })} />
                <FieldError message={errors.lastName} />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email</label>
              <input id="client-email" type="email" placeholder="jane@example.com" className="input-field"
                value={store.email ?? ''} onChange={e => store.setStep5({ ...store as { firstName: string; lastName: string; email: string; password: string }, email: e.target.value })} />
              <FieldError message={errors.email} />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Password</label>
              <input id="client-password" type="password" placeholder="Min. 8 characters" className="input-field"
                value={store.password ?? ''} onChange={e => store.setStep5({ ...store as { firstName: string; lastName: string; email: string; password: string }, password: e.target.value })} />
              <FieldError message={errors.password} />
            </div>
            {errors.submit && <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.75rem', textAlign: 'center' }}>{errors.submit}</p>}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '0.875rem', marginTop: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
          {store.currentStep > 1 ? (
            <button id="client-back" onClick={handleBack} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>← Back</button>
          ) : (
            <Link href="/get-started" className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>← Back</Link>
          )}

          {store.currentStep === 4 && (
            <button id="client-skip" onClick={() => store.nextStep()} className="btn-ghost">Skip</button>
          )}

          {store.currentStep < TOTAL_STEPS ? (
            <button id="client-next" onClick={handleNext} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Continue →</button>
          ) : (
            <button id="client-submit" onClick={handleSubmit} disabled={loading} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
