import { useATHOSSideMenu } from "../../context/context";

const PageTitle = () => {
  const {
    selectedData,
    props: { colors, extraHeader },
  } = useATHOSSideMenu();

  return (
    selectedData?.pageText && (
      <div
        style={{
          backgroundColor: selectedData.pageText.backColor,
          borderBottom: `1px solid ${colors.sideBorder}`,
        }}
        className="bg-white w-full px-4 pt-3 pb-2 flex flex-col text-black"
      >
        <p
          style={{
            color: selectedData.pageText.title.color,
          }}
          className="text-3xl font-semibold leading-6"
        >
          {selectedData.pageText.title.value}
          <p
            style={{
              color: selectedData.pageText.subTitle?.color,
            }}
            className="text-lg font-light "
          >
            {selectedData.pageText.subTitle?.value}
          </p>
        </p>
        {extraHeader}
      </div>
    )
  );
};

export default PageTitle;
