import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdDashboard, MdOutlineAttachMoney } from "react-icons/md";
import { PiGavelFill } from "react-icons/pi";
import styled from "styled-components";
import { v4 } from "uuid";
import { ATHOSButton } from "./DefaultComponents/ATHOSButton";
import { GroupI } from "./DefaultComponents/ATHOSCard";
import ATHOSDynamicTable from "./DefaultComponents/ATHOSDynamicTable";
import { ATHOSInput } from "./DefaultComponents/ATHOSInput";
import { ATHOSResizableDiv } from "./DefaultComponents/ATHOSResizableDiv";
import { ATHOSSideMenu } from "./DefaultComponents/ATHOSSideMenu";
import { ATHOSSideMenuDataI } from "./DefaultComponents/ATHOSSideMenu/interfaces";
import { ATHOSColors } from "./DefaultComponents/colors/colors";

const Container = styled.div`
  display: flex;
  /* align-items: center;
    height: 100%; */
  gap: 2rem;
  padding: 2rem;
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
  gap: 2rem;
`;

const mockData: ATHOSSideMenuDataI[] = [
  {
    label: "Dashboard",
    Icon: MdDashboard,
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
  const [boards, setBoards] = useState<GroupI[]>([
    {
      id: v4(),
      title: "group 1",
      /* style: {
                width: "350px"
            }, */
      items: Array.from({ length: 3 }, (_, i) => ({
        id: v4(),

        index: i,
        component: (
          <ATHOSResizableDiv
            style={
              {
                //flexWrap: "wrap",
                //gap: "2rem"
              }
            }
          >
            <label
              style={{
                fontSize: "2.5rem",
              }}
            >
              teste
            </label>
          </ATHOSResizableDiv>
        ),
        /* wrapperStyle: {} */
      })),
    },
  ]);
  type TableData = {
    id: string;
    numero: string;
    assunto: string;
    status: string;
  };

  const [tableData, setTableData] = useState<TableData[]>([
    {
      id: "1",
      numero: "0803174-22.2023.4.05.8400",
      assunto: "Contract Dispute",
      status: "Open",
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
      <ATHOSSideMenu
        colors={{
          accent: ATHOSColors.grey.default,
          active: ATHOSColors.aqua.default,
        }}
        options={mockData}
        onExit={() => {
          console.log("exit");
        }}
      />

      <Container>
        <ATHOSDynamicTable data={tableData} columns={["numero", "assunto"]} />
        {/* <ResizableDiv
                    style={
                        {
                            //flexWrap: "wrap",
                            //gap: "2rem"
                        }
                    }
                    name={v4()}
                >
                    <label
                        style={{
                            fontSize: "2.5rem"
                        }}
                    >
                        teste
                    </label>
                </ResizableDiv>
                <ATHOSLogo
                    style={{
                        width: "100px",
                        height: "100px"
                    }}
                /> */}
        <Bwrapper>
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
        <ATHOSInput error={error} type="password" />

        {/*   <ATHOSCards
                    globalGroupStyle={
                        {
                            //gap: "2rem"
                        } 
                    }
                    globalCardWrapperStyle={{
                        margin: "1rem",
                        gap: "1rem"
                    }}
                    containerStyle={{
                        height: "600px"
                    }}
                    updateBoards={(boards) => setBoards(boards)}
                    groups={boards}
                /> */}
        {/*  <button
                    style={{
                        fontSize: "2rem"
                    }}
                    onClick={() =>
                        setBoards((prev) => [
                            ...prev,
                            {
                                id: v4(),
                                title: "group 1",
                                items: Array.from({ length: 3 }, (_, i) => ({
                                    id: v4(),
                                    title: `Card ${i + 1}`,
                                    index: i
                                }))
                            }
                        ])
                    }
                >
                    Add Group
                </button> */}
      </Container>
    </Wrapper>
  );
};

export default TestPage;
