import { ATHOSPopUp } from "../component";

const ATHOSPopUpPage = () => {
  return (
    <div>
      <ATHOSPopUp content={<div className="p-2 bg-blue-500">PopUp</div>}>
        <div className="p-2 bg-red-500">PopUp</div>
      </ATHOSPopUp>
    </div>
  );
};

export default ATHOSPopUpPage;
