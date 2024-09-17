import { ReactNode } from "react";
export interface ATHOSTooltipProps {
  children: (ref: any) => ReactNode;
  id?: string;
  forceOpen?: boolean;
  position?: "top" | "bottom";
  followCursor?: boolean;
  content: ReactNode;
  maxWidth?: number | string;
}
