import { motion } from "framer-motion";
import { memo } from "react";
import styled from "styled-components";
import { ATHOSColors } from "../../../../../../colors/colors";
import { useADTBorder } from "./useBorder";
export const BRD = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${ATHOSColors.gray.light};
  border-radius: 30px;
  opacity: 0.44;
`;
const BRDWrapper = styled(motion.div)`
  display: flex;
  width: 8px;
  height: 1rem;
  justify-content: center;
  cursor: e-resize;
`;
const ADTBorder = ({
  colID,
  minColWidthToShort,
  setcolshort,
  showBorder,
}: {
  colID: string;
  minColWidthToShort?: number;
  setcolshort: (short: boolean) => void;
  showBorder: boolean;
}) => {
  const { wrapperid } = useADTBorder({
    colID,
    minColWidthToShort,
    setcolshort,
  });
  return (
    <BRDWrapper
      animate={{
        opacity: showBorder ? 1 : 0,
      }}
      id={wrapperid}
    >
      <BRD />
    </BRDWrapper>
  );
};

export default memo(ADTBorder);
