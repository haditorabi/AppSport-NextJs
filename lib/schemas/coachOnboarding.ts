import { z } from 'zod';

// Step 1 – Sport
export const coachStep1Schema = z.object({
  sport: z.string().min(1, 'Please select a sport'),
});

// Step 2 – Coaching Focus
export const coachStep2Schema = z.object({
  coachingFocus: z
    .array(z.enum(['skill_improvement', 'competitive_prep', 'fitness_conditioning']))
    .min(1, 'Please select at least one focus area'),
});

// Step 3 – Coaching Experience
export const coachStep3Schema = z.object({
  coachingExperience: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select your experience level',
  }),
});

// Step 4 – Target Athletes
export const coachStep4Schema = z.object({
  targetAthletes: z
    .array(z.enum(['beginners', 'intermediate', 'advanced_competitive']))
    .min(1, 'Please select at least one athlete type'),
});

// Step 5 – Location & Availability
export const coachStep5Schema = z.object({
  city: z.string().min(1, 'Please select a city'),
  postalCode: z.string().min(3, 'Please enter your postal code'),
  availability: z
    .array(z.enum(['weekdays', 'weekends', 'flexible']))
    .min(1, 'Please select your availability'),
});

// Step 6 – Pricing (optional)
export const coachStep6Schema = z.object({
  pricingBeginner: z.number().min(0).optional(),
  pricingIntermediate: z.number().min(0).optional(),
  pricingAdvanced: z.number().min(0).optional(),
});

// Step 7 – Bio (optional)
export const coachStep7Schema = z.object({
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
});

// Step 8 – Account Creation
export const coachStep8Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type CoachStep1Data = z.infer<typeof coachStep1Schema>;
export type CoachStep2Data = z.infer<typeof coachStep2Schema>;
export type CoachStep3Data = z.infer<typeof coachStep3Schema>;
export type CoachStep4Data = z.infer<typeof coachStep4Schema>;
export type CoachStep5Data = z.infer<typeof coachStep5Schema>;
export type CoachStep6Data = z.infer<typeof coachStep6Schema>;
export type CoachStep7Data = z.infer<typeof coachStep7Schema>;
export type CoachStep8Data = z.infer<typeof coachStep8Schema>;
