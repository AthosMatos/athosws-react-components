import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { PiGavelFill } from "react-icons/pi";
import styled from "styled-components";
import { GroupI } from "./DefaultComponents/ATHOSCard";
import ATHOSDynamicTable from "./DefaultComponents/ATHOSDynamicTable";
import { ATHOSSideMenuDataI } from "./DefaultComponents/ATHOSSideMenu/interfaces";
import { ATHOSColors } from "./DefaultComponents/colors/colors";

const Container = styled.div`
  display: flex;
  /* align-items: center;
    height: 100%; */
  gap: 2rem;
  /*  padding: 2rem; */
  flex-direction: column;
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

const mockData: ATHOSSideMenuDataI[] = [
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
  type TableData = {
    id: string;
    numero: string;
    assunto: string;
    status: React.ReactNode;
  };

  const [tableData, setTableData] = useState<TableData[]>([
    {
      id: "1",
      numero: "0803174-22.2023.4.05.8400",
      assunto:
        "Contract Dispute Contract Dispute Contract Dispute Contract Dispute Contract Dispute",
      status: <div style={{ color: "red" }}>Open</div>,
    },
    {
      id: "2",
      numero: "0805123-33.2023.4.05.8400",
      assunto: "Property Rights",
      status: "Closed",
    },
    {
      id: "3",
      numero: "0807894-44.2023.4.05.8400",
      assunto: "Fraud Investigation",
      status: "Pending",
    },
    {
      id: "4",
      numero: "0809876-55.2023.4.05.8400",
      assunto: "Employment Dispute",
      status: "Open",
    },
    {
      id: "5",
      numero: "0801234-66.2023.4.05.8400",
      assunto: "Patent Infringement",
      status: "Closed",
    },
    {
      id: "6",
      numero: "0806543-77.2023.4.05.8400",
      assunto: "Trademark Violation",
      status: "Open",
    },
    {
      id: "7",
      numero: "0803456-88.2023.4.05.8400",
      assunto: "Tax Evasion",
      status: "Pending",
    },
    {
      id: "8",
      numero: "0801122-99.2023.4.05.8400",
      assunto: "Breach of Contract",
      status: "Closed",
    },
    {
      id: "9",
      numero: "0809987-00.2023.4.05.8400",
      assunto: "Defamation Case",
      status: "Open",
    },
    {
      id: "10",
      numero: "0808765-11.2023.4.05.8400",
      assunto: "Insurance Claim",
      status: "Pending",
    },
  ]);

  return (
    <Wrapper>
      {/*  <div
        style={{
          height: "50%",
        }}
      >
        <ATHOSSideMenu
          colors={{
            accent: "#aaaaaa",
            active: "#cf1e94",
          }}
          options={mockData}
          onExit={() => {
            console.log("exit");
          }}
        />
      </div> */}

      <Container>
        <ATHOSDynamicTable
          tableID="Tabe1"
          highlightColor={ATHOSColors.aqua.default}
          data={tableData}
          columnsToShow={["numero", "assunto", "status"]}
          paddingBetweenCells={15}
          paddingHeader={15}
          colConfig={{
            numero: { label: "Numero do Processo" },
            assunto: {
              label: "Assunto",
              maxWidth: 100,
              minColWidthToShort: 200,
              maxCharToCut: 20,
              shortOnlyifCut: true,
            },
          }}
        />
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
              component: (
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
              component: (
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
        />

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
      </Container>
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
    </Wrapper>
  );
};

export default TestPage;
