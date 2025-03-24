import { FaFilter } from "react-icons/fa";
import { MdTune } from "react-icons/md";
import { useSelector } from "react-redux";

import { ATHOSDropDown } from "../../../../../../../ATHOSDropDown/component";
import { LabelI } from "../../../../../../../ATHOSDropDown/component/interfaces";
import { generateColorShades } from "../../../../../../../utils/color-utils";
import { ADTState } from "../../../../../redux/store";
import { IconWrapper } from "../../IconWrapper";
import ItemWrapper from "../../ItemWrapper";
import ColumnsItem from "./ColumnsItem";

const FilterItem = () => {
  return <ItemWrapper label="Filtros" icon={<FaFilter size={18} />} />;
};

const ADTConfig = () => {
  const options: LabelI[] = [
    {
      label: <ColumnsItem />,
      // onClick: onClick,
    },
  ];
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor);

  return (
    <ATHOSDropDown
      position="left"
      style={{
        borderColor: accentColor && generateColorShades(accentColor).light,
        backgroundColor: accentColor,
      }}
      labels={options}
    >
      <IconWrapper>
        <MdTune className="text-2xl" />
      </IconWrapper>
    </ATHOSDropDown>
  );
};

export default ADTConfig;
