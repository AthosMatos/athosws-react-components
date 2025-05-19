import { ATHOSInputProps } from "./interfaces";
import { AIWrapper } from "./styled";

import { useMemo } from "react";
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
  return (
    <ATHOSInputProvider props={{ ...props, id }}>
      <AIWrapper className={`${props.className} ${props.type === "check" ? "justify-center" : ""}`} style={props.style}>
        <Label />
        <Input />
      </AIWrapper>
    </ATHOSInputProvider>
  );
};
