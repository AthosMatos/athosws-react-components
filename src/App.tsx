import { useState } from "react";
import { FaFile, FaPlus, FaUser } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { PiGavelFill } from "react-icons/pi";
import styled from "styled-components";
import "./App.css";
import { GroupI } from "./Module/ATHOSCard";
import { ATHOSSideMenu } from "./Module/ATHOSSideMenu";
import { ASMOptionI } from "./Module/ATHOSSideMenu/interfaces";
import { ATHOSColors } from "./Module/colors/colors";

import { tdata } from "./data-CC71BNrg8tmzETG2KjpiS";
import { ATHOSButton, ATHOSDynamicTable } from "./module-index";
const Container = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${ATHOSColors.background};
  //gap: 2rem;
  flex-direction: row;
`;

const Bwrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const mockData: ASMOptionI[] = [
  {
    label: "Dashboard",
    onClick: () => console.log("Dashboard"),
  },
  {
    label: "Acessores",
    Icon: FaUser,
    iconSize: "1.2rem",
    subOptions: [
      {
        label: "teste1",
        onClick: () => console.log("Acessores teste1"),
      },
      {
        label: "teste2",
        onClick: () => console.log("Acessores teste2"),
      },
    ],
  },
  {
    label: "Procurador",
    iconSize: "1.4rem",
    Icon: PiGavelFill,
    subOptions: [
      {
        label: "teste3",
        onClick: () => console.log("Procurador teste3"),
      },
      {
        label: "teste4",
        onClick: () => console.log("Procurador teste4"),
      },
      {
        label: "teste4",
        onClick: () => console.log("Procurador teste4"),
      },
      {
        label: "teste4",
        onClick: () => console.log("Procurador teste4"),
      },
    ],
  },
  {
    label: "Contadoria",
    Icon: MdOutlineAttachMoney,
    onClick: () => console.log("Contadoria"),
  },
];

const TestPage = () => {
  /* 
    import { ReactComponent as ATHOSLogo } from "../../DefaultComponents/assets/ATHOSLogo.svg";
    */
  const [error, setError] = useState<string>();
  const [boards, setBoards] = useState<GroupI[]>([]);
  const [tableData, setTableData] = useState(tdata);
  const [open, setOpen] = useState(false);

  return (
    <ATHOSSideMenu
      collapsableIcon={{
        label: "Hide",
      }}
      editableIcon={{
        label: "Edit",
      }}
      colors={{
        background: ATHOSColors.black.coal,
        sideBorder: ATHOSColors.white.eggshell,
        /*  options: {
          active: "purple",
          accent: ATHOSColors.grey.default,
          specific: { ["Dashboard"]: { default: "red", text: "blue" } },
        }, */
      }}
      options={mockData}
      onExitIcon={{
        label: "Sair",
        onClick: () => console.log("Sair"),
      }}
      asOverlay
      overlayStyle={{
        display: "flex",
        flexDirection: "row",
        //backgroundColor: ATHOSColors.black.coal,
      }}
    >
      {/*  <Categorias_Modal /> */}
      <ATHOSDynamicTable
        //resizeable
        className=" m-4 rounded-md w-full h-3/4"
        persistPrimaryColumn={{
          backgroundColor: ATHOSColors.white.eggshell,
        }}
        extraColumns={[
          {
            showCondition: (data) =>
              parseFloat(data.currency.replace("$", "")) > 3000,
            component: (data) => (
              <ATHOSButton small type="alt" color="#cf1e94">
                Fazer Peça
              </ATHOSButton>
            ),
          },
          {
            //showCondition: (data) => data.status === "Open",
            component: (data) => (
              <ATHOSButton small type="alt" color="#cf1e94">
                <FaFile />
              </ATHOSButton>
            ),
          },
        ]}
        startShort={{
          address: true,
        }}
        tableName="Processos em atuação"
        tableStyle={{
          highlightColor: ATHOSColors.aqua.default,
          cellTextColor: {
            global: "blue",
            specific: {
              address: {
                global: "green",
                specificIndex: { indexes: [5, 6, 7], color: "red" },
              },
              name: {
                condional: {
                  showCondition: (rowColumnData) => {
                    // console.log(rowColumnData);
                    return rowColumnData == "Brennan Maxwell";
                  },
                  color: "green",
                },
              },
            },
          },
          columnTextColor: {
            global: "red",
            specific: { address: "green" },
          },
        }}
        data={tableData}
        columnsToShow={[
          "country",
          "address",
          "phone",
          "currency",
          "name",
          "region",
        ]}
        paddingBetweenCells={10}
        paddingHeader={15}
        colConfig={{
          name: { label: "Name" },
          address: {
            label: "Adress",
            maxWidth: 100,
            shortOnlyifCut: true,
            maxCharToCut: 20,
            minColWidthToShort: 200,
          },
        }}
        selectedRowsTooltip={{
          mainFunc: {
            icon: <FaPlus />,
            onClick: (selectedData) => {
              //console.log("main function", selectedData);
              //remove the selected data from the tableData based on id
              const td = [...tableData];
              const newTd = td.filter((data) => {
                return !selectedData.some(
                  (selected) => selected.id === data.id
                );
              });
              //console.log(newTd);
              setTableData(newTd);
            },
          },
          othersFunc: [
            {
              label: "Enviar Email",
              onClick: (selectedData) => {
                console.log("others function", selectedData);
                const td = [...tableData];
                const newTd = td.filter((data) => {
                  return !selectedData.some(
                    (selected) => selected.id === data.id
                  );
                });
                //console.log(newTd);
                setTableData(newTd);
              },
            },
            {
              label: "Print",
              onClick: (selectedData) => {
                console.log("others function", selectedData);
                const td = [...tableData];
                const newTd = td.filter((data) => {
                  return !selectedData.some(
                    (selected) => selected.id === data.id
                  );
                });
                //console.log(newTd);
                setTableData(newTd);
              },
            },
          ],
        }}
      />
      {/*  <TestComponent /> */}
      {/* <div
        style={{
          display: "flex",
          gap: 100,
          flexDirection: "column",
        }}
      >
        <button
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          Click
        </button>
        <div style={{ display: "flex", flexDirection: "row", gap: 100 }}>
          <ATHOSTooltip position="top" content={"testststs"} forceOpen={open}>
            {(ref) => (
              <div
                ref={ref}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "blue",
                }}
              />
            )}
          </ATHOSTooltip>
          <ATHOSTooltip content={"testststs"} followCursor forceOpen={open}>
            {(ref) => (
              <div
                ref={ref}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "blue",
                }}
              />
            )}
          </ATHOSTooltip>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 100 }}>
          <ATHOSDropDown
            onClose={() => {}}
            isOpen
            labels={[
              {
                label: "Option 1",
                onClick: () => console.log("Option 1 clicked"),
              },
              {
                label: "Option 2",
                onClick: () => console.log("Option 2 clicked"),
              },
            ]}
          >
            {(ref) => (
              <div
                ref={ref}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "blue",
                }}
              />
            )}
          </ATHOSDropDown>
          <ATHOSDropDown
            onClose={() => {}}
            isOpen={open}
            labels={[
              {
                label: "Option 1",
                onClick: () => console.log("Option 1 clicked"),
              },
              {
                label: "Option 2",
                onClick: () => console.log("Option 2 clicked"),
              },
            ]}
          >
            {(ref) => (
              <div
                ref={ref}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "blue",
                }}
              />
            )}
          </ATHOSDropDown>
        </div>
      </div> */}

      {/* <ATHOSDropDown
        positionVert="bottom"
        positionHor="right"
        close={() => console.log("close")}
        open={true}
        id="reer"
        labels={[
          {
            label: "Option 1",
            onClick: () => console.log("Option 1 clicked"),
          },
          {
            label: "Option 1",
            onClick: () => console.log("Option 1 clicked"),
          },
        ]}
      >
        {(ref) => (
          <div
            ref={ref}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "red",
            }}
          />
        )}
      </ATHOSDropDown> */}
      {/* 
        <ATHOSDynamicTable
          tableID="Tabe2"
          highlightColor={ATHOSColors.aqua.default}
          data={tableData}
          columnsToHide={["assunto"]}
          paddingBetweenCells={15}
          paddingHeader={15}
          colConfig={{
            numero: {
              label: "Numero do Processo",
              cellComponent: (cell) => {
                return (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {cell}
                  </div>
                );
              },
            },
          }}
        />
        <ATHOSDynamicTable
          tableID="Table3"
          highlightColor={ATHOSColors.aqua.default}
          data={tableData}
          columnsToHide={["assunto"]}
          paddingBetweenCells={15}
          paddingHeader={15}
          colConfig={{
            numero: {
              label: "Numero do Processo",
              colComponent: (
                <div
                  style={{
                    color: "red",
                  }}
                >
                  Numero do Processo
                </div>
              ),
            },
          }}
        /> */}

      {/*   <Bwrapper>
          <ATHOSButton type="default">Default</ATHOSButton>
          <ATHOSButton
            onClick={() => {
              setError(undefined);
              setTimeout(() => {
                setError("teste");
              }, 250);
            }}
            type="alt"
          >
            Alt
          </ATHOSButton>
          <ATHOSButton type="action">Action </ATHOSButton>

          <ATHOSButton tooltip="Complete o formulario para salvar" disabled>
            Disabled
          </ATHOSButton>
        </Bwrapper>
        <ATHOSInput />
        <ATHOSInput error={error} type="user" />
        <ATHOSInput error={error} type="password" /> */}
      {/*  <Container>
        <ATHOSCards
          globalGroupStyle={
            {
              //gap: "2rem"
            }
          }
          globalCardWrapperStyle={{
            margin: "0.2rem",
            gap: "0.2rem",
          }}
          containerStyle={
            {
              //height: "600px",
            }
          }
          updateBoards={(boards) => setBoards(boards)}
          groups={boards}
        />
        <button
          style={{
            fontSize: "1rem",
          }}
          onClick={() =>
            setBoards((prev) => [
              ...prev,
              {
                id: v4().toString(),
                title: `Group ${prev.length + 1}`,
                items: Array.from({ length: 5 }, (_, i) => ({
                  id: v4().toString(),
                  title: `Card ${i + 1}`,
                  index: i,
                  component: (
                    <div
                      style={{
                        width: "100px",
                        height: "70px",
                      }}
                    >
                      Card {i + 1}
                    </div>
                  ),
                })),
              },
            ])
          }
        >
          Add Group
        </button>
      </Container> */}
    </ATHOSSideMenu>
  );
};

export default TestPage;
