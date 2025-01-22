import { AnimatePresence } from "framer-motion";
import { Draggable } from "react-beautiful-dnd";
import { ATHOSColors } from "../../../../colors/colors";
import { getContrastColor } from "../../../../utils/color-utils";
import { useATHOSSideMenu } from "../../../context/context";
import { ASMArrowDown, ASMIconWrapper, ASMLabelIconWrapper, defaulIconSize } from "../../../styled";
import { ASMSubOptionsWrapper } from "../SubOption/styled";
import { ASMOptionProps } from "./interfaces";
import { ASMOptionContainer, ASMOptionLabel, ASMOptionWrapper, IconlessLabel } from "./styled";

const ASMOption = ({ option, children, index }: ASMOptionProps) => {
  const {
    selectOption,
    props: {
      colors: { background },
    },
    hideMenu,
    editing,
  } = useATHOSSideMenu();
  const { label, Icon, iconSize, colorConfig } = option;

  const hasChildren = !(children == undefined || children == null);
  const isOpen = option.selected;
  const hasSelectedChildren = option.subOptions?.some((sub) => sub.subSubOptions?.some((subsub) => subsub.selected));
  const backColor = background
    ? getContrastColor(background) == "black"
      ? ATHOSColors.grey.light
      : ATHOSColors.grey.darker
    : ATHOSColors.grey.default;

  const labelAnimProps = {
    initial: {
      translateY: "-100%",
    },
    animate: {
      translateY: 0,
    },
    exit: {
      translateY: "-100%",
    },
  };

  return (
    <Draggable isDragDisabled={!editing} draggableId={option.id} index={index}>
      {(provided) => (
        <ASMOptionContainer backColor={backColor} provided={provided}>
          <ASMOptionWrapper
            colorConfig={colorConfig}
            label={label}
            hasSelectedChildren={hasSelectedChildren}
            hasChildren={hasChildren}
            clicked={isOpen || hasSelectedChildren}
            onClick={() => {
              !editing && selectOption(option.id);
            }}
          >
            <ASMLabelIconWrapper>
              {Icon && (
                <ASMIconWrapper {...labelAnimProps} iconSize={defaulIconSize}>
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
              <AnimatePresence>
                {hideMenu && !Icon && (
                  <ASMIconWrapper {...labelAnimProps} iconSize={defaulIconSize}>
                    <IconlessLabel>{label[0]}</IconlessLabel>
                  </ASMIconWrapper>
                )}
                {!hideMenu && (
                  <ASMOptionLabel {...labelAnimProps} hasIcon={Icon != undefined} hide={hideMenu}>
                    {label}
                  </ASMOptionLabel>
                )}
              </AnimatePresence>
            </ASMLabelIconWrapper>

            {children && !hideMenu && <ASMArrowDown clicked={isOpen} />}
          </ASMOptionWrapper>
          <AnimatePresence>
            {children && !hideMenu && isOpen && (
              <ASMSubOptionsWrapper
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
                  padding: 0,
                }}
              >
                {children}
              </ASMSubOptionsWrapper>
            )}
          </AnimatePresence>
        </ASMOptionContainer>
      )}
    </Draggable>
  );
};

export default ASMOption;
