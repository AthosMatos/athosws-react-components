import { useEffect, useMemo, useRef, useState } from "react";
import { ATHOSColors } from "../../colors/colors";
import { ATHOSInputProps } from "./interfaces";
import {
  AIErrorLabel,
  AIEyeIcon,
  AIEyeOffIcon,
  AIIconWrapper,
  AIInput,
  AIInputLabel,
  AIInputWrapper,
  AILabelsWrapper,
  AILockIcon,
  AIUserIcon,
  AIWrapper,
} from "./styled";

import { AnimatePresence, motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";
/**
 * DESCRIBE COMPONENT
 */
//ImSpinner2
const AnimLoading = motion(CgSpinner);

const variants = {
  closed: {
    opacity: 0,
    scale: 0.5,
  },
  open: {
    opacity: 1,
    scale: 1,
  },
  rotate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
    },
  },
};

export const ATHOSInput = (props: ATHOSInputProps) => {
  const {
    type,
    placeholder,
    label,
    error,
    colors: styles,
    onChange,
    isSubmitting,
    value,
    className,
    style,
    onBlur: blur,
    onFocus: focus,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const [updating, setUpdating] = useState(false);

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

  const inputRef = useRef<HTMLInputElement>(null);

  const backgroundColor = useMemo(() => {
    const defaultColor = styles?.backgroundColor || ATHOSColors.gray.lighter;
    if (hasError) ATHOSColors.red.default;
    if (isFocused) return styles?.focused?.backgroundColor || defaultColor;
    if (isHovered) return styles?.hover?.backgroundColor || defaultColor;
    return defaultColor;
  }, [hasError, isFocused, isHovered, styles]);

  const outlineColor = useMemo(() => {
    const defaultColor = styles?.borderColor || ATHOSColors.gray.light;
    if (hasError) return ATHOSColors.red.default;
    if (isFocused) return styles?.focused?.borderColor || defaultColor;
    if (isHovered) return styles?.hover?.borderColor || defaultColor;
    return defaultColor;
  }, [hasError, isFocused, isHovered, styles]);

  const textColor = useMemo(() => {
    const defaultColor = styles?.textColor || ATHOSColors.gray.dark;
    if (hasError) return ATHOSColors.red.default;
    if (isFocused) return styles?.focused?.textColor || defaultColor;
    if (isHovered) return styles?.hover?.textColor || defaultColor;
    return defaultColor;
  }, [hasError, isFocused, isHovered, styles]);

  const iconColor = useMemo(() => {
    const defaultColor = styles?.iconColor || ATHOSColors.gray.dark;
    if (hasError) return ATHOSColors.red.default;
    if (isFocused) return styles?.focused?.iconColor || defaultColor;
    if (isHovered) return styles?.hover?.iconColor || defaultColor;
    return defaultColor;
  }, [hasError, isFocused, isHovered, styles]);
  return (
    <AIWrapper>
      <AILabelsWrapper>
        {type === "password" ? (
          <AIInputLabel>{"Senha"}</AIInputLabel>
        ) : type === "user" ? (
          <AIInputLabel>{"Usuário"}</AIInputLabel>
        ) : (
          label && <AIInputLabel>{label}</AIInputLabel>
        )}
        {hasError && <AIErrorLabel>{`*${error}`}</AIErrorLabel>}
      </AILabelsWrapper>
      <AIInputWrapper
        onClick={() => {
          inputRef.current?.focus();
        }}
        error={hasError}
        focused={isFocused}
        bgColor={backgroundColor}
        outlineColor={outlineColor}
        textColor={textColor}
        className={className}
        style={style}
      >
        {type === "user" ? <AIUserIcon size={15} error={hasError} /> : type === "password" && <AILockIcon size={15} error={hasError} />}
        <AIInput
          value={value}
          onChange={(e) => {
            onChange && onChange(e.target.value);
            setHasEdited(true);
          }}
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseOut={() => setIsHovered(false)}
          onMouseOver={() => setIsHovered(true)}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={type === "user" ? "Usuário" : type === "password" ? "Senha" : placeholder}
        />
        <AnimatePresence>
          {updating && (
            <AnimLoading
              size={21}
              variants={variants}
              initial="closed"
              animate={["open", "rotate"]}
              exit="closed"
              color={iconColor}
              className="transform-gpu"
              transition={{
                ease: "anticipate",
              }}
            />
          )}
        </AnimatePresence>
        {type === "password" && (
          <AIIconWrapper
            iconSize={"1.2rem"}
            style={{
              color: iconColor,
            }}
          >
            {showPassword ? (
              <AIEyeIcon onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <AIEyeOffIcon onClick={() => setShowPassword(!showPassword)} />
            )}
          </AIIconWrapper>
        )}
      </AIInputWrapper>
    </AIWrapper>
  );
};
