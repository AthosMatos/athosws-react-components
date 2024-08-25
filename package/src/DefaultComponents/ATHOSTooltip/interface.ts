export interface ATHOSTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  wrapperStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}
