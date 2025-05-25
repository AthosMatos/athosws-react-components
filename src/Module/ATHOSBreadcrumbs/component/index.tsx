import { useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { PiCaretRightBold } from "react-icons/pi";
import { ATHOSDropDown } from "../../ATHOSDropDown/component";

const crumbs = [
  {
    crumb: <FaHouse />,
  },

  {
    crumb: "Gerenciamento",
    dropdown: [
      {
        label: "Dashboard do Procurador",
        value: 0,
        path: "/athos/dashboard",
      },
      {
        label: "Dashboard RPV",
        value: 1,
        path: "/athos/dashboard/rpv",
      },
    ],
  },
];

const ATHOSBreadcrumbs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<{ value: number; label: string } | undefined>();
  return (
    <div className="flex items-center text-zinc-400 gap-1">
      {crumbs.map((item, index) => {
        return (
          <>
            {item.dropdown ? (
              <ATHOSDropDown
                key={index}
                onToggle={(isOpen) => {
                  setIsOpen(isOpen);
                }}
                className={`bg-zinc-100 overflow-hidden outline-zinc-300 outline outline-1 px-1 py-1 !rounded-tl-none`}
                spacing={0}
                buttonClassName={`transition-[padding] outline outline-1 outline-b-0 ${
                  isOpen ? "bg-zinc-100 outline-zinc-300 px-2" : "outline-transparent"
                } py-1 ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
                labelClassName="px-2 py-1 rounded-md outline-1 outline"
                labels={item.dropdown.map((opt) => {
                  return {
                    label: opt.label,
                    onClick: () => {
                      setSelectedOpt(opt);
                    },
                    className: `${selectedOpt?.value === opt.value ? "bg-white outline-zinc-300 text-zinc-700" : "outline-transparent"}  `,
                  };
                })}
              >
                {item.crumb}
              </ATHOSDropDown>
            ) : (
              item.crumb
            )}

            <div className="flex items-center gap-2">
              <PiCaretRightBold className="text-lg" />
            </div>
          </>
        );
      })}
      <p className="font-bold text-3xl text-zinc-700">{selectedOpt?.label}</p>
    </div>
  );
};

export default ATHOSBreadcrumbs;
