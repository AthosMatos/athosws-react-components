import * as react_jsx_runtime from 'react/jsx-runtime';
import { IconType } from 'react-icons';
import * as react from 'react';
import { ReactNode, RefObject } from 'react';

interface EnabledATHOSButtonProps {
    disabled?: false;
    type: "default" | "alt" | "action";
    onClick?: () => void;
    children: React.ReactNode;
    small?: boolean;
    tooltip?: React.ReactNode;
    style?: React.CSSProperties;
    color?: string;
    textColor?: string;
}
interface DisabledATHOSButtonProps {
    disabled: true;
    children: React.ReactNode;
    small?: boolean;
    tooltip?: React.ReactNode;
    style?: React.CSSProperties;
    color?: string;
    textColor?: string;
}
type ATHOSButtonProps = DisabledATHOSButtonProps | EnabledATHOSButtonProps;

/**
 * A versatile button component with multiple styles (`default`, `alt`, `action`, `disabled`), customizable colors, and optional tooltip support.
 * Handles click events and can be disabled when needed.
 *
 * Props:
 * - `type`: Defines the button style (`default`, `alt`, `action`).
 * - `onClick`: Function triggered on button click.
 * - `children`: Button content.
 * - `tooltip`: Optional tooltip content displayed on hover.
 * - `disabled`: Disables the button if set to `true`.
 * - `style`: Custom inline styles.
 * - `color` / `textColor`: Button and text colors, customizable based on button type.
 *
 * Example usage:
 *
 *  ```tsx
 * <ATHOSButton type="default" onClick={() => console.log("Clicked")}>
 *   Click Me
 * </ATHOSButton>
 * ```
 */
declare const ATHOSButton: (props: ATHOSButtonProps) => react_jsx_runtime.JSX.Element;

interface LabelI {
    label: string;
    onClick: () => void;
}
interface ATHOSDropDownProps {
    children: (ref: any) => React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    position?: "top" | "bottom";
    id?: string;
    labels: LabelI[];
    style?: React.CSSProperties;
}

/**
 *
 */
declare const ATHOSDropDown: ({ children, isOpen, onClose, position, id, labels, style, }: ATHOSDropDownProps) => react_jsx_runtime.JSX.Element;

type GlobalConfig = {
    maxCharToCut?: number;
    label?: string;
    maxWidth?: number;
    minWidth?: number;
    minColWidthToShort?: number;
    shortOnlyifCut?: boolean;
    colComponent?: React.ReactNode;
    cellComponent?: (cell: any) => React.ReactNode;
};
type ADTLabelI<T> = {
    label: string;
    onClick: (selectedData: T[]) => void;
};
type SelectedRowsTooltipI<T> = {
    mainFunc?: {
        label?: string;
        icon?: React.ReactNode;
        onClick: (selectedData: T[]) => void;
    };
    secondaryFunc?: {
        label?: string;
        icon?: React.ReactNode;
        onClick: (selectedData: T[]) => void;
    };
    othersFunc?: ADTLabelI<T>[];
};
type ExtraColumnsI<T> = {
    showCondition?: (data: T) => boolean;
    component: (data: T) => React.ReactNode;
};
type ColConfig<T> = {
    [key in keyof T]?: GlobalConfig;
};
type StartShortI<T> = {
    [key in keyof T]?: boolean;
};
type ColumnTextTableStyle<T> = {
    [key in keyof T]?: string;
};
type CellColumnTextTableStyle<T> = {
    [key in keyof T]?: {
        global?: string;
        specificIndex?: {
            indexes: number[];
            color: string;
        };
        condional?: {
            showCondition: (rowColumnData: string) => boolean;
            color: string;
        };
    };
};
type TableStyle<T> = {
    highlightColor?: string;
    cellTextColor?: {
        global?: string;
        specific?: CellColumnTextTableStyle<T>;
    };
    columnTextColor?: {
        global?: string;
        specific?: ColumnTextTableStyle<T>;
    };
};
type DynamicTableProps<T> = {
    tableName: string;
    data: T[];
    resizeable?: boolean;
    tableStyle?: TableStyle<T>;
    colConfig?: ColConfig<T>;
    globalConfig?: GlobalConfig;
    columnsToHide?: (keyof T)[];
    columnsToShow?: (keyof T)[];
    style?: React.CSSProperties;
    paddingBetweenCells?: number;
    paddingHeader?: number;
    paddingBetweenColumns?: number;
    paddingBetweenExtraColumns?: number;
    selectedRowsTooltip?: SelectedRowsTooltipI<T>;
    extraColumns?: ExtraColumnsI<T>[];
    startShort?: StartShortI<T> | boolean;
    persistPrimaryColumn?: {
        backgroundColor?: string;
    } | boolean;
};

