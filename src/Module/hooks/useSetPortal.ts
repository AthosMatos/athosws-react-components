import { useEffect, useState } from "react";

const useSetPortal = ({ portalId, onUnmount }: { portalId?: string; onUnmount?: () => void }) => {
  const [Root, setRoot] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const dropDownRoot = document.createElement("div");
    if (portalId) dropDownRoot.id = portalId; // Set the id to ATHOSDropDown

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

  return { Root };
};

export default useSetPortal;
