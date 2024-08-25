import styled from "styled-components";
import { ATHOSColors } from "../../colors/colors";
import { ATHOSButton_dftanim, ATHOSButton_dftprops } from "./defaults";

export const ATHOSButton_default = styled.div`
  background-color: white;
  outline: 0.1rem solid ${ATHOSColors.grey.default};
  color: ${ATHOSColors.black};
  ${ATHOSButton_dftprops}
  ${ATHOSButton_dftanim}
`;

export const ATHOSButton_alt = styled.div`
  background-color: ${ATHOSColors.black};
  outline: none;
  color: ${ATHOSColors.white};
  ${ATHOSButton_dftprops}
  ${ATHOSButton_dftanim}
`;
export const ATHOSButton_action = styled.div`
  background-color: ${ATHOSColors.aqua.default};
  outline: 0.1rem solid ${ATHOSColors.aqua.dark};
  color: ${ATHOSColors.white};
  ${ATHOSButton_dftprops}
  ${ATHOSButton_dftanim}

    &:hover {
    background-color: rgb(28, 167, 160);
  }
`;

export const ATHOSButton_disabled = styled.div`
  background-color: ${ATHOSColors.grey.default};
  outline: none;
  color: ${ATHOSColors.white};
  ${ATHOSButton_dftprops}
  cursor: not-allowed;
`;
