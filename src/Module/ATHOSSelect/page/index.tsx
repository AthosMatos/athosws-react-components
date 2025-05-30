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
      }, 2000);
    });
  };

  const fakePostSelecteds = async (selected: (string | number)[]) => {
    return new Promise((resolve) => {
      setSelectedItems(selected);
      setTimeout(() => {
        resolve(true);
      }, 2000);
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
    <div className="text-black">
      <div className="flex flex-col gap-2">
        <ATHOSSelect
          multiSelect
          selected={selectedItems}
          onChange={async (newItems) => {
            await fakePostSelecteds(newItems);
            //setSelectedItems(newItems);
          }}
          matchLabelWidth
          className="w-[300px] dark:bg-zinc-800 h-[42px] text-black rounded-lg dark:text-white outline outline-zinc-300 outline-1"
          listContainerClassName="backdrop-blur-[0.08rem] dark:bg-zinc-800/80 bg-zinc-200/80 max-h-[220px] rounded-lg p-[0.3rem] gap-1 outline outline-zinc-300 outline-1"
          labelClassName="transition-all p-2 text-zinc-500 rounded-md hover:bg-white/20"
          selectedLabelClassName="bg-white outline outline-1 outline-zinc-300 !text-black hover:!bg-white"
          multiSelectLabelClassName="bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border border-zinc-300 dark:border-zinc-700"
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
          className="w-[300px] dark:bg-zinc-800 h-[42px] text-black rounded-lg dark:text-white outline outline-zinc-300 outline-1"
          listContainerClassName="backdrop-blur-[0.08rem] dark:bg-zinc-800/80 bg-zinc-200/80 max-h-[220px] rounded-lg p-[0.3rem] gap-1 outline outline-zinc-300 outline-1"
          labelClassName="transition-all p-2 text-zinc-500 rounded-md hover:bg-white/20"
          selectedLabelClassName="bg-white outline outline-1 outline-zinc-300 !text-black hover:!bg-white"
          position="bottom"
          labels={items}
        />
        <ATHOSSelect
          // multiSelect
          label="TESTE"
          inline
          search={{
            placeholder: "Pesquisar",
          }}
          matchLabelWidth
          className="w-[300px] dark:bg-zinc-800 h-[42px] text-black rounded-lg dark:text-white outline outline-zinc-300 outline-1"
          listContainerClassName="backdrop-blur-[0.08rem] dark:bg-zinc-800 bg-white max-h-[220px] rounded-lg p-[0.3rem] gap-1 outline outline-zinc-300 outline-1"
          labelClassName="transition-all p-2 text-zinc-300 rounded-md hover:bg-white/20"
          selectedLabelClassName="bg-white !text-black hover:!bg-white"
          position="bottom"
          labels={items}
        />
        <ATHOSSelect
          
          // multiSelect
          thin
          label="TESTE"
          inline
          search={{
            placeholder: "Pesquisar",
          }}
          matchLabelWidth
          className="w-[300px] h-[22px] text-black rounded-lg dark:text-white"
          listContainerClassName="max-h-[220px] rounded-lg p-[0.3rem] gap-1"
          labelClassName="transition-all p-2 text-zinc-300 rounded-md hover:bg-white/20"
          selectedLabelClassName="bg-white !text-black hover:!bg-white"
          position="bottom"
          labels={items}
        />
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Quisquam, voluptatibus. Quisquam, voluptatibus.
    </div>
  );
};

export default ATHOSSelectPage;
