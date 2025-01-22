import { SelectedDataTrackOptI } from "../ASM/Options/Option/interfaces";
import { ASMOptionI, ASMSubOptionI, ASMSubSubOptionI, ATHOSSideMenuProps, DefaultOptI } from "../interfaces";

export interface ATHOSSideMenuContextProps {
  selectOption: (id: string) => void;
  selectedDataTrack: SelectedDataTrackOptI[];
  selectSubOption: (parentId: string, id: string) => void;
  selectSubSubOption: (optId: string, subOptId: string, id: string) => void;
  props: ATHOSSideMenuProps;
  dropId: string;
  setSelectedData: (selData: SelectedDataTrackOptI[]) => void;
  selectedData: DefaultOptI | undefined;
  hideMenu: boolean;
  setHideMenu: (hide: boolean) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
}

export interface OptI extends ASMOptionI {
  id: string;
  selected: boolean;
  open: boolean;
}
export interface SubOptI extends ASMSubOptionI {
  id: string;
  selected: boolean;
  open: boolean;
}
export interface SunSubOptI extends ASMSubSubOptionI {
  id: string;
  selected: boolean;
}
