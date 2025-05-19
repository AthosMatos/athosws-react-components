import { useState } from "react";
import { useForm } from "react-hook-form";
import { ATHOSColors } from "../../colors/colors";
import { ATHOSInput } from "../component";

interface formValues {
  firstName: string;
  password: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const ATHOSInputPage = () => {
  const { register, setValue } = useForm<formValues>();
  const [files, setFiles] = useState<FileList | null>(null);
  return (
    <div className="flex flex-col gap-2 w-fit">
      <ATHOSInput
        label={"Label"}
        placeholder="Placeholder"
        colors={{
          focused: {
            borderColor: ATHOSColors.aqua.default,
          },
        }}
        {...register("firstName")}
      />
      <ATHOSInput placeholder="Placeholder" type="password" {...register("password")} />
      <ATHOSInput disabled placeholder="Placeholder" type="user" {...register("lastName")} />
      <ATHOSInput
        onblur={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setValue("email", "blurred");
        }}
        placeholder="Placeholder"
        colors={{
          borderColor: "transparent",
          backgroundColor: ATHOSColors.gray.light_2,
        }}
        className="w-[300px]"
        {...register("email")}
      />

      <ATHOSInput
        type="file"
        placeholder="Placeholder"
        colors={{
          // backgroundColor: ATHOSColors.gray.light_2,
          textColor: ATHOSColors.gray.dark,
        }}
        className="w-[300px]"
        onChange={(e) => {
          console.log(e.target.files);
          setFiles(e.target.files);
        }}
      />

      <ATHOSInput
        label="Urgente"
        type="check"
        colors={{
          // backgroundColor: ATHOSColors.gray.light_2,
          textColor: ATHOSColors.gray.dark,
        }}
        className="w-10"
      />
    </div>
  );
};

export default ATHOSInputPage;
