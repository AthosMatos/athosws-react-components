import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ATHOSColors } from "../../../colors/colors";
import { ATHOSInputProps } from "../interfaces";

interface ATHOSInputContextProps {
  props: ATHOSInputProps;
  hasError: boolean;
  isFocused: boolean;
  backgroundColor: string;
  outlineColor: string;
  textColor: string;
  iconColor: string;
  setIsFocused: (value: boolean) => void;
  setIsHovered: (value: boolean) => void;
  setShowPassword: (value: boolean) => void;
  setChecked: (value: boolean) => void;
  setFiles: (value: FileList | null) => void;
  setHasEdited: (value: boolean) => void;
  files: FileList | null;
  updating: boolean;
  isHovered: boolean;
  showPassword: boolean;
  checked: boolean;
  disabled?: boolean;
}

const ATHOSInputContext = createContext({} as ATHOSInputContextProps);

export const ATHOSInputProvider = ({ children, props }: { children: React.ReactNode; props: ATHOSInputProps }) => {
  const { error, colors: styles, isSubmitting, onblur: blur, onfocus: focus, disabled } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [checked, setChecked] = useState(false);

  const [files, setFiles] = useState<FileList | null>(null);
  const onFocus = () => {
    setIsFocused(true);
    if (focus) {
      const result = focus();
      if (hasEdited) {
        setHasEdited(false);
        if (result && typeof result.then === "function") {
          setUpdating(true);
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
  };

  const onBlur = () => {
    setIsFocused(false);
    if (blur) {
      const result = blur();
      if (hasEdited) {
        setHasEdited(false);
        if (result && typeof result.then === "function") {
          setUpdating(true);
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
  };

  useEffect(() => {
    if (isSubmitting) {
      setUpdating(true);
    } else {
      setUpdating(false);
    }
  }, [isSubmitting]);

  const hasError = useMemo(() => !(error == undefined || error == null), [error]);

  const backgroundColor = useMemo(() => {
    const defaultColor = styles?.backgroundColor || ATHOSColors.gray.lighter;
    if (disabled) return styles?.disabled?.backgroundColor || ATHOSColors.gray.light_2;
    if (hasError) ATHOSColors.red.default;
    if (isFocused) return styles?.focused?.backgroundColor || defaultColor;
    if (isHovered) return styles?.hover?.backgroundColor || defaultColor;
    return defaultColor;
  }, [hasError, isFocused, isHovered, styles, disabled]);

  const outlineColor = useMemo(() => {
    const defaultColor = styles?.borderColor || ATHOSColors.gray.light;
    if (disabled) return styles?.disabled?.borderColor || defaultColor;
    if (hasError) return ATHOSColors.red.default;
    if (isFocused) return styles?.focused?.borderColor || defaultColor;
    if (isHovered) return styles?.hover?.borderColor || defaultColor;
    return defaultColor;
  }, [hasError, isFocused, isHovered, styles, disabled]);

  const textColor = useMemo(() => {
    const defaultColor = styles?.textColor || ATHOSColors.gray.dark;
    if (disabled) return styles?.disabled?.textColor || ATHOSColors.gray.default;
    if (hasError) return ATHOSColors.red.default;
    if (isFocused) return styles?.focused?.textColor || defaultColor;
    if (isHovered) return styles?.hover?.textColor || defaultColor;
    return defaultColor;
  }, [hasError, isFocused, isHovered, styles, disabled]);

  const iconColor = useMemo(() => {
    const defaultColor = styles?.iconColor || ATHOSColors.gray.dark;
    if (disabled) return styles?.disabled?.iconColor || defaultColor;
    if (hasError) return ATHOSColors.red.default;
    if (isFocused) return styles?.focused?.iconColor || defaultColor;
    if (isHovered) return styles?.hover?.iconColor || defaultColor;
    return defaultColor;
  }, [hasError, isFocused, isHovered, styles, disabled]);

  return (
    <ATHOSInputContext.Provider
      value={{
        props: {
          ...props,
          onFocus,
          onBlur,
        },
        hasError,
        isFocused,
        backgroundColor,
        outlineColor,
        textColor,
        iconColor,
        setIsFocused,
        setIsHovered,
        setShowPassword,
        setChecked,
        files,
        setFiles,
        setHasEdited,
        updating,
        isHovered,
        showPassword,
        checked,
        disabled,
      }}
    >
      {children}
    </ATHOSInputContext.Provider>
  );
};

export const useATHOSInputContext = () => {
  const context = useContext(ATHOSInputContext);
  if (!context) {
    throw new Error("useATHOSInputContext must be used within a ATHOSInputProvider");
  }
  return context;
};
