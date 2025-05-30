import React from "react";
import { createRoot } from "react-dom/client";
import { ATHOSModal } from ".";
import { ATHOSModalProps } from "./interfaces";
export const useATHOSModal = () => {
  const modal = (t: React.ReactNode | React.JSX.Element, props?: ATHOSModalProps) => {
    const target = document.createElement("div");

    const root = createRoot(target);
    root.render(<ATHOSModal children={t} {...props} />);
    document.body.appendChild(target);
  };

  return { modal };
};
