export interface DefaultATHOSButtonProps {
  disabled?: false;
  type: "default" | "alt" | "action";
  children: React.ReactNode;
  onClick?: () => void;
  tooltip?: React.ReactNode;
}

export interface DisabledATHOSButtonProps {
  disabled: true;
  children: React.ReactNode;
  tooltip?: React.ReactNode;
}

export type ATHOSButtonProps =
  | DefaultATHOSButtonProps
  | DisabledATHOSButtonProps;
