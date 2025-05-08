import { useState } from "react";
import { ATHOSInput } from "../../ATHOSInput/component";
import { ATHOSInputType } from "../../ATHOSInput/component/interfaces";

interface formValues {
  label: string;
  value: string;
  type: ATHOSInputType;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  error: string;

  maxLength: number;
  minLength: number;
}

export const ATHOSForm = () => {
  const [values, setValues] = useState<formValues[]>([
    {
      label: "Name",
      value: "",
      type: "text",
      placeholder: "Enter your name",
      required: true,
      disabled: false,
      error: "",
      maxLength: 50,
      minLength: 1,
    },
    {
      label: "Email",
      value: "",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      disabled: false,
      error: "",
      maxLength: 50,
      minLength: 5,
    },
    // Add more fields as needed
  ]);
  return (
    <div className="flex flex-col gap-2 ">
      {values.map((field, index) => (
        <ATHOSInput
          key={index}
          label={field.label}
          value={field.value}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          disabled={field.disabled}
          error={field.error}
          maxLength={field.maxLength}
          minLength={field.minLength}
          onChange={(e) => {
            const newValues = [...values];
            newValues[index].value = e.target.value;
            setValues(newValues);
          }}
        />
      ))}
    </div>
  );
};
