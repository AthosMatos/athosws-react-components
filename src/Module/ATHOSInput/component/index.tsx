import { ATHOSInputProps } from "./interfaces";
import { AIWrapper } from "./styled";

import { useMemo, useRef } from "react";
import { v4 } from "uuid";
import { ATHOSInputProvider } from "./context";
import { Input } from "./sections/input";
import { Label } from "./sections/label";
/**
 * DESCRIBE COMPONENT
 */
//ImSpinner2

export const ATHOSInput = (props: ATHOSInputProps) => {
  const id = useMemo(() => v4(), []);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <ATHOSInputProvider props={{ ...props, id }}>
      <AIWrapper
        onClick={() => {
          inputRef.current?.focus();
        }}
        className={`${props.className} ${props.type === "check" ? "justify-center" : ""}`}
        style={props.style}
      >
        <Label />
        <Input inputRef={inputRef} />
      </AIWrapper>
    </ATHOSInputProvider>
  );
};
