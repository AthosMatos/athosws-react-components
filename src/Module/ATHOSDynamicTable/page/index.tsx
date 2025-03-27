import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { AppState } from "../../..";
import { ATHOSDynamicTable } from "../component";
import { tdata } from "./data-CC71BNrg8tmzETG2KjpiS";

const ATHOSDynamicTablePage = () => {
  const theme = useSelector((state: AppState) => state.ThemeReducer.theme);
  const isDark = theme === "dark";
  /*  type realDataT = (typeof rd)[0];
  const { selectedData } = useATHOSDynamicTableContext<realDataT>();
 */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [data, setData] = useState(tdata);

  return (
    <>
      <ATHOSDynamicTable
        loading={loading ? "Carregando..." : loading}
        customColumns={[
          {
            newLabel: "New Label",
            colsToGet: ["address", "currency", "email"],
            index: 1,
            render: (data) => {
              //console.log("data", data);
              return <div>Custom Col</div>;
            },
          },
        ]}
        /* persistPrimaryColumn={{
          backgroundColor: isDark ? "rgba(41, 41, 41, 0.726)" : "rgba(233, 233, 233, 0.973)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.13)" : "rgba(0, 0, 0, 0.13)",
        }} */
        boldColumns
        tableSelectedFuncs={{
          funcs: [
            {
              label: "Remover",
              onClick: (data) => {
                const newData = data.filter((rd) => data.find((d) => d.id !== rd.id));
                setData(newData);
              },
            },
            {
              label: "Adicionar",
              onClick: (data) => {
                const newData = [...data, { id: v4(), name: "new" }] as any;
                setData(newData);
              },
            },
          ],
        }}
        persistPrimaryColumn={false}
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
          selected: {
            rowColor: "#e2f1f0",
            rowBorderColor: "#a1d4ce",
            selectedIconColor: "#1FB5AD",
            rowSpacingColor: !isDark ? "rgb(244, 244, 245)" : "rgb(24, 24, 27)",
            rowTextColor: "#1FB5AD",
          },
        }}
        paddingInCells={"0.4rem"}
        spacingBetweenCells={8}
        data={tdata}
        className="text-sm"
        tableName="Fake Data"
      />

      {/*  <ATHOSDynamicTable
        //boldColumns
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

          columnTextColor: {
            global: "rgb(10, 235, 40)",
            specific: {
              dtDataHoraEnvio: "rgb(235, 119, 10)",
            },
          },
          cellTextColor: {
            global: "rgb(201, 235, 10)",
            specific: {
              dtDataHoraEnvio: {
                global: "rgb(10, 145, 235)",
              },
            },
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
      /> */}

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
