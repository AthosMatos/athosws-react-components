import { FaLock, FaUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import styled from "styled-components";
import { ATHOSColors } from "../../colors/colors";
import { JIIconsDefault } from "./defaults";

export const JIInput = styled.input`
  border: none;
  width: 100%;
  font-size: 1rem;
  background-color: transparent;
  outline: none;
  font-weight: 400;
  color: ${ATHOSColors.black};

  &:focus {
    outline: none;
  }
`;

type InputProps = {
  focused: boolean;
  error?: boolean;
};

export const JIInputWrapper = styled.div<InputProps>`
  display: flex;
  align-items: center;
  cursor: text;
  gap: 0.6rem;
  outline: 1px solid ${ATHOSColors.grey.light};
  border-radius: 0.3rem;
  padding: 0.8rem 1rem;
  background-color: ${ATHOSColors.grey.lighter};
  transition: all 0.14s;

  ${({ focused }) =>
    focused && `outline: 1px solid ${ATHOSColors.aqua.default};`}

  //on error shake
    ${({ error }) =>
    error &&
    `
        animation: shake 0.2s;
        animation-iteration-count: 1;
        outline: 1px solid ${ATHOSColors.red.default};
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

type ATHOSInputIconProps = {
  error?: boolean;
};

export const JIUserIcon = styled(FaUser)<ATHOSInputIconProps>`
  ${JIIconsDefault}
  ${({ error }) =>
    error &&
    `
        color: ${ATHOSColors.red.default};
    `}
`;

export const JILockIcon = styled(FaLock)<ATHOSInputIconProps>`
  ${JIIconsDefault}
  ${({ error }) =>
    error &&
    `
        color: ${ATHOSColors.red.default};
    `}
`;
export const JIIconWrapper = styled.div<{ iconSize: number | string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ iconSize }) =>
    typeof iconSize === "number" ? `${iconSize}rem ` : iconSize};
  height: ${({ iconSize }) =>
    typeof iconSize === "number" ? `${iconSize}rem ` : iconSize};
`;
export const JIEyeIcon = styled(IoEye)<ATHOSInputIconProps>`
  cursor: pointer;
  ${JIIconsDefault}
  font-size: 1.6rem;
`;

export const JIEyeOffIcon = styled(IoEyeOff)<ATHOSInputIconProps>`
  cursor: pointer;

  ${JIIconsDefault}
  font-size: 1.6rem;
`;

export const ATHOSInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  width: fit-content;
`;

export const JIInputLabel = styled.label`
  font-size: 1rem;
  color: ${ATHOSColors.grey.dark};
`;
export const JIErrorLabel = styled.label`
  font-size: 1rem;
  color: ${ATHOSColors.red.default};
  align-self: flex-end;
`;

export const JILabelsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
