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
}

export interface ATHOSInputProps {
  type?: "user" | "password";
  placeholder?: string;
  label?: string;
  error?: string;
  colors?: ATHOSInputStyles;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void | Promise<void>;
  onFocus?: () => void | Promise<void>;
  isSubmitting?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
