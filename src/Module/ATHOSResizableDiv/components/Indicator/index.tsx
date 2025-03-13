interface IndicatorProps {
  isHover: boolean;
  indicatorRef: React.RefObject<HTMLDivElement>;
  indicatorSize: number;
}

const Indicator = ({ isHover, indicatorRef, indicatorSize }: IndicatorProps) => {
  return (
    <div
      ref={indicatorRef}
      style={{
        opacity: isHover ? 1 : 0,
        width: indicatorSize,
        height: indicatorSize,
      }}
      className="absolute bg-red-500 rounded-full"
    />
  );
};

export default Indicator;
