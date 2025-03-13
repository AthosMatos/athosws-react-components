import { ReactNode } from "react";
export interface ATHOSTooltipProps {
  children: ReactNode;
  forceOpen?: boolean;
  position?: "top" | "bottom";
  followCursor?: boolean;
  tooltipContent: ReactNode;
  gap?: number;
  style?: React.CSSProperties;
  className?: string;
}
