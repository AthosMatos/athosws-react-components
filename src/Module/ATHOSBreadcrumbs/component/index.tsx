import { FaHouse, FaCaretRight } from "react-icons/fa6";
import { PiCaretRight } from "react-icons/pi";
import { ATHOSDropDown } from "../../ATHOSDropDown/component";
import { useState } from "react";

const ATHOSBreadcrumbs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number>();
  return (
    <div className="flex items-center text-zinc-400">
      <FaHouse />
      <PiCaretRight className="text-lg" />
      <ATHOSDropDown
        onToggle={(isOpen) => {
          setIsOpen(isOpen);
        }}
        className={`bg-zinc-100 border-zinc-300 border border-t-0 px-1 py-1 !rounded-tl-none`}
        spacing={0}
        buttonClassName={`${isOpen ? "bg-zinc-100 px-3 font-medium  border-zinc-300 border border-b-0" : ""} py-1 ${
          isOpen ? "rounded-t-lg" : "rounded-lg"
        }`}
        labelClassName="px-2 py-1 rounded-md border font-medium"
        labels={[
          {
            label: "Dashboard do Procurador",
            onClick: () => {
              setSelectedOpt(0);
            },
            className: `${selectedOpt === 0 ? "bg-white border-zinc-300 text-zinc-700" : "border-transparent"}  `,
          },
          {
            label: "Dashboard RPV",
            onClick: () => {
              setSelectedOpt(1);
            },
            className: `${selectedOpt === 1 ? "bg-white border-zinc-300 text-zinc-700" : "border-transparent"} `,
          },
        ]}
      >
        Gerênciamento
      </ATHOSDropDown>
      <PiCaretRight className="text-lg" />
      <p className="font-bold text-3xl text-zinc-700">Dashboard do Procurador</p>
    </div>
  );
};

export default ATHOSBreadcrumbs;
