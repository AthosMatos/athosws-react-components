import { FaLock, FaUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import styled from "styled-components";
import { ATHOSColors } from "../../colors/colors";
import { AIIconsDefault } from "./defaults";

export const AIInput = styled.input`
  border: none;
  font-size: 1rem;
  background-color: transparent;
  outline: none;
  font-weight: 400;
  color: ${"black"};

  &:focus {
    outline: none;
  }
`;

type InputProps = {
  focused: boolean;
  error?: boolean;
};

export const AIInputWrapper = styled.div<InputProps>`
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

export const AIUserIcon = styled(FaUser)<ATHOSInputIconProps>`
  ${AIIconsDefault}
  ${({ error }) =>
    error &&
    `
        color: ${ATHOSColors.red.default};
    `}
`;

export const AILockIcon = styled(FaLock)<ATHOSInputIconProps>`
  ${AIIconsDefault}
  ${({ error }) =>
    error &&
    `
        color: ${ATHOSColors.red.default};
    `}
`;
export const AIIconWrapper = styled.div<{ iconSize: number | string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ iconSize }) =>
    typeof iconSize === "number" ? `${iconSize}rem ` : iconSize};
  height: ${({ iconSize }) =>
    typeof iconSize === "number" ? `${iconSize}rem ` : iconSize};
`;
export const AIEyeIcon = styled(IoEye)<ATHOSInputIconProps>`
  cursor: pointer;
  ${AIIconsDefault}
  font-size: 1.6rem;
`;

export const AIEyeOffIcon = styled(IoEyeOff)<ATHOSInputIconProps>`
  cursor: pointer;

  ${AIIconsDefault}
  font-size: 1.6rem;
`;

export const AIWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: fit-content;
`;

export const AIInputLabel = styled.label`
  font-size: 1rem;
  color: ${ATHOSColors.grey.dark};
`;
export const AIErrorLabel = styled.label`
  font-size: 1rem;
  color: ${ATHOSColors.red.default};
  align-self: flex-end;
`;

export const AILabelsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
