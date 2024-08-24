export const adaptSize = (size: number, refValue: number, unit: string) => {
    return `${(refValue * size) / 5}${unit}`;
};

export const getValueWithoutUnit = (value: string) => {
    return parseFloat(value.replace(/[a-z]/gi, ""));
};

export const getUnitWithoutValue = (value: string) => {
    return value.replace(/[0-9]/gi, "");
};
