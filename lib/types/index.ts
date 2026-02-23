export type UserRole = 'client' | 'coach';

export interface BaseProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  sport: string;
  city: string;
  postalCode: string;
  availability: ('weekdays' | 'weekends' | 'flexible')[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientProfile extends BaseProfile {
  role: 'client';
  trainingGoal: 'fitness_conditioning' | 'improve_skills' | 'competition_prep';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  budgetMin: number;
  budgetMax: number;
}

export interface CoachProfile extends BaseProfile {
  role: 'coach';
  coachingFocus: ('skill_improvement' | 'competitive_prep' | 'fitness_conditioning')[];
  coachingExperience: 'beginner' | 'intermediate' | 'advanced';
  targetAthletes: ('beginners' | 'intermediate' | 'advanced_competitive')[];
  pricingBeginner?: number;
  pricingIntermediate?: number;
  pricingAdvanced?: number;
  bio?: string;
}

export type UserProfile = ClientProfile | CoachProfile;

export interface WaitlistEntry {
  fullName: string;
  email: string;
  role: 'athlete' | 'coach' | 'team';
  submittedAt: Date;
}

// Client onboarding step data
export interface ClientStep1Data {
  sport: string;
}
export interface ClientStep2Data {
  trainingGoal: ClientProfile['trainingGoal'];
  experienceLevel: ClientProfile['experienceLevel'];
}
export interface ClientStep3Data {
  city: string;
  postalCode: string;
  availability: ClientProfile['availability'];
}
export interface ClientStep4Data {
  budgetMin: number;
  budgetMax: number;
}
export interface ClientStep5Data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Coach onboarding step data
export interface CoachStep1Data {
  sport: string;
}
export interface CoachStep2Data {
  coachingFocus: CoachProfile['coachingFocus'];
}
export interface CoachStep3Data {
  coachingExperience: CoachProfile['coachingExperience'];
}
export interface CoachStep4Data {
  targetAthletes: CoachProfile['targetAthletes'];
}
export interface CoachStep5Data {
  city: string;
  postalCode: string;
  availability: CoachProfile['availability'];
}
export interface CoachStep6Data {
  pricingBeginner?: number;
  pricingIntermediate?: number;
  pricingAdvanced?: number;
}
export interface CoachStep7Data {
  bio?: string;
}
export interface CoachStep8Data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