/**
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */
declare function ATHOSDynamicTable<T>(props: DynamicTableProps<T>): react_jsx_runtime.JSX.Element;

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

interface ResizableDivProps {
    resizableConers?: {
        top?: boolean;
        right?: boolean;
        bottom?: boolean;
        left?: boolean;
    };
    saveInLocalStorage?: string;
    style?: React.CSSProperties;
    OuterContainerStyle?: React.CSSProperties;
    children?: React.ReactNode;
    withToogle?: boolean;
    matchChildSize?: boolean;
    disabled?: boolean;
}

declare const ATHOSResizableDiv: (props: ResizableDivProps) => react_jsx_runtime.JSX.Element;

interface ASMOptionColorConfig {
    backColor?: string;
    textColor?: string;
    hover?: {
        backColor?: string;
        textColor?: string;
        clicked?: {
            backColor?: string;
            textColor?: string;
            hasChildren?: {
                backColor?: string;
                textColor?: string;
            };
            hasSelectedChildren?: {
                backColor?: string;
                textColor?: string;
            };
        };
    };
    clicked?: {
        backColor?: string;
        textColor?: string;
        hasChildren?: {
            backColor?: string;
            textColor?: string;
        };
        hasSelectedChildren?: {
            backColor?: string;
            textColor?: string;
        };
    };
}
interface ASMSubOptionColorConfig {
    backColor?: string;
    textColor?: string;
    hover?: {
        backColor?: string;
        textColor?: string;
        clicked?: {
            backColor?: string;
            textColor?: string;
        };
    };
    clicked?: {
        backColor?: string;
        textColor?: string;
    };
}
interface ASMOptionI {
    label: string;
    Icon?: IconType | React.ReactNode;
    iconSize?: string | number;
    subOptions?: ASMSubOptionI[];
    colorConfig?: ASMOptionColorConfig;
    onClick?: () => void;
}
interface ASMSubOptionI {
    label: string;
    onClick?: () => void;
    colorConfig?: ASMSubOptionColorConfig;
}
interface ASMColorsProps {
    background?: string;
    sideBorder?: string;
    primary?: string;
    accent?: string;
}
type ATHOSSideMenuBaseProps = {
    onExitIcon?: {
        onClick: () => void;
        Icon?: IconType;
        label: string;
    };
    editableIcon?: {
        Icon?: IconType;
        label?: string;
    };
    collapsableIcon?: {
        Icon?: IconType;
        label?: string;
    };
    goToFirstSubOnOpen?: boolean;
    options: ASMOptionI[];
    colors: ASMColorsProps;
    onReorder?: (result: ASMOptionI[]) => void;
    asOverlay?: boolean;
};
interface ATHOSSideMenuNoOverlayProps extends ATHOSSideMenuBaseProps {
    asOverlay?: false | undefined;
}
interface ATHOSSideMenuOverlayProps extends ATHOSSideMenuBaseProps {
    asOverlay: true;
    children: React.ReactNode;
    overlayStyle?: React.CSSProperties;
}
type ATHOSSideMenuProps = ATHOSSideMenuNoOverlayProps | ATHOSSideMenuOverlayProps;

