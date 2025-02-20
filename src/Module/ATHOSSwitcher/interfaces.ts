import { SwitchI } from "./Switch/interfaces";

export interface ATHOSSwitcherProps {
  selectedId?: string;
  onChange?: (id: string) => void;
  switchs: SwitchI[];
  style?: {
    container?: React.CSSProperties;
    switches?: {
      default?: React.CSSProperties;
      active?: React.CSSProperties;
    };
  };
  className?: {
    container?: string;
    switches?: {
      default?: string;
      active?: string;
    };
  };
}
