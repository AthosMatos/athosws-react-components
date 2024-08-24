import styled from "styled-components";
import { JvrisColors } from "../../colors/colors";
import { jvrisButton_dftanim, jvrisButton_dftprops } from "./defaults";

export const JvrisButton_default = styled.div<{ size: number }>`
    background-color: white;
    outline: 0.1rem solid ${JvrisColors.grey.default};
    color: ${JvrisColors.black};
    ${({ size }) => jvrisButton_dftprops(size)}
    ${jvrisButton_dftanim}
`;

export const JvrisButton_alt = styled.div<{ size: number }>`
    background-color: ${JvrisColors.black};
    outline: none;
    color: ${JvrisColors.white};
    ${({ size }) => jvrisButton_dftprops(size)}
    ${jvrisButton_dftanim}
`;
export const JvrisButton_action = styled.div<{ size: number }>`
    background-color: ${JvrisColors.jvrisAqua.default};
    outline: 0.1rem solid ${JvrisColors.jvrisAqua.dark};
    color: ${JvrisColors.white};
    ${({ size }) => jvrisButton_dftprops(size)}
    ${jvrisButton_dftanim}

    &:hover {
        background-color: rgb(28, 167, 160);
    }
`;

export const JvrisButton_disabled = styled.div<{ size: number }>`
    background-color: ${JvrisColors.grey.default};
    outline: none;
    color: ${JvrisColors.white};
    ${({ size }) => jvrisButton_dftprops(size)}
    cursor: not-allowed;
`;
