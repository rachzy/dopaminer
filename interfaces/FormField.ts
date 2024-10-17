import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export type IFormFieldType = "email" | "date" | "select";

interface IFormFieldOption {
  label: string;
  value: any;
}

// The IFormField interface represents a form field in the application.
// It includes properties for the field's name, label, placeholder, error message, value, minimum and maximum length, type, options, password flag, onChange handler, and refine function.
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
