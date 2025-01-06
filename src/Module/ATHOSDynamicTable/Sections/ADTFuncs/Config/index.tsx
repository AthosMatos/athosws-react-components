import { FaFilter } from "react-icons/fa";
import { MdTune } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ATHOSDropDown2 } from "../../../../ATHOSDropDown2";
import { LabelI } from "../../../../ATHOSDropDown2/interfaces";
import { toggleColOrderFilter } from "../../../redux/Filtering/provider";
import { IconWrapper } from "../IconWrapper";
import ItemWrapper from "../ItemWrapper";
import ColumnsItem from "./ColumnsItem";

const FilterItem = () => {
  return (
    <ItemWrapper
      label="Filtros"
      /*  onClick={onClick}
    extraComponent={<PlusMinus isSelected={isSelected} />} */
      icon={<FaFilter size={18} />}
    />
  );
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
        console.log("filter");
        dispatch(toggleColOrderFilter());
      },
    },
  ];

  return (
    <ATHOSDropDown2 labels={options}>
      <IconWrapper>
        <MdTune className="text-2xl" />
      </IconWrapper>
    </ATHOSDropDown2>
  );
};

export default ADTConfig;
