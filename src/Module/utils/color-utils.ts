import chroma from "chroma-js";
const hexToRgbaString = (hex: string) => {
  const rgba = chroma(hex).rgba();
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
};

/**
 * Generates a set of color shades based on the provided base color.
 *
 * Uses the `chroma-js` library to create a lighter and darker set of shades for the given color.
 *
 * @param {string} colorr - The base color in any valid CSS color format (e.g., hex, rgb, etc.).
 * @returns {Object} An object containing the following shades of the color:
 * - `lighter`: A lighter shade of the color.
 * - `light`: A light shade of the color.
 * - `default`: The original color.
 * - `dark`: A dark shade of the color.
 * - `darker`: A darker shade of the color.
 */
export const generateColorShades = (colorr: string) => {
  let color = colorr === "transparent" ? "rgba(0,0,0,0)" : colorr;
  const chromaColor = chroma(color);
  // Use chroma-js to create different shades by adjusting the luminance
  const lighter = hexToRgbaString(chromaColor.brighten(1.5).hex()); // Lighter shade
  const light = hexToRgbaString(chromaColor.brighten(0.75).hex()); // Light shade
  const dark = hexToRgbaString(chromaColor.darken(0.75).hex()); // Dark shade
  const darker = hexToRgbaString(chromaColor.darken(1.5).hex()); // Darker shade
  const darker2 = hexToRgbaString(chromaColor.darken(2).hex()); // Darker shade
  return {
    lighter,
    light,
    default: color,
    dark,
    darker,
    darker2,
  };
};

/**
 * Determines the appropriate contrast color (black or white) based on the luminance of the given color.
 *
 * Uses the `chroma-js` library to compute the luminance of the color and returns either "black" or "white"
 * to ensure good contrast and readability against the given color.
 *
 * @param {string} color - The base color in any valid CSS color format (e.g., hex, rgb, etc.).
 * @returns {string} "black" if the luminance of the color is above 0.5, otherwise "white".
 */
export const getContrastColor = (color: string) => {
  const chromaColor = chroma(color);
  return chromaColor.luminance() > 0.5 ? "black" : "white";
};

export const getContrastColorful = (color: string) => {
  const chromaColor = chroma(color);
  const shades = generateColorShades(color);
  return chromaColor.luminance() > 0.5 ? shades.darker : shades.lighter;
};
export const getContrastColor_Multiple = (colors: string[]) => {
  const luminanceSum = colors.reduce((sum, color) => sum + chroma(color).luminance(), 0);
  const averageLuminance = luminanceSum / colors.length;
  console.log(averageLuminance);
  return averageLuminance > 0.5 ? "black" : "white";
};

export const forceOpacity = (color: string, opacity: number) => {
  const chromaColor = chroma(color);
  return chromaColor.alpha(opacity).css();
};
