import { useMemo, useRef, useState } from "react";
import { ATHOSInputProps } from "./interfaces";
import {
  ATHOSInputWrapper,
  JIErrorLabel,
  JIEyeIcon,
  JIEyeOffIcon,
  JIIconWrapper,
  JIInput,
  JIInputLabel,
  JIInputWrapper,
  JILabelsWrapper,
  JILockIcon,
  JIUserIcon,
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

  const hasError = useMemo(
    () => !(error == undefined || error == null),
    [error]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ATHOSInputWrapper>
      <JILabelsWrapper>
        {type === "password" ? (
          <JIInputLabel>{"Senha"}</JIInputLabel>
        ) : type === "user" ? (
          <JIInputLabel>{"Usuário"}</JIInputLabel>
        ) : (
          label && <JIInputLabel>{label}</JIInputLabel>
        )}
        {hasError && <JIErrorLabel>{`*${error}`}</JIErrorLabel>}
      </JILabelsWrapper>
      <JIInputWrapper
        onClick={() => {
          inputRef.current?.focus();
        }}
        error={hasError}
        focused={isFocused}
      >
        {type === "user" ? (
          <JIUserIcon error={hasError} />
        ) : (
          type === "password" && <JILockIcon error={hasError} />
        )}
        <JIInput
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={
            type === "user"
              ? "Usuário"
              : type === "password"
              ? "Senha"
              : placeholder
          }
        />

        {type === "password" && (
          <JIIconWrapper iconSize={"1.2rem"}>
            {showPassword ? (
              <JIEyeIcon onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <JIEyeOffIcon onClick={() => setShowPassword(!showPassword)} />
            )}
          </JIIconWrapper>
        )}
      </JIInputWrapper>
    </ATHOSInputWrapper>
  );
};
