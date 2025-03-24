import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../..";
import { ATHOSDynamicTable } from "../component";
import { useATHOSDynamicTableContext } from "../component/context";
import { realData as rd } from "./data";

const ATHOSDynamicTablePage = () => {
  const theme = useSelector((state: AppState) => state.ThemeReducer.theme);
  const isDark = theme === "dark";
  const { selectedData } = useATHOSDynamicTableContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [realData, setRealData] = useState(rd);

  return (
    <>
      {/*  <ATHOSDynamicTable
        loading={loading ? "Carregando..." : loading}
        customColumns={[
          {
            newLabel: "New Label",
            colsToGet: ["address", "currency", "email"],
            index: 1,
            render: (data) => {
              //console.log("data", data);
              return (
                <div>
                  Custom Col
                </div>
              );
            },
          },
        ]}
        persistPrimaryColumn={{
          backgroundColor: isDark ? "rgba(41, 41, 41, 0.726)" : "rgba(0, 0, 0, 0.055)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.13)" : "rgba(0, 0, 0, 0.13)",
        }}
        columnOrder={["id"]}
        globalConfig={{
          minColWidthToShort: 100, // when the column width is less than this value, the column will be short,
          maxCharToCut: 10, // when the string length is more than this value, it will be cut and show tooltip
        }}
        selectedRowsTooltip={{
          containerColor: {
            className: "bg-white dark:bg-zinc-800",
          },
        }}
        tableStyle={{
          textColor: isDark ? "white" : "black",
          accentColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          cellTextColor: {
            global: isDark ? "white" : "black",
          },
          highlightColor: isDark ? "rgb(85, 85, 85)" : "rgb(212, 212, 212)",
          columnTextColor: {
            global: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          },
          // highlightColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          //accentColor2: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
        }}
        data={tdata}
        tableName="Fake Data"
      /> */}

      <ATHOSDynamicTable
        boldColumns
        selectedRowsTooltip={{
          containerColor: {
            className: "bg-white dark:bg-zinc-800",
          },
          mainFunc: {
            label: "Remover",
            onClick: (data) => {
              const newData = realData.filter((rd) => data.find((d) => d.id !== rd.id));
              setRealData(newData);
            },
          },
        }}
        columnsToShow={["dtDataHoraEnvio", "txNumero", "txAssunto"]}
        resizeable
        loading={loading ? "Carregando..." : loading}
        persistPrimaryColumn={{
          backgroundColor: isDark ? "rgba(41, 41, 41, 0.726)" : "rgba(233, 233, 233, 0.973)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.13)" : "rgba(0, 0, 0, 0.13)",
        }}
        columnOrder={["txNumero"]}
        globalConfig={{
          maxCharToCut: 10,
          minColWidthToShort: 150,
        }}
        /*  colConfig={{
          txAssunto: {
            //maxCharToCut: 30,
            minColWidthToShort: 150,

            //className: "min-w-max",
          },
          txNumero: {
            minColWidthToShort: 150,
          },
        }} */
        extraCellColumns={[
          {
            component: (data) => {
              return <div className="text-black dark:text-white">{data.id}</div>;
            },
          },
        ]}
        spacingBetweenCells={4}
        spacingBetweenColumns={10}
        tableStyle={{
          selected: {
            rowBorderColor: "rgb(151, 29, 104)",
            rowColor: "rgb(212, 127, 180)",
            rowTextColor: "rgb(136, 16, 92)",
          },
          textColor: isDark ? "white" : "black",
          accentColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.884)",
          accentColor2: isDark ? "rgba(255, 255, 255, 0.05)" : "rgb(226, 226, 226)",
          cellTextColor: {
            global: isDark ? "white" : "black",
          },
          highlightColor: "rgb(37, 130, 184)",
          columnTextColor: {
            global: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          },
        }}
        //startShort
        data={realData}
        extraColumns={[
          {
            column: "txNumero",
            label: "N T",
            cellComponent: (data) => {
              return <div className="bg-red-500 text-white">{data}</div>;
            },
          },
          {
            column: "txNumero",
            label: "Número da Transação",
          },
        ]}
        tableName="Real Data"
      />

      {/* <ATHOSDynamicTable
        tableWrapperClassName="h-full"
        className="h-full"
        resizeable
        persistPrimaryColumn={{
          backgroundColor: isDark ? "rgba(41, 41, 41, 0.726)" : "rgba(0, 0, 0, 0.055)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.13)" : "rgba(0, 0, 0, 0.13)",
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
        data={undefined}
        tableName="Test Table 2"
      />

      <ATHOSDynamicTable
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
        wrapperClassName="h-[600px]"
        data={[]}
        noDataPlaceholder={<div className="w-full h-full flex items-center justify-center">No Data</div>}
        tableName="Test Table 3"
      /> */}
    </>
  );
};

export default ATHOSDynamicTablePage;
