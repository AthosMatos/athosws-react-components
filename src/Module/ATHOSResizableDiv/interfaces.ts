export interface ResizableDivProps {
  //name: string;
  resizableConers?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
  saveInLocalStorage?: string;
  style?: React.CSSProperties;
  OuterContainerStyle?: React.CSSProperties;
  children?: React.ReactNode;
  withToogle?: boolean;
  matchChildSize?: boolean;
  disabled?: boolean;
  className?: string;
  outerClassName?: string;
}
