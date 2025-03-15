import { useEffect, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ATHOSPopUp } from "../../../../../ATHOSPopUp/component";
import { generateColorShades } from "../../../../../utils/color-utils";
import { movePage } from "../../../redux/Filtering/provider";
import { setCheckState } from "../../../redux/Select/provider";
import { ADTState } from "../../../redux/store";
import useSelectors_ADTNav from "./useSelectors";

interface NavButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
}

const PageButton = ({ num, move, selected }: { num: number | string; move: (to: number | "prev" | "next") => void; selected: boolean }) => {
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor);
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);
  return (
    <p
      style={{
        color: textColor,
        backgroundColor: accentColor,
      }}
      onClick={() => {
        typeof num == "number" && move(num);
      }}
      className={`flex hover:text-gray-700 text-sm
cursor-pointer w-5 rounded-[0.2rem] h-5 transition-all duration-100
items-center justify-center hover:border-gray-300 hover:border
${selected ? "bg-gray-100 text-gray-700 border border-gray-300" : "opacity-50"}`}
    >
      {num}
    </p>
  );
};

const NavButton = ({ onClick, children, disabled }: NavButtonProps) => {
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor);
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);

  return (
    <div
      style={{
        color: textColor,
        backgroundColor: accentColor,
        borderColor: accentColor && generateColorShades(accentColor).light,
      }}
      onClick={disabled ? undefined : onClick}
      className={`transition-all bg-gray-100 
        active:scale-95 text-gray-400
        rounded-lg border border-gray-300 duration-100
         w-9 h-9 flex items-center justify-center ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-gray-200 "}`}
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
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor);
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);
  const loading = useSelector((state: ADTState) => state.ADTPropsReducer.loading);

  const pageButtonsMap =
    totalPages <= 6 ? Array.from({ length: totalPages }, (_, i) => i + 1) : [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];

  const pagesInBetween = totalPages > 5 && Array.from({ length: totalPages - 6 }, (_, i) => i + 4);

  return (
    !loading &&
    dataLen > 0 && (
      <div className="flex-1 items-end select-none flex mt-4 w-full justify-end  self-end">
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2 text-lg items-center">
            <NavButton disabled={!canGoBack} onClick={() => move("prev")}>
              <IoIosArrowBack />
            </NavButton>
            <div
              style={{
                color: textColor,
                borderColor: accentColor && generateColorShades(accentColor).light,
              }}
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
          <div className="flex text-gray-400 gap-1">
            {totalPages > 1 &&
              pageButtonsMap.map((num) =>
                typeof num == "number" ? (
                  <PageButton key={num} move={move} num={num} selected={num === page} />
                ) : (
                  <ATHOSPopUp
                    content={
                      <div className="max-w-48 overflow-auto dark:bg-black bg-gray-200 p-2 rounded-md border border-gray-300  border-opacity-40">
                        <div className="flex gap-1 w-fit ">
                          {pagesInBetween.map((pib, i) => (
                            <PageButton key={pib} move={move} num={pib} selected={pib === page} />
                          ))}
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
