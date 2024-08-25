import chroma from "chroma-js";

export const adaptSize = (size: number, refValue: number, unit: string) => {
  return `${(refValue * size) / 5}${unit}`;
};

export const getValueWithoutUnit = (value: string) => {
  return parseFloat(value.replace(/[a-z]/gi, ""));
};

export const getUnitWithoutValue = (value: string) => {
  return value.replace(/[0-9]/gi, "");
};

export const generateColorShades = (
  color: string
): {
  lighter: string;
  light: string;
  default: string;
  dark: string;
  darker: string;
} => {
  const chromaColor = chroma(color);
  // Use chroma-js to create different shades by adjusting the luminance
  const lighter = chromaColor.brighten(1.5).hex(); // Lighter shade
  const light = chromaColor.brighten(0.75).hex(); // Light shade
  const dark = chromaColor.darken(0.75).hex(); // Dark shade
  const darker = chromaColor.darken(1.5).hex(); // Darker shade

  return {
    lighter,
    light,
    default: color,
    dark,
    darker,
  };
};
