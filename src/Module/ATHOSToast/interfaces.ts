export interface ATHOSToastProps {
  id?: string;
  updateState: any;
  removeCondition?: boolean;
  renderCondition: boolean;
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  gap?: number;
}
