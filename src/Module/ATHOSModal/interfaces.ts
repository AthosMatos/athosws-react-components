export interface ATHOSModalProps {
  show?: boolean;
  children?: React.ReactNode;
  hide?: () => void;
  blur?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "none";
  backdrop?: string;
}
