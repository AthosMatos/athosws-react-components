import { FaLock, FaUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import styled from "styled-components";
import { JvrisColors } from "../../colors/colors";
import { adaptSize } from "../../utils";
import { JIIconsDefault } from "./defaults";

export const JIInput = styled.input<{ size: number }>`
    border: none;
    width: 100%;
    font-size: ${({ size }) => `${adaptSize(size, 1.8, "rem")}`};
    background-color: transparent;
    outline: none;
    font-weight: 400;
    color: ${JvrisColors.black};

    &:focus {
        outline: none;
    }
`;

type InputProps = {
    focused: boolean;
    error?: boolean;
    size: number;
};

export const JIInputWrapper = styled.div<InputProps>`
    display: flex;
    align-items: center;
    cursor: text;
    gap: ${({ size }) => `${adaptSize(size, 1.4, "rem")}`};
    width: 100%;
    outline: 1px solid ${JvrisColors.grey.light};
    border-radius: ${({ size }) => `${adaptSize(size, 0.5, "rem")}`};
    padding: ${({ size }) =>
        `${adaptSize(size, 1, "rem")} ${adaptSize(size, 1.5, "rem")}`};
    background-color: ${JvrisColors.grey.lighter};
    transition: all 0.14s;

    ${({ focused }) =>
        focused && `outline: 1px solid ${JvrisColors.jvrisAqua.default};`}

    //on error shake
    ${({ error }) =>
        error &&
        `
        animation: shake 0.2s;
        animation-iteration-count: 1;
        outline: 1px solid ${JvrisColors.red.default};
    `}

    @keyframes shake {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-0.5rem);
        }
        50% {
            transform: translateX(0.5rem);
        }
        75% {
            transform: translateX(-0.5rem);
        }
        100% {
            transform: translateX(0);
        }
    }
`;

type JvrisInputIconProps = {
    error?: boolean;
};

export const JIUserIcon = styled(FaUser)<JvrisInputIconProps>`
    ${JIIconsDefault}
    ${({ error }) =>
        error &&
        `
        color: ${JvrisColors.red.default};
    `}
`;

export const JILockIcon = styled(FaLock)<JvrisInputIconProps>`
    ${JIIconsDefault}
    ${({ error }) =>
        error &&
        `
        color: ${JvrisColors.red.default};
    `}
`;

export const JIEyeIcon = styled(IoEye)<JvrisInputIconProps>`
    cursor: pointer;

    ${JIIconsDefault}
`;

export const JIEyeOffIcon = styled(IoEyeOff)<JvrisInputIconProps>`
    cursor: pointer;

    ${JIIconsDefault}
`;

export const JvrisInputWrapper = styled.div<{ size: number }>`
    display: flex;
    flex-direction: column;
    gap: ${({ size }) => `${adaptSize(size, 0.2, "rem")}`};

    width: ${({ size }) =>
        ` clamp(${adaptSize(size, 20, "rem")}, 100%, ${adaptSize(
            size,
            40,
            "rem"
        )}) `};
`;

export const JIInputLabel = styled.label<{ size: number }>`
    font-size: ${({ size }) => `${adaptSize(size, 1.6, "rem")}`};
    color: ${JvrisColors.grey.dark};
`;
export const JIErrorLabel = styled.label<{ size: number }>`
    font-size: ${({ size }) => `${adaptSize(size, 1.6, "rem")}`};
    color: ${JvrisColors.red.default};
    align-self: flex-end;
`;

export const JILabelsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;
