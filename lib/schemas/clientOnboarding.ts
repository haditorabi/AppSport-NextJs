import { z } from 'zod';

export const sportOptions = [
  'Soccer', 'Basketball', 'Tennis', 'Swimming', 'Running',
  'Cycling', 'Hockey', 'Baseball', 'Volleyball', 'Golf',
  'Martial Arts', 'Boxing', 'Cricket', 'Rugby', 'Other',
];

// Step 1 – Sport
export const clientStep1Schema = z.object({
  sport: z.string().min(1, 'Please select a sport'),
});

// Step 2 – Training Preferences
export const clientStep2Schema = z.object({
  trainingGoal: z.enum(['fitness_conditioning', 'improve_skills', 'competition_prep'], {
    required_error: 'Please select a training goal',
  }),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select your experience level',
  }),
});

// Step 3 – Location & Availability
export const clientStep3Schema = z.object({
  city: z.string().min(1, 'Please select a city'),
  postalCode: z.string().min(3, 'Please enter your postal code'),
  availability: z
    .array(z.enum(['weekdays', 'weekends', 'flexible']))
    .min(1, 'Please select your availability'),
});

// Step 4 – Budget (optional)
export const clientStep4Schema = z.object({
  budgetMin: z.number().min(0).max(120),
  budgetMax: z.number().min(0).max(120),
});

// Step 5 – Account Creation
export const clientStep5Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type ClientStep1Data = z.infer<typeof clientStep1Schema>;
export type ClientStep2Data = z.infer<typeof clientStep2Schema>;
export type ClientStep3Data = z.infer<typeof clientStep3Schema>;
export type ClientStep4Data = z.infer<typeof clientStep4Schema>;
export type ClientStep5Data = z.infer<typeof clientStep5Schema>;
