import { ReactNode } from "react";

interface ADTCellColumnV2Props {
  value?: ReactNode;
}

const ADTCellColumnV2 = ({ value }: ADTCellColumnV2Props) => {
  return <td className="">{value}</td>;
};

export default ADTCellColumnV2;
