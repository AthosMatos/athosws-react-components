import { useEffect, useMemo, useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { ATHOSCards, GripIcon } from "../component/v2";
import { DeleteHandle } from "../component/v2/DeleteHandle";
import { DragHandle } from "../component/v2/DragHandle";

const ATHOSCardPage = () => {
  const [fakeAsyncData, setFakeAsyncData] = useState(null);

  useEffect(() => {
    async function fakedataget() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("data");
        }, 1000);
      });
    }

    fakedataget().then((data) => {
      setFakeAsyncData(data);
    });
  }, []);
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

  // Use useMemo to create the full item structure
  const memoizedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        component: <div>{fakeAsyncData}</div>,
      })),
    [items, fakeAsyncData] // Recompute when items OR fakeAsyncData changes
  );
  return (
    <div>
      <ATHOSCards
        className="flex gap-4 flex-wrap"
        items={memoizedItems}
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
            {item.component}
          </div>
        )}
      />
    </div>
  );
};

export default ATHOSCardPage;
