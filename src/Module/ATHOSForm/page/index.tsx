import { useForm } from "react-hook-form";
import { ATHOSForm, FormFields } from "../component";

const values: FormFields[] = [
  {
    name: "firstName",
    label: "First Name",
    fieldType: "text",
    placeholder: "Enter your first name",
    required: true,
    className: "w-full",
  },
  {
    name: "lastName",
    label: "Last Name",
    fieldType: "text",
    placeholder: "Enter your last name",
    required: true,
    disabled: true,
    className: "w-full",
  },
  {
    name: "email",
    label: "Email",

    fieldType: "email",
    placeholder: "Enter your email",
    required: true,
    className: "w-full",
  },

  {
    name: "phoneNumber",
    label: "Phone Number",
    className: "w-full",
    fieldType: "tel",
    placeholder: "Enter your phone number",
  },
  {
    name: "checkk",
    label: "Check",

    fieldType: "check",
    placeholder: "Enter your phone number",
    className: "w-10",
  },
];

interface formValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const ATHOSFormPage = () => {
  const { register, watch } = useForm<formValues>();

  const watchAllFields = watch(); // Watch all fields
  console.log(watchAllFields); // Log all field values
  return (
    <div className="flex flex-col gap-2 ">
      <ATHOSForm maxFieldsWidth="18rem" fields={values} register={register} />
    </div>
  );
};

export default ATHOSFormPage;
