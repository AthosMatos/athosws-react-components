import { useEffect } from "react";

const useSetPortal = ({
  portalId,
  setRoot,
  onUnmount,
}: {
  portalId: string;
  setRoot: (root: HTMLElement | null) => void;
  onUnmount?: () => void;
}) => {
  useEffect(() => {
    const dropDownRoot = document.createElement("div");
    dropDownRoot.id = portalId; // Set the id to ATHOSDropDown

    // Append the div to the root of the document
    document.body.appendChild(dropDownRoot);

    // Set it to state so we can use it for rendering the dropdown
    setRoot(dropDownRoot);

    // Cleanup function to remove the div when the component unmounts
    return () => {
      dropDownRoot.remove();
      onUnmount && onUnmount();
    };
  }, []);
};

export default useSetPortal;
