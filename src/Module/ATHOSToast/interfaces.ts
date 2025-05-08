export interface ATHOSToastProps {
  id?: string;
  updateState?: any;
  removeCondition?: boolean;
  renderCondition?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  gap?: number;
  renderAndFade?: boolean;
  fadeTime?: number;
  children?: React.ReactNode;
  className?: string;
}
