import { useState } from "react";
import { ATHOSColors } from "../../colors/colors";
import { ATHOSInput } from "../component";

const ATHOSInputPage = () => {
  const [values, setValues] = useState(["", "", "test", "dsad", ""]);
  return (
    <div className="flex flex-col gap-2 ">
      <ATHOSInput
        value={values[0]}
        label={"Label"}
        onChange={(text) => {
          setValues((prev) => {
            let newValues = [...prev];
            newValues[0] = text.currentTarget.value;
            return newValues;
          });
        }}
        placeholder="Placeholder"
        colors={{
          focused: {
            borderColor: ATHOSColors.aqua.default,
          },
        }}
      />
      <ATHOSInput
        value={values[1]}
        onChange={(text) => {
          setValues((prev) => {
            let newValues = [...prev];
            newValues[1] = text.currentTarget.value;
            return newValues;
          });
        }}
        placeholder="Placeholder"
        type="password"
      />
      <ATHOSInput
        disabled
        value={values[2]}
        onChange={(text) => {
          setValues((prev) => {
            let newValues = [...prev];
            newValues[2] = text.currentTarget.value;
            return newValues;
          });
        }}
        placeholder="Placeholder"
        type="user"
      />
      <ATHOSInput
        disabled
        value={values[3]}
        onChange={(text) => {
          setValues((prev) => {
            let newValues = [...prev];
            newValues[3] = text.currentTarget.value;
            return newValues;
          });
        }}
        onBlur={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setValues((prev) => {
            let newValues = [...prev];
            newValues[3] = "blurred";
            return newValues;
          });
        }}
        placeholder="Placeholder"
        colors={{
          borderColor: "transparent",
          backgroundColor: ATHOSColors.gray.light_2,
        }}
        className="w-[300px]"
      />
    </div>
  );
};

export default ATHOSInputPage;
