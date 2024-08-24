import { IconType } from "react-icons";
import {
    adaptSize,
    getUnitWithoutValue,
    getValueWithoutUnit
} from "../../utils";
import { useJvrisSideBar } from "../context";
import {
    JSBArrowDown,
    JSBIconWrapper,
    JSBLabelIconWrapper,
    JSBOptionContainer,
    JSBOptionLabel,
    JSBOptionWrapper,
    JSBSubOptionsWrapper
} from "../styled/styled";

interface JSBOptionProps {
    Icon: IconType;
    iconSize?: string | number;
    label: string;
    children?: React.ReactNode;
    index: number;
}

const JSBOption = ({
    index,
    Icon,
    label,
    children,
    iconSize
}: JSBOptionProps) => {
    const { size, selectOption, selectDataTrack } = useJvrisSideBar();

    const hasChildren = !(children == undefined || children == null);
    const isOpen = selectDataTrack[index].show;

    const childrenHeight = (children as any)?.length;

    return (
        <JSBOptionContainer size={size}>
            <JSBOptionWrapper
                onClick={() => {
                    selectOption(index);
                }}
                size={size}
                hasChildren={hasChildren}
                clicked={isOpen}
            >
                <JSBLabelIconWrapper size={size}>
                    <JSBIconWrapper size={size}>
                        <Icon
                            style={{
                                pointerEvents: "none"
                            }}
                            size={
                                iconSize
                                    ? typeof iconSize == "string"
                                        ? `${adaptSize(
                                              size,
                                              getValueWithoutUnit(iconSize),
                                              getUnitWithoutValue(iconSize)
                                          )}`
                                        : `${adaptSize(size, iconSize, "rem")}`
                                    : `${adaptSize(size, 2.4, "rem")}`
                            }
                        />
                    </JSBIconWrapper>

                    <JSBOptionLabel size={size}>{label}</JSBOptionLabel>
                </JSBLabelIconWrapper>

                {children && <JSBArrowDown size={size} clicked={isOpen} />}
            </JSBOptionWrapper>

            {children && (
                <JSBSubOptionsWrapper
                    ChildrenHeight={`calc((${adaptSize(
                        size,
                        0.4,
                        "rem"
                    )} + ${adaptSize(size, 33.6, "px")} + ${adaptSize(
                        size,
                        0.6,
                        "rem"
                    )} + ${adaptSize(size, 0.4, "rem")}) * ${childrenHeight})`}
                    isOpen={isOpen}
                    size={size}
                >
                    {children}
                </JSBSubOptionsWrapper>
            )}
        </JSBOptionContainer>
    );
};

export default JSBOption;
