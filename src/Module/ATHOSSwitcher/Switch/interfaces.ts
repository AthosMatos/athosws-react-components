import { ReactNode } from "react";

export interface StyleI {
  className?: {
    default?: string;
    active?: string;
  };
  style?: {
    default?: React.CSSProperties;
    active?: React.CSSProperties;
  };
  dftClassName?: {
    default?: string;
    active?: string;
  };
  dftStyle?: {
    default?: React.CSSProperties;
    active?: React.CSSProperties;
  };
}

export interface SwitchI {
  id?: string;
  onSelected?: () => void;
  label?: ReactNode;
  icon?: ReactNode;
  className?: {
    default?: string;
    active?: string;
  };
  style?: {
    default?: React.CSSProperties;
    active?: React.CSSProperties;
  };
}

export interface SelectProps {
  selected: boolean;
  select: () => void;
}

export interface SwitchProps extends SwitchI, StyleI {
  index: number;
}
