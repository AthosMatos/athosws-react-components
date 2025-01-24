import { useMemo } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import HeightAnimDiv from "../../../components/HeightAnimDiv";
import { SubSubOptionProps } from "../../../interfaces";
import { AMState } from "../../../redux/store";
import SubSubOption from "./SubSubOption";

interface MenuSubSubOptionsProps {
  show: boolean;
  subSubOpts?: SubSubOptionProps[];
}
const SubSubOptions = ({ show, subSubOpts }: MenuSubSubOptionsProps) => {
  const selectedSubSubOption = useSelector((state: AMState) => state.AMSelectedReducer.subSubOptionSelected);

  return (
    <HeightAnimDiv show={show && !!subSubOpts && subSubOpts.length > 0} className="w-[96%] gap-1">
      {subSubOpts?.map((subsubopt) => {
        const id = useMemo(() => `${subsubopt.label}-${v4()}`, []);
        return <SubSubOption id={id} isSelected={selectedSubSubOption === id} subsubopt={subsubopt} />;
      })}
    </HeightAnimDiv>
  );
};

export default SubSubOptions;
