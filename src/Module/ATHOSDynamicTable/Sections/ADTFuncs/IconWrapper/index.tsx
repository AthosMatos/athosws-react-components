export const IconWrapper = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="transition-all active:scale-100 cursor-pointer hover:scale-95 rounded-md border border-gray-300 w-9 h-9 flex items-center justify-center"
  >
    {children}
  </div>
);
