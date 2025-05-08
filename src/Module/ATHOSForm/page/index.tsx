import { useState } from "react";
import { ATHOSForm } from "../component";

const ATHOSFormPage = () => {
  const [values, setValues] = useState(["", "", "", "", ""]);
  return (
    <div className="flex flex-col gap-2 ">
      <ATHOSForm />
    </div>
  );
};

export default ATHOSFormPage;
