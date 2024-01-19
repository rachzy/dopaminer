import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export interface IFormField {
    name: string;
    label: string;
    placeholder: string;
    error: string | null;
    value: string;
    min?: number;
    max: number;
    password?: boolean;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => boolean;
    refine?: (value: string) => boolean;
  }