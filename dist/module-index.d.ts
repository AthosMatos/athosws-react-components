import * as react_jsx_runtime from 'react/jsx-runtime';
import react, { ReactNode, ReactElement, RefObject } from 'react';
import { CSSProperties } from 'styled-components';
import { IconType } from 'react-icons';
import { NavigateFunction, Location } from 'react-router';

type ATHOSButtonProps = {
    disabled?: boolean;
    type: "default" | "alt" | "action";
    onClick?: () => void;
    children: React.ReactNode;
    small?: boolean;
    tooltip?: React.ReactNode;
    style?: React.CSSProperties;
    color?: string;
    textColor?: string;
};

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

interface BaseItem {
    id: string;
}
interface Props<T extends BaseItem> {
    items: T[];
    update(changeItems: T[]): void;
    render(item: T): JSX.Element;
}
declare const GripIcon: (props: react.SVGProps<SVGSVGElement>) => react_jsx_runtime.JSX.Element;
declare const GripIconVertical: (props: react.SVGProps<SVGSVGElement>) => react_jsx_runtime.JSX.Element;
declare function ATHOSCards<T extends BaseItem>(props: react.HTMLAttributes<HTMLDivElement> & Props<T>): react_jsx_runtime.JSX.Element;

declare function DeleteHandle(props: React.HTMLAttributes<HTMLButtonElement>): react_jsx_runtime.JSX.Element;

declare function DragHandle(props: React.HTMLAttributes<HTMLButtonElement>): react_jsx_runtime.JSX.Element;

interface ATHOSCollapseProps {
    children: React.ReactNode;
    collpasedComponent: React.ReactNode;
    onToggle?: (isOpen: boolean) => void;
    position?: "top" | "bottom" | "left" | "right";
    spacing?: number;
    initialOpen?: boolean;
    collapsedClassName?: string;
}
declare const ATHOSCollapse: ({ children, collpasedComponent, spacing, position, onToggle: onChanges, initialOpen, collapsedClassName, }: ATHOSCollapseProps) => react_jsx_runtime.JSX.Element;

type PopUpPosition = "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "left" | "left-top" | "left-bottom" | "right" | "right-top" | "right-bottom";

interface ATHOSDDDPPBaseProps {
    position?: PopUpPosition;
    style?: React.CSSProperties;
    className?: string;
    labelClassName?: string;
    labelsStyle?: React.CSSProperties;
    spacing?: number;
    matchChildrenWidth?: boolean;
    onToggle?: (isOpen: boolean) => void;
    buttonClassName?: string;
    buttonStyle?: CSSProperties;
}
interface LabelI {
    label: ReactNode;
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
}
interface ATHOSDropDownBaseProps extends ATHOSDDDPPBaseProps {
    children: React.ReactNode;
}
interface ATHOSDropDownPropsList extends ATHOSDropDownBaseProps {
    labels: LabelI[];
}
interface ATHOSDropDownPropsCols extends ATHOSDropDownBaseProps {
    cols: LabelI[][];
    colClassName?: string;
    colStyle?: CSSProperties;
}
type ATHOSDropDownProps = ATHOSDropDownPropsList | ATHOSDropDownPropsCols;

declare const ATHOSDropDown: (props: ATHOSDropDownProps) => react_jsx_runtime.JSX.Element;

interface ATHOSPopUpProps {
    children: React.ReactNode;
    onToggle?: (isOpen: boolean) => void;
    position?: PopUpPosition;
    style?: React.CSSProperties;
    contentWrapperStyle?: React.CSSProperties;
    contentWrapperClassName?: string;
    className?: string;
    content: React.ReactNode;
    spacing?: number;
    matchChildrenWidth?: boolean;
}

declare const ATHOSPopUp: ({ children, onToggle, position, contentWrapperClassName: contentClassName, content, style, matchChildrenWidth, spacing, className, contentWrapperStyle: contentStyle, }: ATHOSPopUpProps) => react_jsx_runtime.JSX.Element;

