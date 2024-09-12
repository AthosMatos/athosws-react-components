export interface LabelI {
  label: string;
  onClick: () => void;
}

export interface ATHOSDropDownProps {
  children: (ref: any) => React.ReactNode;
  open: boolean;
  close: () => void;
  positionVert?: "top" | "bottom";
  positionHor?: "left" | "right";
  id: string;
  labels: LabelI[];
}
export type ChildSize = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  transform?: string;
};

export type ADDContainerProps = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  transform?: string;
};
