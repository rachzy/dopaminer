import { create } from "zustand";

export type State = {
  values: {
    name?: string;
    birthdate?: string;
  };
};

type Action = {
  setValues: (values: Partial<State>) => void;
};

export const useRegisterFormStore = create<State & Action>((set) => ({
  values: {
    name: "",
    birthdate: "",
  },
  setValues: (values) => set(values),
}));
