import styled from "styled-components";
import { ATHOSColors } from "../../colors/colors";

import { generateColorShades, getContrastColor } from "../../utils/color-utils";
import { ATHOSButton_dftanim, ATHOSButton_dftprops } from "./defaults";

interface ButtonsProps {
  color?: string;
  textColor?: string;
  small?: boolean;
}

export const ATHOSButton_default = styled.div<ButtonsProps>`
  background-color: ${(props) => props.color || "white"};
  outline: 0.1rem solid
    ${(props) =>
      props.color
        ? generateColorShades(props.color).darker
        : ATHOSColors.grey.default};
  color: ${(props) =>
    props.textColor || getContrastColor(props.color || "white")};

  ${ATHOSButton_dftprops}
  ${(props) =>
    props.small &&
    `
    padding: 0.4rem;
    font-size: 0.95rem;
  `}
  ${ATHOSButton_dftanim}
`;

export const ATHOSButton_alt = styled.div<ButtonsProps>`
  background-color: ${(props) => props.color || "black"};
  outline: none;
  color: ${(props) =>
    props.textColor || getContrastColor(props.color || "black")};

  ${ATHOSButton_dftprops}
  ${(props) =>
    props.small &&
    `
    padding: 0.4rem;
    font-size: 0.95rem;
  `}
  ${ATHOSButton_dftanim}
`;
export const ATHOSButton_action = styled.div<ButtonsProps>`
  background-color: ${(props) => props.color || ATHOSColors.aqua.default};
  outline: 0.1rem solid
    ${(props) =>
      props.color
        ? generateColorShades(props.color).darker
        : ATHOSColors.aqua.dark};
  color: ${(props) =>
    props.textColor ||
    getContrastColor(props.color || ATHOSColors.aqua.default)};

  ${ATHOSButton_dftprops}
  ${(props) =>
    props.small &&
    `
    padding: 0.4rem;
    font-size: 0.95rem;
  `}
  ${ATHOSButton_dftanim}

    &:hover {
    background-color: ${(props) =>
      props.color
        ? generateColorShades(props.color).dark
        : ATHOSColors.aqua.default_2};
  }
`;

export const ATHOSButton_disabled = styled.div<ButtonsProps>`
  background-color: ${(props) => props.color || ATHOSColors.grey.default};
  outline: none;
  color: ${(props) =>
    props.textColor ||
    getContrastColor(props.color || ATHOSColors.grey.default)};

  ${ATHOSButton_dftprops}
  ${(props) =>
    props.small &&
    `
    padding: 0.4rem;
    font-size: 0.95rem;
  `}
  cursor: not-allowed;
`;
