import { useState } from "react";
import CodeWrapper from "../../../components/CodeWrapper";
import { ATHOSDropDown } from "../component";
import { Docs } from "./docs";

const dropdownCodeStringTopRight = `const [isOpened, setIsOpened] = useState(false);

<ATHOSDropDown
matchChildrenWidth
position="top"
labels={[{ label: "Item 1", onClick: () => {
  alert("Item 1 clicked");
} }, { label: "Item 2", onClick: () => {
  alert("Item 2 clicked");
} }]}
className="bg-zinc-100 border border-gray-300 gap-1 p-1"
onOpen={(isOpen) => {
  setIsOpened(isOpen);
}}
className="bg-zinc-800 border border-zinc-600 p-1"
labelsClassName="text-black p-2 rounded-md hover:bg-zinc-200 transition-all active:bg-zinc-300 active:scale-95">
  <div className="bg-zinc-500 p-2">{isOpened ? "Click to Open" : "Click to Close"}</div>
</ATHOSDropDown>`;

const ATHOSDropDownPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <Docs />
      <div className="bg-zinc-800 p-2 rounded-lg">
        <ATHOSDropDown
          matchChildrenWidth
          position="top"
          labels={[
            {
              label: "Item 1",
              onClick: () => {
                alert("Item 1 clicked");
              },
            },
            {
              label: "Item 2",
              onClick: () => {
                alert("Item 2 clicked");
              },
            },
          ]}
          onToggle={(isOpen) => {
            setIsOpened(isOpen);
          }}
          className="bg-zinc-800 border border-zinc-600 p-1"
          labelClassName="text-white p-2 rounded-md hover:bg-zinc-700 transition-all active:bg-zinc-600 active:scale-95"
        >
          <div className="bg-zinc-500 p-2">{isOpened ? "Click to Open" : "Click to Close"}</div>
        </ATHOSDropDown>
        <CodeWrapper>{dropdownCodeStringTopRight}</CodeWrapper>
      </div>
    </div>
  );
};

export default ATHOSDropDownPage;
