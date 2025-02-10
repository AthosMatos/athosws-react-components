import { ATHOSDropDown } from "../component";

const ATHOSDropDownPage = () => {
  return (
    <div>
      <ATHOSDropDown
        labels={[
          {
            label: "Item 1",
          },
          {
            label: "Item 2",
          },
        ]}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ATHOSDropDown>
    </div>
  );
};

export default ATHOSDropDownPage;
