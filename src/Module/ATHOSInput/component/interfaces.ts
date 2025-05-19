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

export type ATHOSInputType =
  | "text"
  | "email"
  | "user"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "date"
  | "time"
  | "color"
  | "file"
  | "check";

export interface ATHOSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: ATHOSInputType;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  colors?: ATHOSInputStyles;
  onblur?: () => void | Promise<void>;
  onfocus?: () => void | Promise<void>;
  isSubmitting?: boolean;
  innerPadding?: {
    vertical?: string;
    horizontal?: string;
  };
}
