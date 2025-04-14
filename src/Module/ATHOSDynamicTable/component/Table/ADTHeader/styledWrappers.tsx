interface ItemWrapperProps {
  label: string;
  icon?: React.ReactNode;
  open?: boolean;
  onClick?: () => void;
}

export const ListWrapperClassname = `flex gap-1 flex-col shadow-lg flex-1 rounded-lg border w-max 
border-smooth-darker-grey dark:border-zinc-600
text-sm
dark:!bg-zinc-900 dark:!bg-opacity-80 !bg-smooth-grey p-1
h-fit backdrop-blur-sm`;
export const ListButtonClassname = `flex transition-all bg-white bg-opacity-80 dark:bg-pixe dark:bg-opacity-80
          cursor-pointer items-center gap-2 rounded-md p-2 border border-transparent
          hover:border-smooth-darker-grey dark:hover:border-zinc-600 active:scale-95
          text-zinc-600 dark:text-zinc-200`;

/* border border-zinc-300 dark:border-zinc-600  */
const defaultWrapperClassName = (open?: boolean) => `
  transition-all active:scale-95 cursor-pointer hover:dark:text-snow hover:text-coal 
  rounded-md h-10 text-sm gap-2
  flex items-center justify-center ${open ? "dark:bg-snow dark:bg-opacity-5 bg-black bg-opacity-5" : ""}
`;

export const ItemWrapper = ({ open, onClick, label, icon }: ItemWrapperProps) => {
  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      className={`px-3 ${defaultWrapperClassName(open)}`}
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
      className={`w-10 ${defaultWrapperClassName(open)}`}
    >
      {children}
    </div>
  );
};
