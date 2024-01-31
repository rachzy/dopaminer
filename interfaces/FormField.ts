import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export type IFormFieldType = "email" | "date" | "select";

interface IFormFieldOption {
  label: string;
  value: any;
}

export interface IFormField {
    name: string;
    label: string;
    placeholder?: string;
    error: string | null;
    value: any;
    min?: number;
    max?: number;
    type?: IFormFieldType;
    options?: IFormFieldOption[];
    password?: boolean;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => boolean;
    refine?: (value: string) => boolean;
  }