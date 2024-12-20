import { useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { movePage } from "../../redux/Paging/provider";
import { ADTState } from "../../redux/store";

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
  const { totalItems } = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer
  );
  const { page, pageSize, movingPage } = useSelector(
    (state: ADTState) => state.ADTPagingReducer
  );
  const { data } = useSelector((state: ADTState) => state.ADTPropsReducer);
  const dispatch = useDispatch();
  const canGoForward = useMemo(
    () => page * pageSize < totalItems,
    [totalItems, page, pageSize]
  );
  const canGoBack = useMemo(() => page > 1, [page]);
  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  );
  return (
    <div className="flex-1 items-end select-none flex mt-4 w-full justify-end sticky bottom-0 left-0 self-end">
      <div className="flex flex-col items-center ">
        <div className="overflow-hidden bg-white flex gap-2 text-lg text-gray-500 rounded-lg  border border-gray-300 rounded-t-md items-center">
          <NavButton
            disabled={!canGoBack}
            onClick={() => {
              dispatch(
                movePage({
                  canGoBack,
                  canGoForward,
                  page,
                  to: "prev",
                  totalPages,
                  data,
                })
              );
            }}
          >
            <IoIosArrowBack />
          </NavButton>
          <p className="w-fit h-fit  font-medium">{page}</p>
          <NavButton
            disabled={!canGoForward}
            onClick={() => {
              dispatch(
                movePage({
                  canGoBack,
                  canGoForward,
                  page,
                  to: "next",
                  totalPages,
                  data,
                })
              );
            }}
          >
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
                onClick={() => {
                  dispatch(
                    movePage({
                      canGoBack,
                      canGoForward,
                      page,
                      to: num,
                      totalPages,

                      data,
                    })
                  );
                }}
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
