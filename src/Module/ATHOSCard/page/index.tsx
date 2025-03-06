import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { ATHOSCards, GripIcon } from "../component/v2";
import { DeleteHandle } from "../component/v2/DeleteHandle";
import { DragHandle } from "../component/v2/DragHandle";

const ATHOSCardPage = () => {
  const [items, setItems] = useState([
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
    {
      id: "6",
    },
    {
      id: "7",
    },
  ]);
  return (
    <div>
      <ATHOSCards
        className="flex gap-4 flex-wrap"
        items={items}
        update={(changeItems) => setItems(changeItems)}
        render={(item) => (
          <div className="w-72 rounded-md flex items-center flex-col border border-black bg-slate-600">
            <div className="flex justify-center w-full relative pt-2">
              <DragHandle>
                <GripIcon className="w-32" />
              </DragHandle>
              <DeleteHandle className="absolute right-4">
                <FaMinus />
              </DeleteHandle>
            </div>

            {item.id}
          </div>
        )}
      />
    </div>
  );
};

export default ATHOSCardPage;
