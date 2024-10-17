import { create } from "zustand";

export type State = {
  values: {
    name?: string;
    email?: string;
    birthdate?: string;
    profilePicture: string;
  };
};

type Action = {
  setValues: (values: Partial<State["values"]>) => void;
};

// This function creates a store for managing the registration form state.
// It uses the Zustand library to create a store with initial values and a setValues action to update the form state.
export const useRegisterFormStore = create<State & Action>((set) => ({
  values: {
    name: "",
    email: "",
    birthdate: "",
    profilePicture: "default-pfp.png",
  },
  setValues: (values) =>
    set((state) => ({ values: { ...state.values, ...values } })),
}));
