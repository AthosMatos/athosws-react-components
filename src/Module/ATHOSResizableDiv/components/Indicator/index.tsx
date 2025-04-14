import { ATHOSColors } from "../../../colors/colors";

interface IndicatorProps {
  indicatorRef: any;
  indicatorWrapperRef: any;
  indicatorPadding: number;
  setIsDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Indicator = ({ indicatorRef, indicatorWrapperRef, indicatorPadding, setIsDown }: IndicatorProps) => {
  return (
    <div
      ref={indicatorWrapperRef}
      style={{
        padding: `${indicatorPadding}px`,
        right: 0,
        bottom: 0,
      }}
      className="absolute pointer-events-none"
    >
      <div ref={indicatorRef} className="bg-snow rounded-md p-[0.3rem]">
        <div
          style={{
            backgroundColor: ATHOSColors.aqua.default,
          }}
          className="rounded-full w-full h-full"
        />
      </div>
    </div>
  );
};

export default Indicator;
