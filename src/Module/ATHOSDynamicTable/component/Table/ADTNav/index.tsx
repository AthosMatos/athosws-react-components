import { useEffect, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ATHOSPopUp } from "../../../../ATHOSPopUp/component";
import { movePage } from "../../redux/Filtering/provider";
import { setCheckState } from "../../redux/Select/provider";
import { ADTState } from "../../redux/store";
import useSelectors_ADTNav from "./useSelectors";

interface NavButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
}

const PageButton = ({ num, move, selected }: { num: number | string; move: (to: number | "prev" | "next") => void; selected: boolean }) => {
  return (
    <p
      onClick={() => {
        typeof num == "number" && move(num);
      }}
      className={`flex 
        text-zinc-600 dark:text-zinc-300
        text-sm
cursor-pointer w-5 h-5 rounded-[0.2rem] transition-all duration-100
items-center justify-center hover:border-zinc-300 hover:border
${selected ? "dark:bg-zinc-700 bg-zinc-200 border border-zinc-300 dark:border-zinc-600" : "opacity-50"}`}
    >
      {num}
    </p>
  );
};

const NavButton = ({ onClick, children, disabled }: NavButtonProps) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`transition-all 
        dark:bg-zinc-800 hover:dark:bg-zinc-700 hover:bg-zinc-200 
        active:scale-95 
        text-zinc-400 dark:text-zinc-300 
        hover:dark:border-zinc-600 border border-zinc-300 dark:border-zinc-700
        rounded-lg duration-100
        w-9 h-9 flex items-center justify-center ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </div>
  );
};

const ADTNav = () => {
  const { totalItems, page, pageSize, data } = useSelectors_ADTNav();
  const dispatch = useDispatch();
  const canGoForward = useMemo(() => page * pageSize < totalItems, [totalItems, page, pageSize]);
  const canGoBack = useMemo(() => page > 1, [page]);
  const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);
  const dataLen = useSelector((state: ADTState) => state.ADTPropsReducer.data)?.length;
  const selectedpages = useSelector((state: ADTState) => state.ADTSelectReducer.selectedPages);
  const move = (to: number | "prev" | "next") => {
    if (
      (typeof to == "number" && selectedpages.includes(to)) ||
      (to == "next" && selectedpages.includes(page + 1)) ||
      (to == "prev" && selectedpages.includes(page - 1))
    ) {
      dispatch(setCheckState({ pages: selectedpages }));
    }

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
  useEffect(() => {
    if (!selectedpages.includes(page)) dispatch(setCheckState(0));
  }, [page]);
  const loading = useSelector((state: ADTState) => state.ADTPropsReducer.loading);

  const pageButtonsMap =
    totalPages <= 6 ? Array.from({ length: totalPages }, (_, i) => i + 1) : [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];

  const pagesInBetween = totalPages > 5 ? Array.from({ length: totalPages - 6 }, (_, i) => i + 4) : [];

  return (
    !loading &&
    dataLen > 0 && (
      <div className="flex-1 items-end select-none flex mt-4 w-full justify-end self-end">
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2 text-lg items-center">
            <NavButton disabled={!canGoBack} onClick={() => move("prev")}>
              <IoIosArrowBack />
            </NavButton>
            <div
              className="rounded-md items-center 
            justify-center flex border
             dark:border-zinc-700 dark:bg-zinc-800 border-zinc-300
             w-8 h-8 
            
             
             "
            >
              <p className="font-medium text-zinc-500 dark:text-zinc-300 ">{page}</p>
            </div>
            <NavButton disabled={!canGoForward} onClick={() => move("next")}>
              <IoIosArrowForward />
            </NavButton>
          </div>
          <div className="flex gap-1">
            {totalPages > 1 &&
              pageButtonsMap.map((num) =>
                typeof num == "number" ? (
                  <PageButton key={num} move={move} num={num} selected={num === page} />
                ) : (
                  <ATHOSPopUp
                    content={
                      <div className="flex flex-col gap-2 dark:bg-black bg-zinc-200 p-2 rounded-md border border-zinc-300  border-opacity-40">
                        <div>
                          <input
                            type="number"
                            placeholder="Go to page"
                            className="w-full dark:bg-black bg-zinc-200 dark:text-snow text-black rounded-md outline-none transition-colors focus:border-zinc-400 p-1 border border-zinc-500 "
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (val > 0 && val <= totalPages) {
                                move(val);
                              }
                            }}
                          />
                        </div>
                        <div className="max-w-48 overflow-auto">
                          <div className="flex gap-1 w-fit ">
                            {pagesInBetween.map((pib, i) => (
                              <PageButton key={pib} move={move} num={pib} selected={pib === page} />
                            ))}
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <PageButton key={num} move={move} num={num} selected={pagesInBetween.includes(page)} />
                  </ATHOSPopUp>
                )
              )}
          </div>
        </div>
      </div>
    )
  );
};

export default ADTNav;
