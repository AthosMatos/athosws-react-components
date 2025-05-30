import { AnimatePresence } from "framer-motion";
import React from "react";

import { PiCaretDownLight } from "react-icons/pi";
import { VscLoading } from "react-icons/vsc";
import { AIInputLabel } from "../../../../ATHOSInput/component/styled";
import { ATHOSTooltip } from "../../../../ATHOSTooltip";
import { useATHOSSelectContext } from "../../context";
import SelectedItem from "./SelectedItem";
const CheckAnimateWrapper = ({ children, isMulti }: { children: React.ReactNode; isMulti: boolean }) => {
  if (isMulti) {
    return <AnimatePresence>{children}</AnimatePresence>;
  }
  return <>{children}</>;
};

const Selected = ({
  setIsOpened,
  id,
  childRef,
  isOpened,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  childRef: React.RefObject<HTMLButtonElement | null>;
  isOpened: boolean;
}) => {
  const {
    props: { className, style, multiSelect, thin, label },
    updating,
    originalLabels,
    selectedItems: selected,
    lastSelected,
  } = useATHOSSelectContext();

  return (
    <button
      className={`${className} min-w-[100px] relative flex items-center ${thin ? "!p-0 justify-between" : ""} ${
        multiSelect ? "px-1" : "px-3"
      } gap-2`}
      onClick={() => setIsOpened((prev) => !prev)}
      ref={childRef}
      popoverTarget={id}
      style={
        {
          anchorName: `--anchor-${id}`,
          ...style,
        } as any
      }
    >
      {thin && label && <AIInputLabel className="!font-medium dark:!text-white !text-black">{label}</AIInputLabel>}
      <div className={`flex items-center ${thin ? "justify-end" : ""} gap-2 w-full`}>
        <div className={`flex gap-2 ${thin ? "text-zinc-500 dark:text-zinc-400" : "w-full"}`}>
          {updating && !multiSelect ? (
            <VscLoading className="animate-spin" />
          ) : (
            <CheckAnimateWrapper isMulti={!!multiSelect}>
              {selected.slice(0, 3).map((item) => {
                const label = originalLabels?.find((label) => label.value === item)?.label;

                return (
                  label && (
                    <SelectedItem lastSelected={item == lastSelected} isMultiSelect={!!multiSelect} key={item}>
                      {label}
                    </SelectedItem>
                  )
                );
              })}
              {selected.length > 3 && (
                <ATHOSTooltip
                  followCursor
                  tooltipContent={
                    <div className="flex flex-col">
                      {selected.slice(3).map((item) => (
                        <p>{originalLabels?.find((label) => label.value === item)?.label}</p>
                      ))}
                    </div>
                  }
                >
                  <SelectedItem isMultiSelect={!!multiSelect}>
                    <span className="text-sm">{`+${selected.length - 3}`}</span>
                  </SelectedItem>
                </ATHOSTooltip>
              )}
            </CheckAnimateWrapper>
          )}
        </div>

        <PiCaretDownLight
          className={`transition-all duration-200 ease-in-out mr-3 ${
            isOpened ? `${thin ? "rotate-[-0deg]" : "rotate-180"}` : `${thin ? "rotate-[-90deg]" : ""}`
          }`}
          size={16}
        />
      </div>
    </button>
  );
};

export default Selected;
