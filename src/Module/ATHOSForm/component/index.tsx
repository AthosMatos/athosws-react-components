import { UseFormRegister } from "react-hook-form";
import { ATHOSInput } from "../../ATHOSInput/component";
import { ATHOSInputProps, ATHOSInputType } from "../../ATHOSInput/component/interfaces";

export interface FormFields extends ATHOSInputProps {
  name: string;
  label: string;
  fieldType: ATHOSInputType | "select";
  error?: string;
}

interface ATHOSFormProps {
  fields: FormFields[];
  register?: UseFormRegister<any>;
  maxFieldsWidth?: string;
}

export const ATHOSForm = ({ fields, register, maxFieldsWidth }: ATHOSFormProps) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {fields.map((field, index) =>
        field.fieldType === "select" ? null : (
          <ATHOSInput
            key={index}
            {...field}
            style={{ maxWidth: maxFieldsWidth }}
            {...(register
              ? register(field.name, {
                  required: field.required ? `${field.label} is required` : false,
                  validate: (value) => {
                    if (field.type === "email") {
                      return /\S+@\S+\.\S+/.test(value) || `${field.label} is not a valid email`;
                    }
                    return true;
                  },
                })
              : {})}
            type={field.fieldType}
          />
        )
      )}
    </div>
  );
};
