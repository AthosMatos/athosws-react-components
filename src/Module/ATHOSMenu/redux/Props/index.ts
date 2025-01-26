import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ATHOSMenuProps, OptionProps, SubOptionProps, SubSubOptionProps } from "../../interfaces";

export type WithId<T> = T & { id: string };
type OptWithId = WithId<OptionProps & { subOpt: WithId<SubOptionProps & { subSubOpt: WithId<SubSubOptionProps>[] }>[] }>;

export interface ATHOSMenuPropsWId extends ATHOSMenuProps {
  /*  options: OptWithId[];
  filledIds: boolean; */
}

const initialState: ATHOSMenuPropsWId = {
  options: [],
  /*  filledIds: false, */
};

const Slice = createSlice({
  name: "AMProps",
  initialState,
  reducers: {
    fillProps: (state, action: PayloadAction<ATHOSMenuProps>) => {
      const payload = action.payload;

      /*  const optWIds = payload.options.map((opt) => {
        const subOpt = opt.subOpts?.map((sub) => {
          const subSubOpt = sub.subSubOpts?.map((subsub) => {
            return { ...subsub, id: v4() };
          });
          return { ...sub, id: v4(), subSubOpt };
        });
        return { ...opt, id: v4(), subOpt };
      }) as OptWithId[]; */
      return { ...state, ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { fillProps } = Slice.actions;

const AMPropsReducer = Slice.reducer;

export default AMPropsReducer;
