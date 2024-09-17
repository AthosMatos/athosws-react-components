interface EnabledATHOSButtonProps {
  disabled?: false;
  type: "default" | "alt" | "action";
  onClick?: () => void;
  children: React.ReactNode;
  small?: boolean;
  tooltip?: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
  textColor?: string;
}

interface DisabledATHOSButtonProps {
  disabled: true;
  children: React.ReactNode;
  small?: boolean;
  tooltip?: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
  textColor?: string;
}

export type ATHOSButtonProps =
  | DisabledATHOSButtonProps
  | EnabledATHOSButtonProps;
