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
    className={`transition-all bg-gray-100 
      active:scale-95 text-gray-400
      rounded-lg border border-gray-300
       w-9 h-9 flex items-center justify-center ${
         disabled
           ? "opacity-30 cursor-not-allowed"
           : "cursor-pointer hover:bg-gray-200 "
       }`}
  >
    {children}
  </div>
);

const ADTNav = () => {
  const { totalItems } = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer
  );
  const { page, pageSize } = useSelector(
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

  const move = (to: number | "prev" | "next") => {
    dispatch(
      movePage({
        canGoBack,
        canGoForward,
        page,
        to,
        totalPages,
        data,
      })
    );
  };
  return (
    <div className="flex-1 items-end select-none flex mt-4 w-full justify-end sticky bottom-0 left-0 self-end">
      <div className="flex flex-col items-center ">
        <div className="bg-white flex gap-2 text-lg text-gray-500 items-center">
          <NavButton disabled={!canGoBack} onClick={() => move("prev")}>
            <IoIosArrowBack />
          </NavButton>
          <div
            className="rounded-md items-center 
            justify-center flex border
             border-gray-300 w-8 h-8 text-gray-400"
          >
            <p className="font-medium">{page}</p>
          </div>
          <NavButton disabled={!canGoForward} onClick={() => move("next")}>
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
                onClick={() => move(num)}
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
