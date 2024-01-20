import { create } from "zustand";

export type State = {
  values: {
    name?: string;
    birthdate?: string;
    profilePicture: string;
  };
};

type Action = {
  setValues: (values: Partial<State["values"]>) => void;
};

export const useRegisterFormStore = create<State & Action>((set) => ({
  values: {
    name: "",
    birthdate: "",
    profilePicture: "default-pfp.png",
  },
  setValues: (values) =>
    set((state) => ({ values: { ...state.values, ...values } })),
}));
