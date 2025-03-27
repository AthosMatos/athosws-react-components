interface ItemWrapperProps {
  label: string;
  icon?: React.ReactNode;
  open?: boolean;
  onClick?: () => void;
}

export const ItemWrapper = ({ open, onClick, label, icon }: ItemWrapperProps) => {
  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      className={`
      transition-all active:scale-95 cursor-pointer hover:dark:text-white hover:text-black 
      rounded-md border border-zinc-300 dark:border-zinc-600 px-3 h-9 text-sm gap-2
      flex items-center justify-center ${open ? "bg-zinc-200 dark:text-white text-black dark:bg-zinc-700" : ""}
      `}
    >
      {icon}
      {label}
    </div>
  );
};

interface IconWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
  open?: boolean;
  wref?: any;
}

export const IconWrapper = ({ children, onClick, open, wref }: IconWrapperProps) => {
  return (
    <div
      ref={wref}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      className={`
      transition-all active:scale-95 cursor-pointer hover:dark:text-white hover:text-black 
      rounded-md border border-zinc-300 dark:border-zinc-600 w-9 h-9 
      flex items-center justify-center ${open ? "bg-zinc-200 dark:text-white text-black dark:bg-zinc-700" : ""}
   
      `}
    >
      {children}
    </div>
  );
};
