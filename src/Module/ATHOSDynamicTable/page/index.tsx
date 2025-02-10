import { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { ATHOSDynamicTable } from "../component";
import { tdata } from "./data-CC71BNrg8tmzETG2KjpiS";

const ATHOSDynamicTablePage = () => {
  const [tableData, setTableData] = useState(tdata);

  return (
    <div className="">
      <PageTitle title="Dynamic Table" subtitle="Dynamic Table Page" />
      <ATHOSDynamicTable data={tableData} tableName="Test Table" />
    </div>
  );
};

export default ATHOSDynamicTablePage;
