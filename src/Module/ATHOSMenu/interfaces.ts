export type AMOptColorsProps = {
  background?: string;
  border?:
    | {
        color?: string;
        width?: string;
      }
    | "none";
  text?: string;
  icon?: string;
};
type OptType = {
  selected?: AMOptColorsProps;
  normal?: AMOptColorsProps;
};
interface AMMenuColorsProps extends AMOptColorsProps {
  option: OptType;
  subOptionSelected?: OptType;
  subSubOptionSelected?: OptType;
}

interface AMColorsProps {
  selected?: AMOptColorsProps;
  menu?: AMMenuColorsProps;
  arrows?: string;
}

export interface ATHOSMenuProps {
  colors?: AMColorsProps;
}
