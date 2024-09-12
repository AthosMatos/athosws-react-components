import { PlacesType } from "react-tooltip";

export interface ATHOSTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: PlacesType;
  toolTipStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  float?: boolean;
}
