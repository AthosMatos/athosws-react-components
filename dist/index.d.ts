import * as react_jsx_runtime from 'react/jsx-runtime';

interface DefaultATHOSButtonProps {
    disabled?: false;
    type: "default" | "alt" | "action";
    children: React.ReactNode;
    onClick?: () => void;
    tooltip?: React.ReactNode;
}
interface DisabledATHOSButtonProps {
    disabled: true;
    children: React.ReactNode;
    tooltip?: React.ReactNode;
}
type ATHOSButtonProps = DefaultATHOSButtonProps | DisabledATHOSButtonProps;

/**
 * DESCRIBE COMPONENT
 */
declare const ATHOSButton: (props: ATHOSButtonProps) => react_jsx_runtime.JSX.Element;

interface ATHOSInputProps {
    type?: "user" | "password";
    placeholder?: string;
    label?: string;
    error?: string;
}

/**
 * DESCRIBE COMPONENT
 */
declare const ATHOSInput: (props: ATHOSInputProps) => react_jsx_runtime.JSX.Element;

interface SubOptionI {
    label: string;
    onClick?: () => void;
}
interface ATHOSSideMenuDataI {
    label: string;
    Icon: any;
    iconSize?: string | number;
    subOptions?: SubOptionI[];
    onClick?: () => void;
}
interface ATHOSSideMenuProps {
    onExit?: () => void;
    goToFirstSubOnOpen?: boolean;
    options: ATHOSSideMenuDataI[];
    colors: {
        accent: string;
        active: string;
        background?: string;
    };
}

/**
 * DESCRIBE COMPONENT
 */
declare const ATHOSSideMenu: (props: ATHOSSideMenuProps) => react_jsx_runtime.JSX.Element;

interface ATHOSTooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    wrapperStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
}

declare const ATHOSTooltip: (props: ATHOSTooltipProps) => react_jsx_runtime.JSX.Element;

export { ATHOSButton as Button, ATHOSInput as Input, ATHOSSideMenu as SiedMenu, ATHOSTooltip as ToolTip };
