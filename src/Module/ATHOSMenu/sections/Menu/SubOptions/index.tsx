import HeightAnimDiv from "../../../components/HeightAnimDiv";
import { SubOptionProps } from "../../../interfaces";
import SubOption from "./SubOption";

interface MenuSubOptionProps {
  optIndex: number;
  subOpts?: SubOptionProps[];
  show: boolean;
}

const SubOptions = ({ subOpts, show, optIndex }: MenuSubOptionProps) => {
  return (
    <HeightAnimDiv show={show && !!subOpts && subOpts.length > 0}>
      {subOpts?.map((subopt, index) => (
        <SubOption key={`${subopt.label}-${index}`} index={index} optIndex={optIndex} {...subopt} />
      ))}
    </HeightAnimDiv>
  );
};

export default SubOptions;
