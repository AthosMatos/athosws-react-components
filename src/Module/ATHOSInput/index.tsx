import { useMemo, useRef, useState } from "react";
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

/**
 * DESCRIBE COMPONENT
 */
export const ATHOSInput = (props: ATHOSInputProps) => {
  const { type, placeholder, label, error } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const hasError = useMemo(() => !(error == undefined || error == null), [error]);

  const inputRef = useRef<HTMLInputElement>(null);

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
      >
        {type === "user" ? <AIUserIcon error={hasError} /> : type === "password" && <AILockIcon error={hasError} />}
        <AIInput
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={type === "user" ? "Usuário" : type === "password" ? "Senha" : placeholder}
        />

        {type === "password" && (
          <AIIconWrapper iconSize={"1.2rem"}>
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
