import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { PopUpPosition, usePopUp } from "../../../hooks/private/usePopUp";
import { ATHOSSelectedProps, ATHOSSelectPropsCols, ATHOSSelectPropsList, SelectedItemI } from "../intefaces";

interface ATHOSSelectContextI {
  props: ATHOSSelectedProps;
  select: (value: string | number) => void;
  labels: SelectedItemI[] | null;
  cols: SelectedItemI[][] | null;
  updating: boolean;
  selectedItems: (string | number)[];
  childRef: React.RefObject<HTMLButtonElement | null>;
  gap: any;
  id: string;
  pos: string;
  contentRef: React.RefObject<HTMLUListElement | null>;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isOpened: boolean;
}

const ATHOSSelectContext = createContext<ATHOSSelectContextI | null>(null);

const ATHOSSelectProvider = (
  props: ATHOSSelectedProps & {
    children: ReactNode;
    onToggle?: (isOpen: boolean) => void;
    position?: PopUpPosition;
    spacing?: number | string;
    matchLabelWidth?: boolean;
  }
) => {
  const { multiSelect = false, onToggle, position, spacing, matchLabelWidth } = props;
  const popUpProps = usePopUp({
    onToggle,
    matchChildrenWidth: matchLabelWidth,
    position,
    spacing,
  });
  const [updating, setUpdating] = useState(false);
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>(
    Array.isArray(props.selected) ? props.selected : [props.selected]
  );
  // Type guard function to check if we have labels
  const hasLabels = (props: ATHOSSelectedProps): props is ATHOSSelectPropsList => {
    return "labels" in props && Array.isArray(props.labels);
  };

  // Type guard function to check if we have cols
  const hasCols = (props: ATHOSSelectedProps): props is ATHOSSelectPropsCols => {
    return "cols" in props && Array.isArray(props.cols);
  };

  const labels = useMemo(() => {
    if (hasLabels(props)) {
      return props.labels;
    }
    return null;
  }, [props]);

  const cols = useMemo(() => {
    if (hasCols(props)) {
      return props.cols;
    }
    return null;
  }, [props]);

  function select(value: string | number) {
    if (updating) return;
    const selV = () => {
      const prev = selectedItems;
      if (multiSelect) {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        }
        return [...prev, value];
      }
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return [value];
    };
    const newValue = selV();
    setSelectedItems(newValue);
    if (props.onChange) {
      const result = props.onChange(newValue);

      if (result && typeof result.then === "function") {
        setUpdating(true);
        // If it's a Promise
        result
          .then(() => {
            setUpdating(false);
          })
          .catch(() => {
            setUpdating(false);
          });
      } else {
        // If it's not a Promise
        setUpdating(false);
      }
    }
  }

  useEffect(() => {
    if (props.selected) {
      setSelectedItems(Array.isArray(props.selected) ? props.selected : [props.selected]);
    }
  }, [props.selected]);

  console.log("ATHOSSelectProvider", props.selected, selectedItems, updating);

  return (
    <ATHOSSelectContext.Provider
      value={{
        props,
        selectedItems,
        select,
        labels,
        cols,
        updating,
        ...popUpProps,
      }}
    >
      {props.children}
    </ATHOSSelectContext.Provider>
  );
};

export const useATHOSSelectContext = () => {
  const context = useContext(ATHOSSelectContext);
  if (!context) {
    throw new Error("useATHOSSelectContext must be used within a ATHOSSelectProvider");
  }
  return context;
};
export { ATHOSSelectContext, ATHOSSelectProvider };
