interface ItemWrapperProps {
  label: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  extraComponent?: React.ReactNode;
}

const ItemWrapper = ({ isSelected, onClick, extraComponent, label, icon }: ItemWrapperProps) => {
  return (
    <div
      className={`flex justify-between gap-2 transition-colors p-2 cursor-pointer rounded-md active:bg-gray-300 ${
        isSelected ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        {label}
      </div>
      {extraComponent}
    </div>
  );
};

export default ItemWrapper;
