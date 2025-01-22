import { ASMSubOptionI } from "../../../interfaces";

export interface SelectedDataTrackSubSubOptI extends ASMSubOptionI {
  id: string;
  selected: boolean;
}

export interface ASMSubSubOptionProps {
  subopt: SelectedDataTrackSubSubOptI;
  optId: string;
  subOptId: string;
}
