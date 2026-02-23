'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { getUserProfile, updateUserProfile } from '@/lib/firebase/firestore';
import { UserProfile, ClientProfile, CoachProfile } from '@/lib/types';

const sportOptions = ['Soccer', 'Basketball', 'Tennis', 'Swimming', 'Running', 'Cycling', 'Hockey', 'Baseball', 'Volleyball', 'Golf', 'Martial Arts', 'Boxing', 'Cricket', 'Rugby', 'Other'].map(s => ({ label: s, value: s }));

const experienceLevelOptions = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' }
];

const trainingGoalOptions = [
  { label: 'Fitness & Conditioning', value: 'fitness_conditioning' },
  { label: 'Improve Skills', value: 'improve_skills' },
  { label: 'Competition Prep', value: 'competition_prep' }
];

const coachingFocusOptions = [
  { label: 'Skill Improvement', value: 'skill_improvement' },
  { label: 'Competitive Prep', value: 'competitive_prep' },
  { label: 'Fitness & Conditioning', value: 'fitness_conditioning' }
];

const targetAthletesOptions = [
  { label: 'Beginners', value: 'beginners' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced / Competitive', value: 'advanced_competitive' }
];

const cityOptions = [
  { label: 'Toronto', value: 'Toronto' },
  { label: 'Ottawa', value: 'Ottawa' },
  { label: 'Mississauga', value: 'Mississauga' },
  { label: 'Brampton', value: 'Brampton' },
  { label: 'Hamilton', value: 'Hamilton' },
  { label: 'London', value: 'London' },
  { label: 'Markham', value: 'Markham' },
  { label: 'Vaughan', value: 'Vaughan' },
  { label: 'Kitchener', value: 'Kitchener' },
  { label: 'Windsor', value: 'Windsor' },
  { label: 'Richmond Hill', value: 'Richmond Hill' },
  { label: 'Oakville', value: 'Oakville' },
  { label: 'Burlington', value: 'Burlington' },
  { label: 'Oshawa', value: 'Oshawa' },
  { label: 'Barrie', value: 'Barrie' },
  { label: 'Sudbury', value: 'Sudbury' },
  { label: 'Kingston', value: 'Kingston' },
  { label: 'Guelph', value: 'Guelph' },
  { label: 'Thunder Bay', value: 'Thunder Bay' },
  { label: 'Waterloo', value: 'Waterloo' },
];

const availabilityOptions = [
  { label: 'Mornings', value: 'mornings' },
  { label: 'Afternoons', value: 'afternoons' },
  { label: 'Evenings', value: 'evenings' },
  { label: 'Weekends', value: 'weekends' }
];

export default function ProfilePage() {
  const { user, initialized } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string | number>('');

  useEffect(() => {
    if (!initialized) return;
    if (!user) {
      setLoading(false);
      return;
    }

    getUserProfile(user.uid)
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load profile', err);
        setLoading(false);
      });
  }, [user, initialized]);

  const handleEdit = (field: keyof UserProfile, currentValue: string | number | string[]) => {
    setEditingField(field as string);
    setEditValue(Array.isArray(currentValue) ? currentValue.join(', ') : currentValue);
  };

  const handleSave = async (field: keyof UserProfile) => {
    if (!user || !profile) return;

    let processedValue: any = editValue;

    // Quick coercion for arrays
    if ((field as string) === 'availability' || (field as string) === 'coachingFocus' || (field as string) === 'targetAthletes') {
      processedValue = (editValue as string).split(',').map(s => s.trim()).filter(Boolean);
    }
    // Coercion for numbers
    if ((field as string) === 'budgetMin' || (field as string) === 'budgetMax' || (field as string).startsWith('pricing')) {
      processedValue = Number(editValue);
    }

    try {
      await updateUserProfile(user.uid, { [field]: processedValue });
      setProfile({ ...profile, [field]: processedValue } as UserProfile);
      setEditingField(null);
    } catch (e) {
      console.error('Failed to update field', e);
      alert('Failed to update profile field.');
    }
  };

  if (loading || !initialized) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-error)', fontSize: '1.1rem' }}>Profile not found. Please log in.</p>
      </div>
    );
  }

  const isClient = profile.role === 'client';
  const cProfile = profile as ClientProfile;
  const coachProfile = profile as CoachProfile;

  const renderField = (
    label: string,
    field: keyof UserProfile,
    displayValue: string,
    rawValue: string | number | string[],
    options?: { label: string, value: string }[],
    isMulti: boolean = false,
    editable: boolean = true
  ) => {
    const isEditing = editingField === field;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', background: 'var(--color-surface-1)', borderRadius: 'var(--radius-lg)', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        {isEditing ? (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {options ? (
              <select
                multiple={isMulti}
                className="input-field"
                value={isMulti ? (typeof editValue === 'string' ? editValue.split(', ').filter(Boolean) : editValue) : editValue}
                onChange={(e) => {
                  if (isMulti) {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setEditValue(selected.join(', '));
                  } else {
                    setEditValue(e.target.value);
                  }
                }}
                style={{ flex: 1, padding: '0.5rem' }}
                autoFocus
              >
                {!isMulti && <option value="" disabled>Select {label}</option>}
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            ) : (
              <input
                type={typeof rawValue === 'number' ? 'number' : 'text'}
                className="input-field"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{ flex: 1, padding: '0.5rem' }}
                autoFocus
              />
            )}
            <button onClick={() => handleSave(field as keyof UserProfile)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Save</button>
            <button onClick={() => setEditingField(null)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Cancel</button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500 }}>{displayValue}</span>
            {editable && (
              <button
                onClick={() => handleEdit(field as keyof UserProfile, rawValue)}
                style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px' }}>
      <div className="glass" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '8px', background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-surface-2), var(--color-surface-3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '2px solid var(--color-border)' }}>
            👤
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem', background: 'linear-gradient(90deg, var(--color-text), var(--color-text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {profile.firstName} {profile.lastName}
            </h1>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: profile.role === 'coach' ? 'rgba(249,115,22,0.1)' : 'rgba(59,130,246,0.1)', color: profile.role === 'coach' ? 'var(--color-secondary-dark)' : 'var(--color-primary-dark)', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {profile.role} Profile
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>Account Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {renderField('Email', 'email', profile.email, profile.email, undefined, false, false)}
              {/* {renderField('City', 'city', profile.city, profile.city)}
              {renderField('Postal Code', 'postalCode', profile.postalCode, profile.postalCode)} */}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>Sport Preferences</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {renderField('Sport', 'sport', profile.sport, profile.sport, sportOptions)}
              {profile.role === 'client' && (
                <>
                  {renderField('Experience Level', 'experienceLevel' as keyof UserProfile, (profile as any).experienceLevel, (profile as any).experienceLevel, experienceLevelOptions)}
                  {renderField('Training Goal', 'trainingGoal' as keyof UserProfile, (profile as any).trainingGoal.replace(/_/g, ' '), (profile as any).trainingGoal, trainingGoalOptions)}
                </>
              )}
              {profile.role === 'coach' && (
                <>
                  {renderField('Coaching Experience', 'coachingExperience' as keyof UserProfile, (profile as any).coachingExperience, (profile as any).coachingExperience, experienceLevelOptions)}
                  {renderField('Coaching Focus', 'coachingFocus' as keyof UserProfile, (profile as any).coachingFocus.join(', ').replace(/_/g, ' '), (profile as any).coachingFocus, coachingFocusOptions, true)}
                  {renderField('Target Athletes', 'targetAthletes' as keyof UserProfile, (profile as any).targetAthletes.join(', ').replace(/_/g, ' '), (profile as any).targetAthletes, targetAthletesOptions, true)}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Location & Availability */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Location &amp; Availability</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {renderField('City', 'city', profile.city, profile.city, cityOptions)}
            {renderField('Postal Code', 'postalCode', profile.postalCode, profile.postalCode)}
            {renderField('Availability', 'availability', profile.availability.join(', '), profile.availability, availabilityOptions, true)}
          </div>
        </div>

        {/* Details */}
        {profile.role === 'client' && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Budget Range</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {renderField('Min Budget ($)', 'budgetMin' as keyof UserProfile, `$${(profile as any).budgetMin}`, (profile as any).budgetMin)}
              {renderField('Max Budget ($)', 'budgetMax' as keyof UserProfile, `$${(profile as any).budgetMax}`, (profile as any).budgetMax)}
            </div>
          </div>
        )}

        {profile.role === 'coach' && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Pricing</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              {renderField('Beginner Price ($)', 'pricingBeginner' as keyof UserProfile, (profile as any).pricingBeginner ? `$${(profile as any).pricingBeginner}` : 'Not set', (profile as any).pricingBeginner ?? '')}
              {renderField('Intermediate Price ($)', 'pricingIntermediate' as keyof UserProfile, (profile as any).pricingIntermediate ? `$${(profile as any).pricingIntermediate}` : 'Not set', (profile as any).pricingIntermediate ?? '')}
              {renderField('Advanced Price ($)', 'pricingAdvanced' as keyof UserProfile, (profile as any).pricingAdvanced ? `$${(profile as any).pricingAdvanced}` : 'Not set', (profile as any).pricingAdvanced ?? '')}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              {renderField('Bio', 'bio' as keyof UserProfile, (profile as any).bio || 'No bio provided.', (profile as any).bio || '')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
