import { useEffect, useState } from "react";

const useSetPortal = ({ rootId, id, onUnmount }: { rootId: string; id: string; onUnmount?: () => void }) => {
  const [Root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let dropDownRoot = document.getElementById(rootId);
    if (!dropDownRoot) {
      dropDownRoot = document.createElement("div");
      dropDownRoot.id = rootId;
      document.body.appendChild(dropDownRoot);
    }
    const tooltipRoot = document.createElement("div");
    tooltipRoot.id = id;
    dropDownRoot.appendChild(tooltipRoot);

    // Set it to state so we can use it for rendering the dropdown
    setRoot(dropDownRoot);

    // Cleanup function to remove the div when the component unmounts
    return () => {
      tooltipRoot.remove();
      onUnmount && onUnmount();
    };
  }, []);

  return { Root };
};

export default useSetPortal;
