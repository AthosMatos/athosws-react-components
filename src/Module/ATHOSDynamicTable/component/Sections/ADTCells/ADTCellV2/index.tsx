import { ReactNode } from "react";
import { ATHOSTooltip } from "../../../../../ATHOSTooltip";
import { ADTCellColWrapper } from "../../../styled";

interface ADTCellColumnV2Props {
  value?: ReactNode;
}

const ADTCellColumnV2 = ({ value }: ADTCellColumnV2Props) => {
  return (
    <ADTCellColWrapper>
      {
        <ATHOSTooltip followCursor content={value}>
          {(ref) => <div ref={ref}>{value}</div>}
        </ATHOSTooltip>
      }
    </ADTCellColWrapper>
  );
};

export default ADTCellColumnV2;
