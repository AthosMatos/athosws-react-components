export interface ATHOSButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
  confirmCollapse?: boolean;
  onConfirm?: () => void;
  inConfirmClassName?: string;
}
