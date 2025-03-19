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
  paddingHorizontal?: number;
  vertPad?: number;
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
    style["paddingLeft"] = "0.8rem";
    style["paddingRight"] = "0.8rem";
  }
  if (paddingHorizontal) {
    style["paddingLeft"] = `${paddingHorizontal}px`;
    style["paddingRight"] = `${paddingHorizontal}px`;
  }
  if (vertPad) {
    style["paddingTop"] = `${vertPad}px`;
    style["paddingBottom"] = `${vertPad}px`;
  }
  return style;
};
