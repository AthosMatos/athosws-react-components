type AMOptSelectedColorsProps = {
  background?: string;
  border?: {
    color?: string;
    width?: string;
  };
  text?: string;
  icon?: string;
};
interface AMMenuColorsProps extends AMOptSelectedColorsProps {
  optionSelected?: AMOptSelectedColorsProps;
  subOptionSelected?: AMOptSelectedColorsProps;
  subSubOptionSelected?: AMOptSelectedColorsProps;
}

interface AMColorsProps {
  selected?: AMOptSelectedColorsProps;
  menu?: AMMenuColorsProps;
  arrows?: string;
}

export interface ATHOSMenuProps {
  colors?: AMColorsProps;
}
