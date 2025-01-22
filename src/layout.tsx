import { TbFolders } from "react-icons/tb";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ATHOSColors, ATHOSSideMenu } from "./module-index";
import { ASMOptionI } from "./Module/ATHOSSideMenu/interfaces";
const opts: ASMOptionI[] = [
  {
    label: "Inicio",
    path: "/test",
    onClick: () => console.log("Dashboard"),
  },
  {
    label: "Projetos",
    Icon: TbFolders,
    iconSize: "1.2rem",
    subOptions: [
      {
        label: "Web",
        onClick: () => console.log("Acessores teste1"),
        subsubOptions: [
          {
            label: "Subsub1",
            path: "/test2",
            onClick: () => console.log("Subsub1"),
            pageText: {
              backColor: ATHOSColors.black.coal,
              title: {
                value: "Subsub1",
                color: ATHOSColors.red.default,
              },
              subTitle: {
                value: "Subsub1",
                color: ATHOSColors.grey.default,
              },
            },
          },
          {
            label: "Subsub2",
            path: "/subsub2",
            onClick: () => console.log("Subsub2"),
          },
          {
            label: "Subsub2",
            path: "/subsub2",
            onClick: () => console.log("Subsub2"),
          },
          {
            label: "Subsub2",
            path: "/subsub2",
            onClick: () => console.log("Subsub2"),
          },
        ],
      },
      {
        label: "Web",
        onClick: () => console.log("Acessores teste1"),
        subsubOptions: [
          {
            label: "Subsub1",
            path: "/test2",
            onClick: () => console.log("Subsub1"),
            pageText: {
              backColor: ATHOSColors.black.coal,
              title: {
                value: "Subsub1",
                color: ATHOSColors.red.default,
              },
              subTitle: {
                value: "Subsub1",
                color: ATHOSColors.grey.default,
              },
            },
          },
          {
            label: "Subsub2",
            path: "/subsub2",
            onClick: () => console.log("Subsub2"),
          },
          {
            label: "Subsub2",
            path: "/subsub2",
            onClick: () => console.log("Subsub2"),
          },
          {
            label: "Subsub2",
            path: "/subsub2",
            onClick: () => console.log("Subsub2"),
          },
        ],
      },
    ],
  },
];
const Layout = () => {
  return (
    <div
      style={{
        backgroundColor: ATHOSColors.black.coal,
      }}
      className="flex items-center justify-center h-screen w-screen"
    >
      <div className={`w-[98vw] h-[98vh] border border-gray-100 rounded-xl overflow-auto`}>
        <ATHOSSideMenu
          usesRouter={{
            location: useLocation(),
            navigate: useNavigate(),
          }}
          collapsableIcon={{
            label: "Hide",
          }}
          editableIcon={{
            label: "Edit",
          }}
          colors={{
            background: ATHOSColors.black.coal,
            sideBorder: ATHOSColors.white.eggshell,
            accent: ATHOSColors.grey.darker,
            primary: ATHOSColors.aqua.default,
            /*  options: {
  active: "purple",
  accent: ATHOSColors.grey.default,
  specific: { ["Dashboard"]: { default: "red", text: "blue" } },
}, */
          }}
          options={opts}
          onExitIcon={{
            label: "Sair",
            onClick: () => console.log("Sair"),
          }}
          asOverlay
          overlayStyle={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: ATHOSColors.black.coal,
          }}
        >
          <Outlet />
        </ATHOSSideMenu>
      </div>
    </div>
  );
};

export default Layout;
