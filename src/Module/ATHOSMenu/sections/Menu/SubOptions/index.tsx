import { useMemo } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import HeightAnimDiv from "../../../components/HeightAnimDiv";
import { SubOptionProps } from "../../../interfaces";
import { AMState } from "../../../redux/store";
import SubOption from "./SubOption";

interface MenuSubOptionProps {
  subOpts?: SubOptionProps[];
  show: boolean;
}

const SubOptions = ({ subOpts, show }: MenuSubOptionProps) => {
  const selectedSubOption = useSelector((state: AMState) => state.AMSelectedReducer.subOptionSelected);

  return (
    <HeightAnimDiv show={show && !!subOpts && subOpts.length > 0}>
      {subOpts?.map((subopt) => {
        const id = useMemo(() => `${subopt.label}-${v4()}`, []);
        return <SubOption id={id} isSelected={selectedSubOption === id} subopt={subopt} />;
      })}
    </HeightAnimDiv>
  );
};

export default SubOptions;
