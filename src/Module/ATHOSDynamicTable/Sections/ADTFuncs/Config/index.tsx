import { FaFilter } from "react-icons/fa";
import { MdTune } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ATHOSDropDown2 } from "../../../../ATHOSDropDown";
import { LabelI } from "../../../../ATHOSDropDown/interfaces";
import { generateColorShades } from "../../../../utils/color-utils";
import { toggleColOrderFilter } from "../../../redux/Filtering/provider";
import { ADTState } from "../../../redux/store";
import { IconWrapper } from "../IconWrapper";
import ItemWrapper from "../ItemWrapper";
import ColumnsItem from "./ColumnsItem";

const FilterItem = () => {
  const { showColFilter } = useSelector((state: ADTState) => ({
    showColFilter: state.ADTFilteringReducer.showColOrderFilter,
  }));
  return <ItemWrapper label="Filtros" isSelected={showColFilter} icon={<FaFilter size={18} />} />;
};

const ADTConfig = () => {
  const dispatch = useDispatch();
  const options: LabelI[] = [
    {
      label: <ColumnsItem />,
      // onClick: onClick,
    },
    {
      label: <FilterItem />,
      onClick: () => {
        dispatch(toggleColOrderFilter());
      },
    },
  ];
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor);

  return (
    <ATHOSDropDown2
      position="left"
      borderColor={accentColor && generateColorShades(accentColor).light}
      wrapperBackColor={accentColor}
      labels={options}
    >
      <IconWrapper>
        <MdTune className="text-2xl" />
      </IconWrapper>
    </ATHOSDropDown2>
  );
};

export default ADTConfig;