type TdefaultStyles = {
    style?: React.CSSProperties;
    className?: string;
};
type GlobalConfig = {
    maxCharToCut?: number;
    maxWidth?: number;
    minWidth?: number;
    minColWidthToShort?: number;
    cellComponent?: (cell: any) => React.ReactNode;
};
type SpecificColConfig = {
    maxCharToCut?: number;
    label?: React.ReactNode;
    maxWidth?: number;
    minWidth?: number;
    minColWidthToShort?: number;
    cellComponent?: (cell: any) => React.ReactNode;
} & TdefaultStyles;
type ExtraColConfig<T> = {
    id?: string;
    column: keyof T;
    maxCharToCut?: number;
    label?: React.ReactNode;
    maxWidth?: number;
    minWidth?: number;
    minColWidthToShort?: number;
    cellComponent?: (cell: any) => React.ReactNode;
} & TdefaultStyles;
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
    containerColor?: TdefaultStyles;
};
type ExtraCellColumnsI<T> = {
    label?: string;
    center?: boolean;
    showCondition?: (data: T) => boolean;
    component: (data: T) => React.ReactNode;
};
type ColConfig<T> = {
    [key in keyof T]?: SpecificColConfig;
};
type StartShortI<T> = {
    [key in keyof T]?: boolean;
};
type ColumnTextTableStyle<T> = {
    [key in keyof T]?: string;
};
type ColumnTextTableStyleCustomLabelADD = {
    [key: string]: string;
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
type CellColumnTextTableStyleCustomLabelADD = {
    [key: string]: {
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
    selected?: {
        rowColor?: string;
        rowTextColor?: string;
        rowBorderColor?: string;
        rowSpacingColor?: string;
        selectedIconColor?: string;
    };
    cellTextColor?: {
        global?: string;
        specific?: CellColumnTextTableStyle<T> & CellColumnTextTableStyleCustomLabelADD;
    };
    columnTextColor?: {
        global?: string;
        specific?: ColumnTextTableStyle<T> & ColumnTextTableStyleCustomLabelADD;
    };
};
type ResizableConfig = {
    autoBorder?: boolean;
};
type DynamicTableProps<T> = {
    tableSelectedFuncs?: {
        title?: string;
        funcs?: {
            label: ReactNode;
            onClick: (selectedData: T[]) => void;
        }[];
    };
    tableFilterName?: string;
    loading?: boolean | string;
    boldColumns?: boolean;
    wrapperClassName?: string;
    tableWrapperClassName?: string;
    className?: string;
    tableName: string;
    data: T[];
    resizeable?: boolean | ResizableConfig;
    tableStyle?: TableStyle<T>;
    colConfig?: ColConfig<T>;
    globalConfig?: GlobalConfig;
    columnsToHide?: (keyof T)[];
    columnsToShow?: (keyof T)[];
    customColumns?: {
        newLabel: string;
        colsToGet: (keyof T)[];
        index?: number;
        render?: (data: T) => React.ReactNode;
    }[];
    columnOrder?: (keyof T)[];
    noDataPlaceholder?: React.ReactNode;
    style?: React.CSSProperties;
    spacingBetweenCells?: number | string;
    paddingInCells?: number | string;
    spacingHeader?: number | string;
    spacingBetweenColumns?: number | string;
    spacingBetweenExtraColumns?: number | string;
    selectedRowsToast?: SelectedRowsTooltipI<T>;
    extraCellColumns?: ExtraCellColumnsI<T>[];
    extraColumns?: ExtraColConfig<T>[];
    startShort?: StartShortI<T> | boolean;
    persistPrimaryColumn?: {
        backgroundColor?: string;
        borderColor?: string;
    } | boolean;
};

declare function ATHOSDynamicTable<T>(props: DynamicTableProps<T>): react_jsx_runtime.JSX.Element;

declare const ATHOSDynamicTableProvider: ({ children }: {
    children: React.ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare function useATHOSDynamicTableContext<T>(): {
    selectedData: T[];
};

interface ATHOSInputStyles {
    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;
    iconColor?: string;
    hover?: {
        backgroundColor?: string;
        borderColor?: string;
        textColor?: string;
        iconColor?: string;
    };
    focused?: {
        backgroundColor?: string;
        borderColor?: string;
        textColor?: string;
        iconColor?: string;
    };
}
interface ATHOSInputProps {
    type?: "user" | "password";
    placeholder?: string;
    label?: string;
    error?: string;
    colors?: ATHOSInputStyles;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void | Promise<void>;
    onFocus?: () => void | Promise<void>;
    isSubmitting?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

declare const ATHOSInput: (props: ATHOSInputProps) => react_jsx_runtime.JSX.Element;

interface ResizableDivProps {
    localSaveName?: string;
    style?: React.CSSProperties;
    OuterContainerStyle?: React.CSSProperties;
    children?: React.ReactNode;
    withToogle?: boolean;
    disabled?: boolean;
    className?: string;
    outerClassName?: string;
    highlightColor?: string;
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
interface DefaultOptI {
    id?: string;
    label: string;
    path?: string;
    pageText?: {
        backColor?: string;
        title: {
            color?: string;
            value: string;
        };
        subTitle?: {
            color?: string;
            value: string;
        };
    };
}
interface ASMOptionI extends DefaultOptI {
    Icon?: IconType | React.ReactNode;
    iconSize?: string | number;
    subOptions?: ASMSubOptionI[];
    colorConfig?: ASMOptionColorConfig;
    onClick?: () => void;
}
interface ASMSubSubOptionI extends DefaultOptI {
    onClick?: () => void;
    colorConfig?: ASMOptionColorConfig;
}
interface ASMSubOptionI extends DefaultOptI {
    Icon?: IconType | React.ReactNode;
    iconSize?: string | number;
    onClick?: () => void;
    colorConfig?: ASMOptionColorConfig;
    subsubOptions?: ASMSubSubOptionI[];
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
    overlayFitScreen?: boolean;
    usesRouter?: {
        navigate: NavigateFunction;
        location: Location<any>;
    };
    extraHeader?: React.ReactNode;
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

interface SwitchI {
    id?: string;
    onSelected?: () => void;
    label?: ReactNode;
    icon?: ReactNode;
    className?: {
        default?: string;
        active?: string;
    };
    style?: {
        default?: React.CSSProperties;
        active?: React.CSSProperties;
    };
}

interface ATHOSSwitcherProps {
    selectedId?: string;
    onChange?: (id: string) => void;
    switchs: SwitchI[];
    style?: {
        container?: React.CSSProperties;
        switches?: {
            default?: React.CSSProperties;
            active?: React.CSSProperties;
        };
    };
    className?: {
        container?: string;
        switches?: {
            default?: string;
            active?: string;
        };
    };
}

declare const ATHOSSwitcher: (props: ATHOSSwitcherProps) => react_jsx_runtime.JSX.Element;

interface TabClassNameProps {
    default?: string;
    active?: string;
}
interface TabColorsProps {
    default?: React.CSSProperties;
    active?: React.CSSProperties;
}
interface TabProps {
    title: {
        value: ReactNode;
        className?: TabClassNameProps;
        style?: TabColorsProps;
    };
    content: {
        value: ReactNode;
        className?: string;
        style?: React.CSSProperties;
    };
}
interface ATHOSTabsProps {
    tabs: TabProps[];
    gap?: number;
    className?: {
        tab?: TabClassNameProps;
        body?: string;
    };
    colors?: {
        tab?: TabColorsProps;
        body?: React.CSSProperties;
    };
}

declare const ATHOSTabs: (props: ATHOSTabsProps) => react_jsx_runtime.JSX.Element;

declare const ATHOSVirtualDiv: ({ children, className, style, offset, viewportId, }: {
    children: ReactElement;
    className?: string;
    style?: react.CSSProperties;
    offset?: number;
    viewportId?: string;
}) => react_jsx_runtime.JSX.Element;

interface ATHOSToastProps {
    id?: string;
    updateState?: any;
    removeCondition?: boolean;
    renderCondition?: boolean;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    gap?: number;
    renderAndFade?: boolean;
    children?: React.ReactNode;
    className?: string;
}

declare const ATHOSToast: (props: ATHOSToastProps) => react_jsx_runtime.JSX.Element;

declare const useATHOSToast: () => {
    toast: (t: React.ReactNode | JSX.Element, props?: ATHOSToastProps) => void;
};

interface ATHOSModalProps {
    show?: boolean;
    children?: React.ReactNode;
    hide?: () => void;
    blur?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "none";
    backdrop?: string;
}

declare const ATHOSModal: React.FC<ATHOSModalProps>;

declare const useATHOSModal: () => {
    modal: (t: React.ReactNode | JSX.Element, props?: ATHOSModalProps) => void;
};

interface ATHOSTooltipProps {
    children: ReactNode;
    forceOpen?: boolean;
    position?: "top" | "bottom";
    followCursor?: boolean;
    tooltipContent: ReactNode;
    gap?: number;
    style?: React.CSSProperties;
    className?: string;
}

declare const ATHOSTooltip: (props: ATHOSTooltipProps) => react_jsx_runtime.JSX.Element;

/**
 * Generates a set of color shades based on the provided base color.
 *
 * Uses the `chroma-js` library to create a lighter and darker set of shades for the given color.
 *
 * @param {string} colorr - The base color in any valid CSS color format (e.g., hex, rgb, etc.).
 * @returns {Object} An object containing the following shades of the color:
 * - `lighter`: A lighter shade of the color.
 * - `light`: A light shade of the color.
 * - `default`: The original color.
 * - `dark`: A dark shade of the color.
 * - `darker`: A darker shade of the color.
 */
declare const generateColorShades: (colorr: string) => {
    lighter: string;
    light: string;
    default: string;
    dark: string;
    darker: string;
    darker2: string;
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
    gray: {
        darker_2: string;
        darker: string;
        dark: string;
        dark_05: string;
        default: string;
        light: string;
        light_2: string;
        lighter: string;
    };
    red: {
        darker_2: string;
        darker: string;
        dark: string;
        default: string;
        light: string;
    };
    white: {
        eggshell: string;
        eggshell_faded: string;
    };
    black: {
        coal: string;
        coal_faded: string;
    };
    background: string;
};

type AMOptColorsProps = {
    background?: string;
    border?: {
        color?: string;
        width?: string;
    } | "none";
    text?: string;
    icon?: string;
    className?: string;
};
interface ColorOptType {
    hover?: AMOptColorsProps;
    clicked?: AMOptColorsProps;
    normal?: AMOptColorsProps;
    defaults?: AMOptColorsProps;
}
interface AMMenuColorsProps extends AMOptColorsProps {
    option: ColorOptType;
    subOption?: ColorOptType;
    subSubOption?: ColorOptType;
}
interface AMColorsProps {
    selected?: AMOptColorsProps;
    menu?: AMMenuColorsProps;
}
interface DefaultOptProps {
    label: string;
    icon?: ReactNode;
    path?: string;
    onClick?: () => void;
    onInit?: () => void;
    specificColors?: ColorOptType;
}
interface SubSubOptionProps extends DefaultOptProps {
}
interface SubOptionProps extends DefaultOptProps {
    subSubOpts?: SubSubOptionProps[];
}
interface OptionProps extends DefaultOptProps {
    subOpts?: SubOptionProps[];
}
interface ATHOSMenuProps {
    generalColors?: AMColorsProps;
    options: OptionProps[];
    navigate?: {
        useNavigate: any;
        useLocation: any;
    };
    maxMenuHeight?: number;
    blur?: {
        menu?: boolean;
        selected?: boolean;
    };
    menuDirection?: "top" | "bottom";
}

declare const ATHOSMenu: (props: ATHOSMenuProps) => react_jsx_runtime.JSX.Element;

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
    refs: RefObject<any>[];
}
interface ClickOutsideIdProps extends ClickOutsideBaseProps {
    ids: string[];
}
type ClickOutsideProps = ClickOutsideRefProps | ClickOutsideIdProps;
declare const useClickOutside: (props: ClickOutsideProps) => void;

type Sizes = "sm" | "md" | "lg" | "xl" | "2xl";
declare const isBiggerThan: (size: Sizes) => boolean;
declare function useWindowDimensions(): {
    size: Sizes | undefined;
    dimensions: {
        width: number;
        height: number;
    };
};

export { ATHOSButton, type ATHOSButtonProps, ATHOSCards, ATHOSCollapse, ATHOSColors, ATHOSDropDown, ATHOSDynamicTable, ATHOSDynamicTableProvider, ATHOSInput, ATHOSMenu, ATHOSModal, ATHOSPopUp, ATHOSResizableDiv, ATHOSSideMenu, ATHOSSwitcher, ATHOSTabs, ATHOSToast, ATHOSTooltip, ATHOSVirtualDiv, DeleteHandle, DragHandle, GripIcon, GripIconVertical, adaptSize, convertRemToPixels, generateColorShades, getContrastColor, getUnitWithoutValue, getValueWithoutUnit, isBiggerThan, useATHOSDynamicTableContext, useATHOSModal, useATHOSToast, useClickOutside, useWindowDimensions };
