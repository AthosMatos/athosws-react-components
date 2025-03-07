import { useSelector } from "react-redux";
import { generateColorShades } from "../../../../../utils/color-utils";
import { ADTState } from "../../../redux/store";

interface IconWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
  open?: boolean;
  wref?: any;
}

export const IconWrapper = ({ children, onClick, open, wref }: IconWrapperProps) => {
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor);
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);

  return (
    <div>
      <div
        ref={wref}
        onMouseDown={(e) => {
          e.preventDefault();
          onClick && onClick();
        }}
        style={{
          backgroundColor: accentColor,
          color: textColor,
          borderColor: accentColor && generateColorShades(accentColor).light,
        }}
        className={`
    transition-all active:scale-100 cursor-pointer hover:scale-95 
    rounded-md border border-gray-300 w-9 h-9 
    flex items-center justify-center ${open ? "bg-gray-100" : ""}
    `}
      >
        {children}
      </div>
    </div>
  );
};
