import { useState } from "react";
import { ATHOSSelect } from "../component";
const items = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
  { label: "Option 5", value: "option5" },
  { label: "Option 6", value: "option6" },
  { label: "Option 7", value: "option7" },
  { label: "Option 8", value: "option8" },
  { label: "Option 9", value: "option9" },
];

const ATHOSSelectPage = () => {
  const [selectedItem, setSelectedItem] = useState<string | number>("option4");
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>(["option4"]);
  const fakePostSelected = async (selected: (string | number)[]) => {
    return new Promise((resolve) => {
      setSelectedItem(selected[0]);
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  };

  const fakePostSelecteds = async (selected: (string | number)[]) => {
    return new Promise((resolve) => {
      setSelectedItems(selected);
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  };
  const fakeGetSelected = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(selectedItems);
      }, 1000);
    });
  };
  return (
    <div>
      <div className="flex gap-2">
        <ATHOSSelect
          multiSelect
          selected={selectedItems}
          onChange={async (newItems) => {
            await fakePostSelecteds(newItems);
            //setSelectedItems(newItems);
          }}
          matchLabelWidth
          className="w-[300px] h-[42px] bg-white bg-opacity-10 rounded-lg text-white"
          listContainerClassName="bg-white max-h-[220px] bg-opacity-10 rounded-lg text-white p-[0.3rem] gap-1 border border-white border-opacity-10"
          labelClassName="transition-all p-2 hover:bg-white hover:bg-opacity-10 rounded-md border border-transparent"
          selectedLabelClassName="bg-white bg-opacity-10 border-white border-opacity-10"
          position="bottom"
          labels={items}
        />
        <ATHOSSelect
          // multiSelect
          inline
          selected={selectedItem}
          onChange={async (newItems) => {
            await fakePostSelected(newItems);
            //setSelectedItems(newItems);
          }}
          matchLabelWidth
          className="w-[300px] h-[42px] bg-white bg-opacity-10 rounded-lg text-white"
          listContainerClassName="bg-white max-h-[220px] bg-opacity-10 rounded-lg text-white p-[0.3rem] gap-1 border border-white border-opacity-10"
          labelClassName="transition-all p-2 hover:bg-white hover:bg-opacity-10 rounded-md border border-transparent"
          selectedLabelClassName="bg-white bg-opacity-10 border-white border-opacity-10"
          position="bottom"
          labels={items}
        />
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Quisquam, voluptatibus. Quisquam, voluptatibus.
    </div>
  );
};

export default ATHOSSelectPage;
