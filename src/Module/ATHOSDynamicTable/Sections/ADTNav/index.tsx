import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useADTContext } from "../../context";

interface NavButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
}

const NavButton = ({ onClick, children, disabled }: NavButtonProps) => (
  <div
    onClick={disabled ? undefined : onClick}
    className={`transition-all w-8 h-9 flex items-center justify-center ${
      disabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer hover:bg-gray-300 "
    }`}
  >
    {children}
  </div>
);

const ADTNav = () => {
  const {
    pageState: { movePage, page, canGoBack, canGoForward, totalPages },
  } = useADTContext();
  return (
    <div className="flex mt-4 w-full justify-end sticky bottom-0 left-0 self-end">
      <div className="flex flex-col items-center ">
        <div className="overflow-hidden bg-white flex gap-2 text-lg text-gray-500 rounded-lg select-none border border-gray-300 rounded-t-md items-center">
          <NavButton disabled={!canGoBack} onClick={() => movePage("prev")}>
            <IoIosArrowBack />
          </NavButton>
          <p className="w-fit h-fit  font-medium">{page}</p>
          <NavButton disabled={!canGoForward} onClick={() => movePage("next")}>
            <IoIosArrowForward />
          </NavButton>
        </div>
        <div className="flex text-gray-400 gap-4">
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`
                hover:text-gray-700 cursor-pointer
            ${num === page ? "underline text-gray-700" : ""}
            `}
                onClick={() => movePage(num)}
              >
                {num}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ADTNav;
