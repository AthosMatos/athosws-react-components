import JvrisTooltip from "../JvrisTooltip";
import {
    JvrisButton_action,
    JvrisButton_alt,
    JvrisButton_default,
    JvrisButton_disabled
} from "./styled/styled";

interface DefaultJvrisButtonProps {
    disabled?: false;
    type: "default" | "alt" | "action";
    children: React.ReactNode;
    size?: number;
    onClick?: () => void;
    tooltip?: React.ReactNode;
}

interface DisabledJvrisButtonProps {
    disabled: true;
    size?: number;
    children: React.ReactNode;
    tooltip?: React.ReactNode;
}

type JvrisButtonProps = DefaultJvrisButtonProps | DisabledJvrisButtonProps;
/**
 * `size` is default to 4.2
 */
const JvrisButton = (props: JvrisButtonProps) => {
    const { children, size = 4.2, disabled, tooltip } = props;
    const Bttn = () => {
        if (disabled) {
            return (
                <JvrisButton_disabled size={size}>
                    {children}
                </JvrisButton_disabled>
            );
        } else {
            const { type, onClick } = props as DefaultJvrisButtonProps;
            switch (type) {
                case "default":
                    return (
                        <JvrisButton_default size={size} onClick={onClick}>
                            {children}
                        </JvrisButton_default>
                    );
                case "alt":
                    return (
                        <JvrisButton_alt size={size} onClick={onClick}>
                            {children}
                        </JvrisButton_alt>
                    );
                case "action":
                    return (
                        <JvrisButton_action size={size} onClick={onClick}>
                            {children}
                        </JvrisButton_action>
                    );
            }
        }
    };

    return tooltip ? (
        <JvrisTooltip content={tooltip}>{Bttn()}</JvrisTooltip>
    ) : (
        Bttn()
    );
};

export default JvrisButton;
