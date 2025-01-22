import { AnimatePresence } from "framer-motion";
import { useATHOSSideMenu } from "../../../context/context";
import { ASMArrowDown, ASMIconWrapper, ASMLabelIconWrapper, defaulIconSize } from "../../../styled";
import { ASMSubSubOptionsWrapper } from "../SubSubOption/styled";
import { ASMSubOptionProps } from "./interfaces";
import { ASMSubOptionLabel, ASMSubOptionWrapper } from "./styled";

const ASMSubOption = ({ parentId, subopt, children }: ASMSubOptionProps) => {
  const { selectSubOption, hideMenu } = useATHOSSideMenu();
  const isOpen = subopt.selected;
  const hasChildren = !!(subopt.subSubOptions?.length && subopt.subSubOptions?.length > 0);
  const hasSelectedChildren = !!subopt.subSubOptions?.some((subsub) => subsub.selected);
  const { label, Icon, colorConfig, iconSize } = subopt;
  return (
    <div className="flex flex-col">
      <ASMSubOptionWrapper
        hasChildren={hasChildren}
        hasSelectedChildren={hasSelectedChildren}
        colorConfig={colorConfig}
        label={label}
        clicked={isOpen || hasSelectedChildren}
        onClick={() => {
          selectSubOption(parentId, subopt.id);
        }}
      >
        <ASMLabelIconWrapper>
          {Icon && (
            <ASMIconWrapper iconSize={defaulIconSize}>
              {typeof Icon === "function" ? (
                <Icon
                  style={{
                    pointerEvents: "none",
                    //color: colors.accent,
                  }}
                  size={iconSize ?? defaulIconSize}
                />
              ) : (
                Icon
              )}
            </ASMIconWrapper>
          )}
          <ASMSubOptionLabel>{subopt.label}</ASMSubOptionLabel>
        </ASMLabelIconWrapper>

        {children && !hideMenu && <ASMArrowDown clicked={isOpen} />}
      </ASMSubOptionWrapper>
      <AnimatePresence>
        {children && !hideMenu && isOpen && (
          <ASMSubSubOptionsWrapper
            style={{
              gap: "0.4rem",
            }}
            initial={{
              height: 0,
              padding: 0,
            }}
            animate={{
              height: "auto",
              padding: "0.3rem",
            }}
            exit={{
              height: 0,
              //gap: 0,
              padding: 0,
            }}
          >
            {children}
          </ASMSubSubOptionsWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ASMSubOption;