/**
 * DESCRIBE COMPONENT
 */
declare function ATHOSSideMenu(props: ATHOSSideMenuProps): react_jsx_runtime.JSX.Element;

interface ATHOSToastProps {
    id?: string;
    updateState: any;
    removeCondition?: boolean;
    renderCondition: boolean;
    children: React.ReactNode;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    gap?: number;
}

declare const ATHOSToast: react.MemoExoticComponent<({ id, updateState, children, renderCondition, removeCondition: removeOnUpdateCondition, position, gap, }: ATHOSToastProps) => react.ReactPortal | null>;

interface ATHOSTooltipProps {
    children: (ref: any) => ReactNode;
    id?: string;
    forceOpen?: boolean;
    position?: "top" | "bottom";
    followCursor?: boolean;
    content: ReactNode;
    style?: React.CSSProperties;
}

declare const ATHOSTooltip: (props: ATHOSTooltipProps) => react_jsx_runtime.JSX.Element;

/**
 * Generates a set of color shades based on the provided base color.
 *
 * Uses the `chroma-js` library to create a lighter and darker set of shades for the given color.
 *
 * @param {string} color - The base color in any valid CSS color format (e.g., hex, rgb, etc.).
 * @returns {Object} An object containing the following shades of the color:
 * - `lighter`: A lighter shade of the color.
 * - `light`: A light shade of the color.
 * - `default`: The original color.
 * - `dark`: A dark shade of the color.
 * - `darker`: A darker shade of the color.
 */
declare const generateColorShades: (color: string) => {
    lighter: string;
    light: string;
    default: string;
    dark: string;
    darker: string;
};
/**
 * Determines the appropriate contrast color (black or white) based on the luminance of the given color.
 *
 * Uses the `chroma-js` library to compute the luminance of the color and returns either "black" or "white"
 * to ensure good contrast and readability against the given color.
 *
 * @param {string} color - The base color in any valid CSS color format (e.g., hex, rgb, etc.).
 * @returns {string} "black" if the luminance of the color is above 0.5, otherwise "white".
 */
declare const getContrastColor: (color: string) => "black" | "white";

declare const adaptSize: (size: number, refValue: number, unit: string) => string;
declare const getValueWithoutUnit: (value: string) => number;
declare const getUnitWithoutValue: (value: string) => string;
declare function convertRemToPixels(rem: number): number;

declare const ATHOSColors: {
    aqua: {
        default: string;
        default_2: string;
        dark: string;
        darker: string;
    };
    grey: {
        darker: string;
        dark: string;
        dark_05: string;
        default: string;
        light: string;
        light_2: string;
        lighter: string;
    };
    red: {
        darker: string;
        dark: string;
        default: string;
        light: string;
    };
    white: {
        eggshell: string;
    };
    black: {
        coal: string;
    };
    background: string;
};

/**
 * Custom hook that detects clicks outside of a set of specified elements.
 *
 * @param ids - An array of strings representing the ids of the elements to detect clicks outside of.
 * @param refs - An array of React ref objects representing the elements to detect clicks outside of.
 * @param callback - A callback function to be executed when a click outside is detected.
 */
interface ClickOutsideBaseProps {
    callback: () => void;
}
interface ClickOutsideRefProps extends ClickOutsideBaseProps {
    refs: RefObject<HTMLElement>[];
}
interface ClickOutsideIdProps extends ClickOutsideBaseProps {
    ids: string[];
}
type ClickOutsideProps = ClickOutsideRefProps | ClickOutsideIdProps;
declare const useClickOutside: (props: ClickOutsideProps) => void;

export { ATHOSButton, ATHOSColors, ATHOSDropDown, ATHOSDynamicTable, ATHOSInput, ATHOSResizableDiv, ATHOSSideMenu, ATHOSToast, ATHOSTooltip, adaptSize, convertRemToPixels, generateColorShades, getContrastColor, getUnitWithoutValue, getValueWithoutUnit, useClickOutside };
