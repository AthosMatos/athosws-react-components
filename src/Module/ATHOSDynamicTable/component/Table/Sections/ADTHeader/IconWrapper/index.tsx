interface IconWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
  open?: boolean;
  wref?: any;
  style?: React.CSSProperties;
  className?: string;
}

export const IconWrapper = ({ children, onClick, open, wref, className, style }: IconWrapperProps) => {
  return (
    <div
      ref={wref}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      style={style}
      className={`
    transition-all active:scale-100 cursor-pointer hover:scale-95 
    rounded-md border border-gray-300 w-9 h-9 
    flex items-center justify-center ${open ? "bg-gray-100" : ""}
    ${className}
    `}
    >
      {children}
    </div>
  );
};
