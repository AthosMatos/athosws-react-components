import { useEffect, useState } from "react";
import styled from "styled-components";
import { ATHOSColors } from "../../../../colors/colors";
import {
  generateColorShades,
  getContrastColor,
} from "../../../../utils/color-utils";
import { useATHOSSideMenu } from "../../../context/context";
import {
  ASMSOWProps,
  ASMSubOptionsWrapperProps,
  ASMSubOptionWrapperProps,
} from "./interfaces";
export const suboptheight = "2.4rem";
export const ASMSubOptionLabel = styled.label`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: inherit;
  pointer-events: none;
`;

export const ASMSOW = styled.div<ASMSOWProps>`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  height: ${suboptheight};
  padding: 0rem 0.8rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: transform 0.14s, background-color 0.14s, color 0.14s;
  user-select: none;
  pointer-events: ${({ editing }) => (editing ? "none" : "auto")};
  transform: ${({ scale }) => `scale(${scale})`};
  background-color: ${({ background }) => background};
  color: ${({ textColor }) => textColor};
`;
export const ASMSubOptionsWrapper = styled.div<ASMSubOptionsWrapperProps>`
  display: flex;
  width: 80%;
  align-self: flex-end;
  flex-direction: column;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  overflow: hidden;
  gap: ${({ isOpen }) => isOpen && "0.4rem"};
  transition: all 0.12s;
  padding: ${({ isOpen }) => (isOpen ? "0.4rem" : "0px")};
  height: ${({ isOpen, ChildrenHeight }) => (isOpen ? ChildrenHeight : "0px")};
`;

/*
  const colors = {
      backColor: "transparent",
      textColor: "white",
      hover: {
        backColor: "#5c5c5c",
        textColor: "white",
        clicked: {
          backColor: "#2c7919",
          textColor: "white",
        },
      },
      clicked: {
        backColor: "#38a01e",
        textColor: "white",
      },
  }; 
*/
export const ASMSubOptionWrapper = (props: ASMSubOptionWrapperProps) => {
  const { clicked, label, children, onClick, colorConfig } = props;

  const {
    props: { colors },
    editing,
    hideMenu,
  } = useATHOSSideMenu();

  const [backColor, setBackColor] = useState(
    colorConfig?.backColor || "transparent"
  );
  const [textColor, setTextColor] = useState(
    colorConfig?.textColor ||
      (colors.background ? getContrastColor(colors.background) : "black")
  );
  const [isOver, setIsOver] = useState(false);
  const [scale, setScale] = useState(1);

  /*  useEffect(() => {
    console.log("textColor", textColor);
  }, [textColor]); */

  const setHoverColor = () => {
    if (clicked) {
      const dftColor = colors.primary
        ? generateColorShades(colors.primary).darker
        : ATHOSColors.red.darker;
      setBackColor(colorConfig?.hover?.clicked?.backColor || dftColor);
      setTextColor(
        colorConfig?.hover?.clicked?.textColor || getContrastColor(dftColor)
      );
    } else {
      console.log("hover");
      const dftColor = colors.accent ?? ATHOSColors.grey.light;
      setBackColor(colorConfig?.hover?.backColor || dftColor);
      setTextColor(colorConfig?.hover?.textColor || getContrastColor(dftColor));
    }
  };

  useEffect(() => {
    if (isOver) {
      setHoverColor();
    } else {
      if (clicked) {
        const dftColor = colors.primary
          ? generateColorShades(colors.primary).default
          : ATHOSColors.red.default;
        setBackColor(colorConfig?.clicked?.backColor || dftColor);
        setTextColor(
          colorConfig?.clicked?.textColor || getContrastColor(dftColor)
        );
      } else {
        setBackColor(colorConfig?.backColor || "transparent");
        setTextColor(
          colorConfig?.textColor ||
            (colors.background ? getContrastColor(colors.background) : "black")
        );
      }
    }
  }, [clicked, isOver]);

  const onOver = () => {
    setIsOver(true);
  };
  const onOut = () => {
    setIsOver(false);
  };
  const onMouseDown = () => {
    setScale(1.04);
  };
  const onMouseUp = () => {
    setScale(1);
  };

  return (
    <ASMSOW
      editing={editing}
      background={backColor}
      textColor={textColor}
      onMouseOver={onOver}
      onMouseOut={onOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClick}
      scale={scale}
    >
      {children}
    </ASMSOW>
  );
};
