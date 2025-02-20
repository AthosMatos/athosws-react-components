import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { DefaultOptProps } from "../../interfaces";
import { WithId } from "../Props";
import { AMState } from "../store";

type SelectedReduxProps = {
  optionSelected: string | null;
  subOptionSelected: string | null;
  subSubOptionSelected: string | null;
  selectedData: WithId<DefaultOptProps> | null;
};

const initialState: SelectedReduxProps = {
  optionSelected: null,
  subOptionSelected: null,
  subSubOptionSelected: null,
  selectedData: null,
};

const Slice = createSlice({
  name: "AMSelected",
  initialState,
  reducers: {
    selectOption: (state, action: PayloadAction<string>) => {
      if (state.optionSelected === action.payload) state.optionSelected = null;
      else state.optionSelected = action.payload;
      state.subOptionSelected = null;
      state.subSubOptionSelected = null;
      // state.optionSelected = action.payload;
    },
    selectSubOption: (state, action: PayloadAction<string>) => {
      if (state.subOptionSelected === action.payload) state.subOptionSelected = null;
      else state.subOptionSelected = action.payload;
      state.subSubOptionSelected = null;
      //  state.subOptionSelected = action.payload;
    },
    selectSubSubOption: (state, action: PayloadAction<string>) => {
      if (state.subSubOptionSelected === action.payload) {
        state.subSubOptionSelected = null;
        return;
      }
      state.subSubOptionSelected = action.payload;
      //state.subSubOptionSelected = action.payload;
    },
    selectData: (state, action: PayloadAction<WithId<DefaultOptProps>>) => {
      state.selectedData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectOption, selectSubOption, selectSubSubOption, selectData } = Slice.actions;

const AMSelectedReducer = Slice.reducer;

export default AMSelectedReducer;
export type OptSTypes = "opt" | "subopt" | "subsubopt";
export const useSelectedData = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector((state: AMState) => state.AMSelectedReducer.selectedData);
  const navigate = useSelector((state: AMState) => state.AMPropsReducer.navigate?.useNavigate)();
  const location = useSelector((state: AMState) => state.AMPropsReducer.navigate?.useLocation)();

  const selectedOpt = (
    type: OptSTypes,
    id: string,
    label: string,
    opts?: any[],
    icon?: any,
    path?: string,
    forceSelect?: boolean,
    click?: () => void
  ) => {
    const hasSubOpts = opts?.length;

    if (!hasSubOpts && !path && !click) return;

    if (path || forceSelect || (!hasSubOpts && selectedData?.label !== label)) {
      dispatch(
        selectData({
          label,
          icon,
          id,
        })
      );
      //console.log("path", path, click);
      click && click();
      navigate && location.pathname !== path && path && navigate(path);
    }
    /* if (hasSubOpts && path && !(selectedData?.label === label)) return; */
    if (!hasSubOpts && selectedData?.label === label) return;
    switch (type) {
      case "opt":
        dispatch(selectOption(id));
        break;
      case "subopt":
        dispatch(selectSubOption(id));
        break;
      case "subsubopt":
        dispatch(selectSubSubOption(id));
        break;
    }
  };

  return { selectedOpt };
};
