import { useMemo, useRef, useState } from "react";
import { adaptSize } from "../utils";
import {
    JIErrorLabel,
    JIEyeIcon,
    JIEyeOffIcon,
    JIInput,
    JIInputLabel,
    JIInputWrapper,
    JILabelsWrapper,
    JILockIcon,
    JIUserIcon,
    JvrisInputWrapper
} from "./styled";

interface JvrisInputProps {
    type?: "user" | "password";
    placeholder?: string;
    label?: string;
    error?: string;
    size?: number;
}
/**
 * `size` is default to 4.2
 */
const JvrisInput = (props: JvrisInputProps) => {
    const { type, placeholder, label, error, size = 4.2 } = props;
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
        <JvrisInputWrapper size={size}>
            <JILabelsWrapper>
                {type === "password" ? (
                    <JIInputLabel size={size}>{"Senha"}</JIInputLabel>
                ) : type === "user" ? (
                    <JIInputLabel size={size}>{"Usuário"}</JIInputLabel>
                ) : (
                    label && <JIInputLabel size={size}>{label}</JIInputLabel>
                )}
                {hasError && (
                    <JIErrorLabel size={size}>{`*${error}`}</JIErrorLabel>
                )}
            </JILabelsWrapper>
            <JIInputWrapper
                onClick={() => {
                    inputRef.current?.focus();
                }}
                size={size}
                error={hasError}
                focused={isFocused}
            >
                {type === "user" ? (
                    <JIUserIcon
                        size={adaptSize(size, 2, "rem")}
                        error={hasError}
                    />
                ) : (
                    type === "password" && (
                        <JILockIcon
                            size={adaptSize(size, 2, "rem")}
                            error={hasError}
                        />
                    )
                )}
                <JIInput
                    ref={inputRef}
                    size={size}
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
                {type === "password" &&
                    (showPassword ? (
                        <JIEyeIcon
                            size={adaptSize(size, 3, "rem")}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    ) : (
                        <JIEyeOffIcon
                            size={adaptSize(size, 3, "rem")}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    ))}
            </JIInputWrapper>
        </JvrisInputWrapper>
    );
};

export default JvrisInput;
