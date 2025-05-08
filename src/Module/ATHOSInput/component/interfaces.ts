export interface ATHOSInputStyles {
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  hover?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    iconColor?: string;
  };
  focused?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    iconColor?: string;
  };
  disabled?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    iconColor?: string;
  };
}

export type ATHOSInputType = "text" | "email" | "user" | "password" | "number" | "tel" | "url" | "date" | "time" | "color" | "file";

export interface ATHOSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: ATHOSInputType;
  label?: string;
  error?: string;
  colors?: ATHOSInputStyles;
  onBlur?: () => void | Promise<void>;
  onFocus?: () => void | Promise<void>;
  isSubmitting?: boolean;
}
