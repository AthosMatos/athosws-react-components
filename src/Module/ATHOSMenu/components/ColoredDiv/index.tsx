const ColoredDiv = ({ colors, children, className }: { colors: any; children: any; className?: string }) => {
  return (
    <div
      className={`h-fit text-black bg-black bg-opacity-35 p-2 ${className}`}
      style={{
        borderWidth: colors?.border?.width,
        borderColor: colors?.border?.color,
        color: colors?.text,
        backgroundColor: colors?.background,
      }}
    >
      {children}
    </div>
  );
};

export default ColoredDiv;
