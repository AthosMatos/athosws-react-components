import { createRoot } from "react-dom/client";
import { ATHOSToast } from ".";
import { ATHOSToastProps } from "./interfaces";
export const useATHOSToast = () => {
  const toast = (t: React.ReactNode | JSX.Element, props?: ATHOSToastProps) => {
    const target = document.createElement("div");

    const root = createRoot(target);
    root.render(<ATHOSToast children={t} renderCondition renderAndFade {...props} />);
    document.body.appendChild(target);
  };

  return { toast };
};
