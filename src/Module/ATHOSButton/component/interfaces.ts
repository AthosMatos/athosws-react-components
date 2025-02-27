export type ATHOSButtonProps = {
  disabled?: boolean;
  type: "default" | "alt" | "action";
  onClick?: () => void;
  children: React.ReactNode;
  small?: boolean;
  tooltip?: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
  textColor?: string;
};
