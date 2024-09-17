import { SelectedDataTrackOptI } from "../ASM/Options/Option/interfaces";
import { ATHOSSideMenuProps } from "../interfaces";

export interface ATHOSSideMenuContextProps {
  selectOption: (id: string) => void;
  selectedDataTrack: SelectedDataTrackOptI[];
  selectSubOption: (parentId: string, id: string) => void;
  props: ATHOSSideMenuProps;
  dropId: string;
  setSelectedData: (selData: SelectedDataTrackOptI[]) => void;
  hideMenu: boolean;
  setHideMenu: (hide: boolean) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
}
