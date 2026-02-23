import { create } from 'zustand';
import type {
  CoachStep1Data,
  CoachStep2Data,
  CoachStep3Data,
  CoachStep4Data,
  CoachStep5Data,
  CoachStep6Data,
  CoachStep7Data,
  CoachStep8Data,
} from '@/lib/schemas/coachOnboarding';

type CoachOnboardingState = Partial<
  CoachStep1Data &
  CoachStep2Data &
  CoachStep3Data &
  CoachStep4Data &
  CoachStep5Data &
  CoachStep6Data &
  CoachStep7Data &
  CoachStep8Data
> & {
  currentStep: number;
  setStep1: (data: CoachStep1Data) => void;
  setStep2: (data: CoachStep2Data) => void;
  setStep3: (data: CoachStep3Data) => void;
  setStep4: (data: CoachStep4Data) => void;
  setStep5: (data: CoachStep5Data) => void;
  setStep6: (data: CoachStep6Data) => void;
  setStep7: (data: CoachStep7Data) => void;
  setStep8: (data: CoachStep8Data) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
};

const initialState = {
  currentStep: 1,
};

export const useCoachOnboardingStore = create<CoachOnboardingState>((set) => ({
  ...initialState,
  setStep1: (data) => set(data),
  setStep2: (data) => set(data),
  setStep3: (data) => set(data),
  setStep4: (data) => set(data),
  setStep5: (data) => set(data),
  setStep6: (data) => set(data),
  setStep7: (data) => set(data),
  setStep8: (data) => set(data),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 8) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  goToStep: (step) => set({ currentStep: step }),
  reset: () => set(initialState),
}));
