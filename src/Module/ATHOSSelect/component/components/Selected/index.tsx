import { AnimatePresence } from "framer-motion";
import React from "react";
import { FaCaretDown } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import { useATHOSSelectContext } from "../../context";
import SelectedItem from "../SelectedItem";

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
    props: { className, style, multiSelect },
    updating,
    labels,
    selectedItems: selected,
  } = useATHOSSelectContext();

  return (
    <button
      className={`${className} min-w-[100px] min-h-[40px] relative flex items-center px-3 gap-2`}
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
      {updating ? (
        <VscLoading className="animate-spin" />
      ) : (
        <CheckAnimateWrapper isMulti={!!multiSelect}>
          {selected.map((item) => {
            const label = labels?.find((label) => label.value === item)?.label;
            return (
              label && (
                <SelectedItem isMultiSelect={!!multiSelect} key={item}>
                  {label}
                </SelectedItem>
              )
            );
          })}
        </CheckAnimateWrapper>
      )}

      <FaCaretDown className={`transition-all duration-200 ease-in-out right-3 absolute ${isOpened ? "rotate-180" : ""}`} size={16} />
    </button>
  );
};

export default Selected;
