import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { AppState } from "../../..";
import { ATHOSDropDown } from "../../ATHOSDropDown/component";
import { ATHOSInput } from "../../ATHOSInput/component";
import { ATHOSDynamicTable } from "../component";
import { rd } from "./data";
import { tdata } from "./data-CC71BNrg8tmzETG2KjpiS";

const ComarcaComponent = ({
  data,
  comarcaTableData,
  setComarcaTableData,
}: {
  comarcaTableData: any;
  data: any;
  setComarcaTableData: (data: any) => void;
}) => {
  const [value, setValue] = useState(data.comarca);
  return (
    <ATHOSInput
      colors={{
        backgroundColor: "rgba(0, 0, 0, 0.06)",
        borderColor: "transparent",
      }}
      value={value}
      onChange={(text) => {
        setValue(text);
      }}
      onBlur={() => {
        if (value !== data.comarca) {
          const newData = comarcaTableData.map((dt: any) => (dt.id === data.id ? { ...dt, comarca: value } : dt));
          setComarcaTableData(newData);
        }
      }}
    />
  );
};

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
  const [realData, setRealData] = useState(rd);
  const [comarcaTableData, setComarcaTableData] = useState([
    {
      id: v4(),
      comarca: "São Paulo",
      regionais: "Natal",
      uf: "SP",
    },
    {
      id: v4(),
      comarca: "João Pessoa",
      regionais: "São Paulo",
      uf: "PB",
    },
    {
      id: v4(),
      comarca: "São Paulo",
      regionais: "São Paulo",
      uf: "SP",
    },
  ]);

  return (
    <>
      <ATHOSDynamicTable
        loading={loading ? "Carregando..." : loading}
        extraCellColumns={[
          {
            label: "Ações",
            component: (compdata) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <ATHOSDropDown
                  onToggle={(isOpen) => setIsOpen(isOpen)}
                  position="left-top"
                  className="bg-white border dark:bg-smooth-dark-grey p-1 rounded-md flex flex-col dark:border-zinc-600 gap-1 dark:bg-zinc-900 dark:bg-opacity-80 backdrop-blur-md"
                  buttonClassName={`p-1 self-center justify-self-center text-base rounded-md 
                    ${isOpen ? "bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10" : ""}`}
                  labelClassName="bg-zinc-100 transition-colors w-full dark:bg-zinc-800 p-2 rounded-md border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                  cols={[
                    [
                      {
                        label: "Remover",
                        onClick: () => {
                          const newData = data.filter((dt) => dt.id !== compdata.id);
                          setData(newData);
                        },
                      },
                    ],
                    [
                      {
                        label: "Adicionar",
                        onClick: () => {
                          const newData = data.map((dt) => (dt.id === compdata.id ? { ...dt, name: "edited" } : dt));
                          setData(newData);
                        },
                      },
                    ],
                  ]}
                >
                  <IoMenu />
                </ATHOSDropDown>
              );
            },
          },
        ]}
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
        persistPrimaryColumn={{
          backgroundColor: isDark ? "rgb(41, 41, 41)" : "rgba(233, 233, 233)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.13)" : "rgba(0, 0, 0, 0.13)",
        }}
        // persistPrimaryColumn={false}
        boldColumns
        tableSelectedFuncs={{
          funcs: [
            {
              label: "Remover",
              onClick: (selectedData) => {
                const newData = data.filter((dt) => !selectedData.find((sd) => sd.id === dt.id));

                setData(newData);
              },
            },
            {
              label: "Adicionar",
              onClick: (selectedData) => {
                const newData = [...data, { id: v4(), name: "new" }] as any;
                setData(newData);
              },
            },
          ],
        }}
        columnOrder={["id"]}
        globalConfig={{
          minColWidthToShort: 100, // when the column width is less than this value, the column will be short,
          maxCharToCut: 10, // when the string length is more than this value, it will be cut and show tooltip
        }}
        selectedRowsToast={{
          containerColor: {
            className: "bg-snow dark:bg-zinc-800 text-black dark:text-white border border-smooth-darker-grey dark:border-zinc-700",
          },
        }}
        tableStyle={{
          selected: {
            rowColor: "#e2f1f0",
            rowBorderColor: "#a1d4ce",
            selectedIconColor: "#1FB5AD",
            rowSpacingColor: !isDark ? "rgb(255, 255, 255)" : "rgb(19, 19, 19)",
            rowTextColor: "#1FB5AD",
          },
        }}
        //paddingInCells={"0.4rem"}
        spacingBetweenCells={8}
        data={data}
        className="text-sm"
        tableName="Fake Data"
      />

      <ATHOSDynamicTable
        //boldColumns
        selectedRowsToast={{
          containerColor: {
            className: "bg-snow dark:bg-zinc-800",
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
        persistPrimaryColumn={false}
        columnOrder={["txNumero"]}
        globalConfig={{
          maxCharToCut: 10,
          minColWidthToShort: 150,
        }}
        extraCellColumns={[
          {
            component: (data) => {
              return <div className="text-black dark:text-snow">{data.id}</div>;
            },
          },
        ]}
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
              return <div className="bg-red-500 text-snow">{data.txNumero}</div>;
            },
          },
          {
            column: "txNumero",
            label: "Número da Transação",
          },
        ]}
        tableName="Real Data"
      />

      <ATHOSDynamicTable
        persistPrimaryColumn={{
          backgroundColor: "rgba(238, 255, 254, 1)",
          borderColor: "rgba(48, 159, 153, 1)",
        }}
        data={comarcaTableData}
        columnOrder={["comarca"]}
        columnsToHide={["id"]}
        colConfig={{
          comarca: {
            cellComponent: (data) => (
              <ComarcaComponent comarcaTableData={comarcaTableData} setComarcaTableData={setComarcaTableData} data={data} />
            ),
          },
        }}
        tableName="Test table"
        tableStyle={{
          selected: {
            rowColor: "rgba(222, 255, 253, 1)",
            rowBorderColor: "rgba(27, 132, 127, 1)",
            rowTextColor: "rgba(27, 132, 127, 1)",
          },
        }}
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
