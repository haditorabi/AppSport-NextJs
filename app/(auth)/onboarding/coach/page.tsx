'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCoachOnboardingStore } from '@/lib/stores/useCoachOnboardingStore';
import { signUp } from '@/lib/firebase/auth';
import { createUserProfile } from '@/lib/firebase/firestore';

const TOTAL_STEPS = 8;

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
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Step {current} of {total}</span>
        <span style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', fontWeight: 700 }}>{Math.round((current / total) * 100)}%</span>
      </div>
      <div style={{ height: '6px', background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(90deg, var(--color-secondary-dark), var(--color-secondary))',
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

type CoachingFocusValue = 'skill_improvement' | 'competitive_prep' | 'fitness_conditioning';
type CoachingExpValue = 'beginner' | 'intermediate' | 'advanced';
type TargetAthleteValue = 'beginners' | 'intermediate' | 'advanced_competitive';
type AvailabilityValue = 'weekdays' | 'weekends' | 'flexible';

export default function CoachOnboardingPage() {
  const router = useRouter();
  const store = useCoachOnboardingStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (store.currentStep === 1 && !store.sport) e.sport = 'Please select a sport';
    if (store.currentStep === 2 && !store.coachingFocus?.length) e.coachingFocus = 'Please select at least one focus';
    if (store.currentStep === 3 && !store.coachingExperience) e.coachingExperience = 'Please select your experience';
    if (store.currentStep === 4 && !store.targetAthletes?.length) e.targetAthletes = 'Please select at least one athlete type';
    if (store.currentStep === 5) {
      if (!store.city) e.city = 'Please select a city';
      if (!store.postalCode) e.postalCode = 'Please enter your postal code';
      if (!store.availability?.length) e.availability = 'Please select your availability';
    }
    if (store.currentStep === 8) {
      if (!store.firstName) e.firstName = 'First name is required';
      if (!store.lastName) e.lastName = 'Last name is required';
      if (!store.email) e.email = 'Email is required';
      if (!store.password || store.password.length < 8) e.password = 'Password must be at least 8 characters';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) store.nextStep(); };
  const handleBack = () => store.prevStep();

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const cred = await signUp(store.email!, store.password!);
      await createUserProfile(cred.user.uid, {
        role: 'coach',
        firstName: store.firstName!,
        lastName: store.lastName!,
        email: store.email!,
        sport: store.sport!,
        coachingFocus: store.coachingFocus!,
        coachingExperience: store.coachingExperience!,
        targetAthletes: store.targetAthletes!,
        city: store.city!,
        postalCode: store.postalCode!,
        availability: store.availability!,
        pricingBeginner: store.pricingBeginner,
        pricingIntermediate: store.pricingIntermediate,
        pricingAdvanced: store.pricingAdvanced,
        bio: store.bio,
      } as any);
      store.reset();
      router.push('/profile');
    } catch (err: unknown) {
      setErrors({ submit: err instanceof Error ? err.message : 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(249,115,22,0.08) 0%, transparent 70%)'
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <div style={{ width: '2rem', height: '2rem', borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '0.9rem' }}>A</div>
        <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>App<span className="text-gradient">Sport</span></span>
      </Link>

      <div className="glass" style={{ width: '100%', maxWidth: '520px', padding: '2.5rem' }}>
        <StepIndicator current={store.currentStep} total={TOTAL_STEPS} />

        {/* Step 1 – Sport */}
        {store.currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Which sport do you coach?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Select your primary coaching sport.</p>
            <select id="coach-sport" className="input-field" style={{ appearance: 'none', cursor: 'pointer' }}
              value={store.sport ?? ''} onChange={e => store.setStep1({ sport: e.target.value })}>
              <option value="">Select a sport...</option>
              {sports.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <FieldError message={errors.sport} />
          </div>
        )}

        {/* Step 2 – Coaching Focus */}
        {store.currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Coaching Focus</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>What do you specialize in? Select all that apply.</p>
            {[
              { val: 'skill_improvement' as CoachingFocusValue, label: '🎯 Skill improvement' },
              { val: 'competitive_prep' as CoachingFocusValue, label: '🏆 Competitive prep' },
              { val: 'fitness_conditioning' as CoachingFocusValue, label: '💪 Fitness / conditioning' },
            ].map(opt => {
              const checked = store.coachingFocus?.includes(opt.val) ?? false;
              return (
                <label key={opt.val} id={`focus-${opt.val}`} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)', border: `1px solid ${checked ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                  background: checked ? 'rgba(249,115,22,0.1)' : 'transparent',
                  cursor: 'pointer', marginBottom: '0.5rem', transition: 'all 0.2s',
                }}>
                  <input type="checkbox" checked={checked} style={{ accentColor: 'var(--color-secondary)', width: '1rem', height: '1rem' }}
                    onChange={e => {
                      const cur = store.coachingFocus ?? [];
                      const next = e.target.checked ? [...cur, opt.val] : cur.filter(v => v !== opt.val);
                      store.setStep2({ coachingFocus: next });
                    }} />
                  {opt.label}
                </label>
              );
            })}
            <FieldError message={errors.coachingFocus} />
          </div>
        )}

        {/* Step 3 – Experience */}
        {store.currentStep === 3 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Coaching Experience</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>How long have you been coaching?</p>
            {[
              { val: 'beginner' as CoachingExpValue, label: '🌱 Beginner (0–2 years)' },
              { val: 'intermediate' as CoachingExpValue, label: '⚡ Intermediate (3–5 years)' },
              { val: 'advanced' as CoachingExpValue, label: '🔥 Advanced (6+ years)' },
            ].map(opt => (
              <label key={opt.val} id={`coach-exp-${opt.val}`} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-md)', border: `1px solid ${store.coachingExperience === opt.val ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                background: store.coachingExperience === opt.val ? 'rgba(249,115,22,0.1)' : 'transparent',
                cursor: 'pointer', marginBottom: '0.5rem', transition: 'all 0.2s',
              }}>
                <input type="radio" checked={store.coachingExperience === opt.val}
                  style={{ accentColor: 'var(--color-secondary)' }}
                  onChange={() => store.setStep3({ coachingExperience: opt.val })} />
                {opt.label}
              </label>
            ))}
            <FieldError message={errors.coachingExperience} />
          </div>
        )}

        {/* Step 4 – Target Athletes */}
        {store.currentStep === 4 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Who Do You Coach?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Select the types of athletes you work with.</p>
            {[
              { val: 'beginners' as TargetAthleteValue, label: '🌱 Beginners' },
              { val: 'intermediate' as TargetAthleteValue, label: '⚡ Intermediate athletes' },
              { val: 'advanced_competitive' as TargetAthleteValue, label: '🔥 Advanced / competitive athletes' },
            ].map(opt => {
              const checked = store.targetAthletes?.includes(opt.val) ?? false;
              return (
                <label key={opt.val} id={`target-${opt.val}`} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)', border: `1px solid ${checked ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                  background: checked ? 'rgba(249,115,22,0.1)' : 'transparent',
                  cursor: 'pointer', marginBottom: '0.5rem', transition: 'all 0.2s',
                }}>
                  <input type="checkbox" checked={checked} style={{ accentColor: 'var(--color-secondary)', width: '1rem', height: '1rem' }}
                    onChange={e => {
                      const cur = store.targetAthletes ?? [];
                      const next = e.target.checked ? [...cur, opt.val] : cur.filter(v => v !== opt.val);
                      store.setStep4({ targetAthletes: next });
                    }} />
                  {opt.label}
                </label>
              );
            })}
            <FieldError message={errors.targetAthletes} />
          </div>
        )}

        {/* Step 5 – Location */}
        {store.currentStep === 5 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Location &amp; Availability</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Where do you coach and when are you available?</p>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>City</label>
              <select id="coach-city" className="input-field" style={{ appearance: 'none', cursor: 'pointer' }}
                value={store.city ?? ''}
                onChange={e => store.setStep5({ city: e.target.value, postalCode: store.postalCode ?? '', availability: store.availability ?? [] })}>
                <option value="">Select your city...</option>
                {ontarioCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <FieldError message={errors.city} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Postal Code</label>
              <input id="coach-postal" type="text" placeholder="M5V 3A1" className="input-field"
                value={store.postalCode ?? ''}
                onChange={e => store.setStep5({ postalCode: e.target.value, city: store.city ?? '', availability: store.availability ?? [] })} />
              <FieldError message={errors.postalCode} />
            </div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.875rem', fontSize: '0.9rem' }}>AVAILABILITY</label>
            {['weekdays', 'weekends', 'flexible'].map(opt => {
              const checked = store.availability?.includes(opt as AvailabilityValue) ?? false;
              const labels: Record<string, string> = { weekdays: '📅 Weekdays', weekends: '🎉 Weekends', flexible: '🌀 Flexible' };
              return (
                <label key={opt} id={`coach-avail-${opt}`} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)', border: `1px solid ${checked ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                  background: checked ? 'rgba(249,115,22,0.1)' : 'transparent', cursor: 'pointer', marginBottom: '0.5rem', transition: 'all 0.2s',
                }}>
                  <input type="checkbox" checked={checked} style={{ accentColor: 'var(--color-secondary)', width: '1rem', height: '1rem' }}
                    onChange={e => {
                      const cur = store.availability ?? [];
                      const next = e.target.checked ? [...cur, opt as AvailabilityValue] : cur.filter(v => v !== opt);
                      store.setStep5({ availability: next, city: store.city ?? '', postalCode: store.postalCode ?? '' });
                    }} />
                  {labels[opt]}
                </label>
              );
            })}
            <FieldError message={errors.availability} />
          </div>
        )}

        {/* Step 6 – Pricing */}
        {store.currentStep === 6 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Session Pricing</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Optional — set your pricing per session by athlete level.</p>
            {[
              { key: 'pricingBeginner', label: '🌱 Beginner sessions ($/hr)' },
              { key: 'pricingIntermediate', label: '⚡ Intermediate sessions ($/hr)' },
              { key: 'pricingAdvanced', label: '🔥 Advanced sessions ($/hr)' },
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{label}</label>
                <input
                  id={`coach-${key}`}
                  type="number" min={0} step={5} placeholder="e.g. 75" className="input-field"
                  value={(store as Record<string, unknown>)[key] as number ?? ''}
                  onChange={e => store.setStep6({ [key]: Number(e.target.value) } as { pricingBeginner?: number; pricingIntermediate?: number; pricingAdvanced?: number })}
                />
              </div>
            ))}
          </div>
        )}

        {/* Step 7 – Bio */}
        {store.currentStep === 7 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Bio</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Optional — tell athletes about yourself (max 500 characters).</p>
            <textarea
              id="coach-bio"
              className="input-field"
              rows={6}
              maxLength={500}
              placeholder="I've been coaching soccer for 8 years, specializing in youth competitive teams..."
              style={{ resize: 'vertical' }}
              value={store.bio ?? ''}
              onChange={e => store.setStep7({ bio: e.target.value })}
            />
            <p style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
              {(store.bio ?? '').length}/500
            </p>
          </div>
        )}

        {/* Step 8 – Account */}
        {store.currentStep === 8 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create Your Account</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Final step! Set up your login credentials.</p>
            <div style={{ display: 'flex', gap: '0.875rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>First Name</label>
                <input id="coach-first-name" type="text" placeholder="John" className="input-field"
                  value={store.firstName ?? ''}
                  onChange={e => store.setStep8({ firstName: e.target.value, lastName: store.lastName ?? '', email: store.email ?? '', password: store.password ?? '' })} />
                <FieldError message={errors.firstName} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Last Name</label>
                <input id="coach-last-name" type="text" placeholder="Doe" className="input-field"
                  value={store.lastName ?? ''}
                  onChange={e => store.setStep8({ lastName: e.target.value, firstName: store.firstName ?? '', email: store.email ?? '', password: store.password ?? '' })} />
                <FieldError message={errors.lastName} />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email</label>
              <input id="coach-email" type="email" placeholder="john@example.com" className="input-field"
                value={store.email ?? ''}
                onChange={e => store.setStep8({ email: e.target.value, firstName: store.firstName ?? '', lastName: store.lastName ?? '', password: store.password ?? '' })} />
              <FieldError message={errors.email} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Password</label>
              <input id="coach-password" type="password" placeholder="Min. 8 characters" className="input-field"
                value={store.password ?? ''}
                onChange={e => store.setStep8({ password: e.target.value, firstName: store.firstName ?? '', lastName: store.lastName ?? '', email: store.email ?? '' })} />
              <FieldError message={errors.password} />
            </div>
            {errors.submit && <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.75rem', textAlign: 'center' }}>{errors.submit}</p>}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '0.875rem', marginTop: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
          {store.currentStep > 1 ? (
            <button id="coach-back" onClick={handleBack} className="btn-secondary" style={{ flex: 1, justifyContent:'center' }}>← Back</button>
          ) : (
            <Link href="/get-started" className="btn-ghost" style={{ flex: 1, justifyContent:'center' }}>← Back</Link>
          )}

          {(store.currentStep === 6 || store.currentStep === 7) && (
            <button id="coach-skip" onClick={() => store.nextStep()} className="btn-ghost">Skip</button>
          )}

          {store.currentStep < TOTAL_STEPS ? (
            <button id="coach-next" onClick={handleNext} className="btn-primary" style={{
              flex: 1, justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))',
              boxShadow: '0 4px 15px rgba(249,115,22,0.3)'
            }}>Continue →</button>
          ) : (
            <button id="coach-submit" onClick={handleSubmit} disabled={loading} className="btn-primary" style={{
              flex: 1, justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))',
              boxShadow: '0 4px 15px rgba(249,115,22,0.3)'
            }}>
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
