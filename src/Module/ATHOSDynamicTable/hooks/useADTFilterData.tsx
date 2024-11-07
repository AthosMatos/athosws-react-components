import { useEffect, useState } from "react";

type PageSizesType = 5 | 10 | 20 | 50 | 100;
interface useADTFilterDataProps {
  data: any[];
}

const useADTFilterData = ({ data }: useADTFilterDataProps) => {
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [searchFilter, setsearchFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<PageSizesType>(5);

  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = data.slice(start, end);
    setFilteredData(paginatedData);
  }, [page, pageSize, data]);

  const filterBySearch = (search: string) => {
    setsearchFilter(search);
    const filtered = data.filter((row) => {
      return Object.values(row).some((value: any) => {
        return value.toString().toLowerCase().includes(search.toLowerCase());
      });
    });
    setFilteredData(filtered);
  };

  const movePage = (to: "next" | "prev") => {
    if (to === "next") {
      setPage((prev) => prev + 1);
    } else {
      setPage((prev) => prev - 1);
    }
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
  };
};

export default useADTFilterData;
