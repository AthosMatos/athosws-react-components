import { useEffect, useState } from "react";

export type PageSizesType = 5 | 10 | 20 | 50 | 100;
interface useADTFilterDataProps {
  data: any[];
  movePageTransitionDuration?: number;
}

const useADTFilterData = ({
  data,
  movePageTransitionDuration = 200,
}: useADTFilterDataProps) => {
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [searchFilter, setsearchFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<PageSizesType>(5);
  const [moving, setMoving] = useState<boolean>(false);
  const totalPages = Math.ceil(data.length / pageSize);
  const canGoForward = page * pageSize < data.length;
  const canGoBack = page > 1;

  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = data.slice(start, end);
    setFilteredData(paginatedData);
  }, [page, pageSize, data]);

  const filterBySearch = (search: string) => {
    setsearchFilter(search);
    const filtered = data
      .filter((row) => {
        return Object.values(row).some((value: any) => {
          return value.toString().toLowerCase().includes(search.toLowerCase());
        });
      })
      .slice(0, pageSize);
    setFilteredData(filtered);
  };

  const movePage = (to: "next" | "prev" | number) => {
    if (typeof to === "number" && to > 0 && to <= totalPages && to !== page) {
      setMoving(true);
      setTimeout(() => {
        setPage(to);
        setMoving(false);
      }, movePageTransitionDuration);
      return;
    }
    if ((to === "next" && !canGoForward) || (to === "prev" && !canGoBack)) {
      return;
    }
    setMoving(true);
    setTimeout(() => {
      if (to === "next" && page * pageSize < data.length) {
        setPage((prev) => prev + 1);
      } else if (to === "prev" && page > 1) {
        setPage((prev) => prev - 1);
      }
      setMoving(false);
    }, movePageTransitionDuration);
  };

  const changePageSize = (size: PageSizesType) => {
    setPageSize(size);
  };

  return {
    filteredData,
    searchFilter,
    page,
    pageSize,
    filterBySearch,
    movePage,
    changePageSize,
    moving,
    canGoBack,
    canGoForward,
    totalPages,
  };
};

export default useADTFilterData;
