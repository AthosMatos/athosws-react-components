export interface ATHOSPopUpProps {
  children: React.ReactNode;
  forceOpen?: boolean;
  onClose?: () => void;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right" | "top-center" | "bottom-center";
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  style?: React.CSSProperties;
  className?: string;
  content: React.ReactNode;
}

export type APUContainerProps = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  transform?: string;
};
