import { useEffect, useState } from "react";

const getIsSm = () => window.innerWidth < 640;
const getIsMd = () => window.innerWidth < 768;
const getIsLg = () => window.innerWidth < 1024;
const getIsXl = () => window.innerWidth < 1280;
const getIs2Xl = () => window.innerWidth < 1536;

type Sizes = "sm" | "md" | "lg" | "xl" | "2xl";

const defineSize = () => {
  if (getIsSm()) return "sm";
  if (getIsMd()) return "md";
  if (getIsLg()) return "lg";
  if (getIsXl()) return "xl";
  return "2xl";
};

export const isBiggerThan = (size: Sizes) => {
  switch (size) {
    case "sm":
      if (getIsSm()) return false;
      return true;
    case "md":
      if (getIsSm() || getIsMd()) return false;
      return true;

    case "lg":
      if (getIsSm() || getIsMd() || getIsLg()) return false;
      return true;

    case "xl":
      if (getIsSm() || getIsMd() || getIsLg() || getIsXl()) return false;
      return true;

    case "2xl":
      if (getIsSm() || getIsMd() || getIsLg() || getIsXl() || getIs2Xl()) return false;
      return true;
  }
};
export function useWindowDimensions() {
  const [size, setSize] = useState<Sizes | undefined>(defineSize());
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => {
      setSize(defineSize());
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { size, dimensions };
}
