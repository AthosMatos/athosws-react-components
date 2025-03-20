import { ATHOSDropDown } from "../component";

const ATHOSDropDownPage = () => {
  return (
    <div>
      <div className="bg-gray-200 p-4 h-32 overflow-hidden">
        <ATHOSDropDown
          position="top-right"
          labels={[
            { label: "Item 1", onClick: () => {} },
            { label: "Item 2", onClick: () => {} },
          ]}
          className="bg-zinc-100 border border-gray-300 gap-1 p-1"
          labelsClassName="text-black p-2 rounded-md hover:bg-zinc-200 transition-all active:bg-zinc-300 active:scale-95"
        >
          <div className="bg-zinc-500 p-2">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
          </div>
        </ATHOSDropDown>
      </div>
    </div>
  );
};

export default ATHOSDropDownPage;
