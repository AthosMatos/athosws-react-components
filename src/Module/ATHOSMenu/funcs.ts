import { AMOptColorsProps, ColorOptType } from "./interfaces";

const gCWD = (
  colors: { opts?: AMOptColorsProps; subopts?: AMOptColorsProps; subsubopts?: AMOptColorsProps },
  defaults?: AMOptColorsProps
): AMOptColorsProps | undefined => {
  if (!colors && !defaults) return undefined;
  return {
    text: colors?.subsubopts?.text || colors?.subopts?.text || colors?.opts?.text || defaults?.text,
    background: colors?.subsubopts?.background || colors?.subopts?.background || colors?.opts?.background || defaults?.background,
    border: colors?.subsubopts?.border || colors?.subopts?.border || colors?.opts?.border || defaults?.border,
    icon: colors?.subsubopts?.icon || colors?.subopts?.icon || colors?.opts?.icon || defaults?.icon,
    className: colors?.subsubopts?.className || colors?.subopts?.className || colors?.opts?.className || defaults?.className,
  };
};

export const getColorsWDefault = (opts?: ColorOptType, subopts?: ColorOptType, subsubopts?: ColorOptType): ColorOptType => {
  const defaults = subsubopts?.defaults || subopts?.defaults || opts?.defaults;

  const colors = {
    clicked: gCWD({ opts: opts?.clicked, subopts: subopts?.clicked, subsubopts: subsubopts?.clicked }, defaults),
    hover: gCWD({ opts: opts?.hover, subopts: subopts?.hover, subsubopts: subsubopts?.hover }, defaults),
    normal: gCWD({ opts: opts?.normal, subopts: subopts?.normal, subsubopts: subsubopts?.normal }, defaults),
    defaults,
  };

  return colors;
};

/* export function genOpts<T>(routes: OptsProps<T>) {
  return Object.entries(routes).reduce((acc, [key,value]) => {
    return {
      ...acc,
      [key]: {
        ...value as any,
        
      },
    } ;
  }, {} as OptsProps<T>);
}
   */
/* Object.values(routes).map((route) => ({
    label: route.label,
    path: route.path,
    icon: route.icon,
    subOpts:
      route.subOpts &&
      Object.values(route.subOpts).map((subOpt) => ({
        label: subOpt.label,
        path: subOpt.path,
        icon: subOpt.icon,
        subSubOpts:
          subOpt.subSubOpts &&
          Object.values(subOpt.subSubOpts).map((subSubOpt) => ({
            label: subSubOpt.label,
            path: subSubOpt.path,
            icon: subSubOpt.icon,
          })),
      })),
  })); */
