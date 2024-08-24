import { PiCaretDownBold } from "react-icons/pi";
import styled from "styled-components";
import { JvrisColors } from "../../colors/colors";
import { adaptSize } from "../../utils";

export const JSBContainer = styled.div<{ size: number }>`
    display: flex;
    flex-direction: column;
    width: ${({ size }) =>
        `clamp(${adaptSize(size, 10, "rem")}, ${adaptSize(
            size,
            40,
            "vw"
        )}, ${adaptSize(size, 30, "rem")})`};
    padding: ${({ size }) => `${adaptSize(size, 1.4, "rem")}`};
    height: 100%;
    justify-content: space-between;
    outline: 1px solid ${JvrisColors.grey.light_2};
`;

export const JSBWrapper = styled.div<{ size: number }>`
    display: flex;
    flex-direction: column;
    gap: ${({ size }) => `${adaptSize(size, 0.4, "rem")}`};
    width: 100%;
`;

export const JSBOptionLabel = styled.h1<{ size: number }>`
    font-size: ${({ size }) => `${adaptSize(size, 2, "rem")}`};
    font-weight: 400;
    margin: 0;
    padding: 0;
    color: inherit;
    pointer-events: none;
`;
export const JSBLabelIconWrapper = styled.div<{ size: number }>`
    display: flex;
    gap: ${({ size }) => `${adaptSize(size, 0.8, "rem")}`};
    align-items: center;
    pointer-events: none;
`;
export const JSBIconWrapper = styled.div<{ size: number }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ size }) => `${adaptSize(size, 2.4, "rem")}`};
    height: ${({ size }) => `${adaptSize(size, 2.4, "rem")}`};

    pointer-events: none;
`;
interface JSBOptionWrapperProps {
    clicked?: boolean;
    hasChildren?: boolean;
    size: number;
}

export const JSBSubOptionsWrapper = styled.div<{
    size: number;
    isOpen: boolean;
    ChildrenHeight: string;
}>`
    display: flex;
    width: 80%;
    flex-direction: column;
    pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
    overflow: hidden;
    padding: ${({ isOpen, size }) => isOpen && adaptSize(size, 0.6, "rem")};
    gap: ${({ isOpen, size }) => isOpen && `${adaptSize(size, 0.4, "rem")}`};
    transition: all 0.12s;

    height: ${({ isOpen, ChildrenHeight }) =>
        isOpen ? ChildrenHeight : "0px"};
`;
export const JSBOptionWrapper = styled.div<JSBOptionWrapperProps>`
    display: flex;
    gap: ${({ size }) => `${adaptSize(size, 0.8, "rem")}`};
    align-items: center;
    justify-content: space-between;
    padding: ${({ size }) => `${adaptSize(size, 1.2, "rem")}`};
    border-radius: ${({ size }) => `${adaptSize(size, 0.5, "rem")}`};
    cursor: pointer;
    transition: all 0.14s;
    user-select: none;
    width: 100%;
    color: ${JvrisColors.black};
    &:hover {
        ${({ clicked, hasChildren }) =>
            !clicked
                ? `
        background-color: ${JvrisColors.grey.light_2};
        `
                : hasChildren
                ? `
        background-color: ${JvrisColors.jvrisAqua.darker};
        `
                : `
        background-color: ${JvrisColors.jvrisAqua.dark};
        `}
    }
    transition: all 0.14s;
    //on click create a ripple effect
    &:active {
        ${({ clicked }) =>
            !clicked
                ? `
        background-color: ${JvrisColors.grey.light};
        `
                : `
        background-color: ${JvrisColors.jvrisAqua.default};
        `}

        //color: ${JvrisColors.white};
        transform: scale(1.04);
    }

    ${({ clicked, hasChildren }) =>
        clicked &&
        `
         ${
             hasChildren
                 ? `background-color: ${JvrisColors.jvrisAqua.dark};`
                 : `background-color: ${JvrisColors.jvrisAqua.default};`
         }
        color: ${JvrisColors.white};
    `}
`;

export const JSBSubOptionWrapper = styled.div<JSBOptionWrapperProps>`
    display: flex;
    gap: ${({ size }) => `${adaptSize(size, 0.8, "rem")}`};
    align-items: center;
    justify-content: space-between;
    padding: ${({ size }) => `${adaptSize(size, 0.8, "rem")}`};
    ${({ size }) => `${adaptSize(size, 1.4, "rem")}`};
    border-radius: ${({ size }) => `${adaptSize(size, 0.5, "rem")}`};
    cursor: pointer;
    transition: all 0.14s;
    user-select: none;
    width: 100%;
    color: ${JvrisColors.black};
    &:hover {
        ${({ clicked }) =>
            !clicked
                ? `
        background-color: ${JvrisColors.grey.light_2};
        `
                : `
        background-color: ${JvrisColors.jvrisAqua.dark};
        `}
    }
    transition: all 0.14s;
    //on click create a ripple effect
    &:active {
        ${({ clicked }) =>
            !clicked
                ? `
        background-color: ${JvrisColors.grey.light};
        `
                : `
        background-color: ${JvrisColors.jvrisAqua.default};
        `}

        color: ${JvrisColors.white};
        transform: scale(1.04);
    }

    ${({ clicked }) =>
        clicked &&
        `
        background-color: ${JvrisColors.jvrisAqua.default};
        color: ${JvrisColors.white};
    `}
`;

export const JSBExitContainer = styled.div<{ size: number }>`
    display: flex;
    flex-direction: column;
    gap: ${({ size }) => `${adaptSize(size, 0.4, "rem")}`};
    width: 100%;
    padding: 0 ${({ size }) => `${adaptSize(size, 0.8, "rem")}`};
    transition: all 0.24s ease;
    align-items: flex-end;
`;

export const JSBOptionContainer = styled.div<{ size: number }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-end;
`;

const JSBAD = styled(PiCaretDownBold)`
    transition: all 0.14s;
    pointer-events: none;
`;

export const JSBArrowDown = ({
    clicked,
    size
}: {
    clicked: boolean;
    size: number;
}) => {
    return (
        <JSBAD
            style={{
                transform: clicked ? "rotate(180deg)" : "rotate(0deg)"
            }}
            size={`${adaptSize(size, 1.8, "rem")}`}
        />
    );
};
