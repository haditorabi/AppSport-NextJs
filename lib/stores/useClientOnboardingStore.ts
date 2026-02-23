import { create } from 'zustand';
import type {
  ClientStep1Data,
  ClientStep2Data,
  ClientStep3Data,
  ClientStep4Data,
  ClientStep5Data,
} from '@/lib/schemas/clientOnboarding';

type ClientOnboardingState = Partial<
  ClientStep1Data &
  ClientStep2Data &
  ClientStep3Data &
  ClientStep4Data &
  ClientStep5Data
> & {
  currentStep: number;
  setStep1: (data: ClientStep1Data) => void;
  setStep2: (data: ClientStep2Data) => void;
  setStep3: (data: ClientStep3Data) => void;
  setStep4: (data: ClientStep4Data) => void;
  setStep5: (data: ClientStep5Data) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
};

const initialState = {
  currentStep: 1,
  sport: undefined,
  trainingGoal: undefined,
  experienceLevel: undefined,
  city: undefined,
  postalCode: undefined,
  availability: undefined,
  budgetMin: 0,
  budgetMax: 60,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  password: undefined,
};

export const useClientOnboardingStore = create<ClientOnboardingState>((set) => ({
  ...initialState,
  setStep1: (data) => set(data),
  setStep2: (data) => set(data),
  setStep3: (data) => set(data),
  setStep4: (data) => set(data),
  setStep5: (data) => set(data),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  goToStep: (step) => set({ currentStep: step }),
  reset: () => set(initialState),
}));
