import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../..";
import { ATHOSDynamicTable } from "../component";
import { useATHOSDynamicTableContext } from "../component/context";
import { tdata } from "./data-CC71BNrg8tmzETG2KjpiS";

const ATHOSDynamicTablePage = () => {
  const [tableData, setTableData] = useState(tdata);
  const theme = useSelector((state: AppState) => state.ThemeReducer.theme);
  const isDark = theme === "dark";
  const { selectedData } = useATHOSDynamicTableContext();
  console.log("selectedData", selectedData);
  return (
    <>
      <ATHOSDynamicTable
        customColumns={[
          {
            newLabel: "New Label",
            colsToGet: ["address", "currency", "email"],
            index: 1,
            render: (data) => {
              //console.log("data", data);
              return <div>Custom Column dssa</div>;
            },
          },
        ]}
        persistPrimaryColumn={{
          backgroundColor: isDark ? "rgba(41, 41, 41, 0.726)" : "rgba(0, 0, 0, 0.055)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.13)" : "rgba(0, 0, 0, 0.13)",
        }}
        columnOrder={["id"]}
        /* colConfig={{
          country: {
            minColWidthToShort: 10,
            maxCharToCut: 10,
          },
        }} */
        //startShort
        globalConfig={{
          //maxCharToCut: 10,
          shortOnlyifCut: true,
          /*  minColWidthToShort: 10, */
          //shortOnlyifCut: true,
          //minColWidthToShort: 10,
          /*  maxWidth: 100,
          minWidth: 500, */
        }}
        tableStyle={{
          textColor: isDark ? "white" : "black",
          accentColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          cellTextColor: {
            global: isDark ? "white" : "black",
          },
          columnTextColor: {
            global: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          },
          // highlightColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          //accentColor2: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
        }}
        /*  wrapperClassName="h-full"
        className="h-full"
        tableWrapperClassName="h-full" */
        data={tableData}
        tableName="Test Table"
      />

      <ATHOSDynamicTable
        tableWrapperClassName="h-full"
        className="h-full"
        resizeable
        persistPrimaryColumn={{
          backgroundColor: isDark ? "rgba(41, 41, 41, 0.726)" : "rgba(0, 0, 0, 0.055)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.13)" : "rgba(0, 0, 0, 0.13)",
        }}
        globalConfig={{
          maxCharToCut: 10,
          shortOnlyifCut: true,
        }}
        tableStyle={{
          textColor: isDark ? "white" : "black",
          accentColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          cellTextColor: {
            global: isDark ? "white" : "black",
          },
          columnTextColor: {
            global: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          },
        }}
        data={tableData}
        tableName="Test Table 2"
      />
    </>
  );
};

export default ATHOSDynamicTablePage;
