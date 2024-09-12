import { useEffect } from "react";

const useADDSetPortal = (
  DDid: string,
  setDropdownRoot: (root: HTMLElement | null) => void
) => {
  useEffect(() => {
    const dropDownRoot = document.createElement("div");
    dropDownRoot.id = DDid; // Set the id to ATHOSDropDown

    // Append the div to the root of the document
    document.body.appendChild(dropDownRoot);

    // Set it to state so we can use it for rendering the dropdown
    setDropdownRoot(dropDownRoot);

    // Cleanup function to remove the div when the component unmounts
    return () => {
      dropDownRoot.remove();
    };
  }, []);
};

export default useADDSetPortal;
