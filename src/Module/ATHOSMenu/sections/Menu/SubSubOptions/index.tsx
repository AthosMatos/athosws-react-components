import HeightAnimDiv from "../../../components/HeightAnimDiv";
import { SubSubOptionProps } from "../../../interfaces";
import SubSubOption from "./SubSubOption";

interface MenuSubSubOptionsProps {
  show: boolean;
  subSubOpts?: SubSubOptionProps[];
  optIndex: number;
  subOptIndex: number;
}
const SubSubOptions = ({ show, subSubOpts, optIndex, subOptIndex }: MenuSubSubOptionsProps) => {
  return (
    <HeightAnimDiv show={show && !!subSubOpts && subSubOpts.length > 0}>
      {subSubOpts?.map((subsubopt, index) => (
        <SubSubOption key={`${subsubopt.label}-${index}`} {...subsubopt} optIndex={optIndex} subOptIndex={subOptIndex} index={index} />
      ))}
    </HeightAnimDiv>
  );
};

export default SubSubOptions;
