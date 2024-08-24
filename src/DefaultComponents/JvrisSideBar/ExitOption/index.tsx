import { IconType } from "react-icons";
import { JvrisColors } from "../../colors/colors";
import {
    adaptSize,
    getUnitWithoutValue,
    getValueWithoutUnit
} from "../../utils";
import { useJvrisSideBar } from "../context";
import {
    JSBExitContainer,
    JSBIconWrapper,
    JSBLabelIconWrapper,
    JSBOptionLabel,
    JSBOptionWrapper
} from "../styled/styled";

interface JSBOptionProps {
    Icon: IconType;
    iconSize?: string | number;
    label: string;
    onClick?: () => void;
}

const JSBExitOption = ({
    Icon,
    label,

    iconSize,
    onClick
}: JSBOptionProps) => {
    const { size } = useJvrisSideBar();

    return (
        <JSBExitContainer size={size}>
            <JSBOptionWrapper
                onClick={() => {
                    onClick();
                }}
                size={size}
            >
                <JSBLabelIconWrapper size={size}>
                    <JSBIconWrapper size={size}>
                        <Icon
                            style={{
                                pointerEvents: "none",
                                color: JvrisColors.red.default
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
            </JSBOptionWrapper>
        </JSBExitContainer>
    );
};

export default JSBExitOption;
