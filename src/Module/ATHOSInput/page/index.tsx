import { useState } from "react";
import { ATHOSColors } from "../../colors/colors";
import { ATHOSInput } from "../component";

const ATHOSInputPage = () => {
  const [values, setValues] = useState(["", "", "", "", ""]);
  return (
    <div className="flex flex-col gap-2 ">
      <ATHOSInput
        value={values[0]}
        label={"Label"}
        onChange={(text) => {
          setValues((prev) => {
            let newValues = [...prev];
            newValues[0] = text;
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
            newValues[1] = text;
            return newValues;
          });
        }}
        placeholder="Placeholder"
        type="password"
      />
      <ATHOSInput
        value={values[2]}
        onChange={(text) => {
          setValues((prev) => {
            let newValues = [...prev];
            newValues[2] = text;
            return newValues;
          });
        }}
        placeholder="Placeholder"
        type="user"
      />
      <ATHOSInput
        value={values[3]}
        onChange={(text) => {
          setValues((prev) => {
            let newValues = [...prev];
            newValues[3] = text;
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
