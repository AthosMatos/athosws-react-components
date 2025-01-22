import { createRoot } from "react-dom/client";
import { ATHOSToast2 } from ".";
import { ATHOSToastProps2 } from "./interfaces";
export const useATHOSToast = () => {
  const toast = (t: React.ReactNode | JSX.Element, props?: ATHOSToastProps2) => {
    const target = document.createElement("div");

    const root = createRoot(target);
    root.render(<ATHOSToast2 children={t} renderCondition renderAndFade {...props} />);
    document.body.appendChild(target);
  };

  return { toast };
};
