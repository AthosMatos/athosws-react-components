export const tdClassName = (index: number, persistPrimaryColumn: any) => `${persistPrimaryColumn && index === 0 ? `sticky ` : ""}`;

export const getCellWrapperStyle = ({
  bLeft,
  bRightLeft,
  paddingHorizontal,
  vertPad,
  bRight,
}: {
  bLeft?: boolean;
  bRightLeft?: boolean;
  paddingHorizontal?: number | string;
  vertPad?: number | string;
  bRight?: boolean;
}) => {
  const style = {} as any;
  if (bLeft) {
    style["paddingLeft"] = "0.8rem";
  }
  if (bRight) {
    style["paddingRight"] = "0.8rem";
  }
  if (bRightLeft) {
    style["paddingLeft"] = "0.4rem";
    style["paddingRight"] = "0.8rem";
  }
  if (paddingHorizontal) {
    style["paddingLeft"] = paddingHorizontal;
    style["paddingRight"] = paddingHorizontal;
  }
  if (vertPad) {
    style["paddingTop"] = vertPad;
    style["paddingBottom"] = vertPad;
  }
  return style;
};
