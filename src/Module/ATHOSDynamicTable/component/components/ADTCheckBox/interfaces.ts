import { checkStates } from "../../redux/Select/interfaces";

export type ADTCheckBoxProps = {
  checked: checkStates | boolean;
  big?: boolean;
  clicable?: boolean;
  check?: () => void;
  isRow?: boolean;
};
