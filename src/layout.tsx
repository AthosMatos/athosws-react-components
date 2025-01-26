import { MdDashboard } from "react-icons/md";
import { TbFolders } from "react-icons/tb";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ATHOSColors } from "./module-index";
import { ATHOSMenu } from "./Module/ATHOSMenu";
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
        <ATHOSMenu
          navigate={{
            useLocation: useLocation,
            useNavigate: useNavigate,
          }}
          options={[
            {
              label: "Option 0",
              path: "/test",
              icon: <MdDashboard />,
            },
            {
              label: "Option 1",
              subOpts: [
                {
                  label: "Sub Option 1",
                  subSubOpts: [
                    {
                      label: "Sub Sub Option 1",
                      path: "/test2",
                    },
                    {
                      label: "Sub Sub Option 2",
                    },
                  ],
                },
              ],
            },
            {
              label: "Option 2",
              subOpts: [
                {
                  label: "Sub Option 2",
                  subSubOpts: [
                    {
                      label: "Sub Sub Option 2",
                    },
                  ],
                },
              ],
            },
            {
              label: "Option 3",
              subOpts: [
                {
                  label: "Sub Option 3",
                },
              ],
            },
          ]}
          colors={{
            selected: {
              border: {
                color: "rgb(194, 194, 194)",
                width: "1px",
              },
              background: "rgba(0, 0, 0, 0.349)",
              text: "rgb(255, 255, 255)",
            },
            menu: {
              subSubOption: {
                clicked: {
                  background: "transparent",
                  text: "rgb(255, 255, 255)",
                  border: {
                    color: "rgba(255, 255, 255, 0.486)",
                    width: "1px",
                  },
                },
                normal: {
                  text: "rgb(255, 255, 255)",
                },
                hover: {
                  text: "rgb(255, 255, 255)",
                  //background: "rgba(255, 255, 255, 0.075)",
                },
              },
              option: {
                clicked: {
                  border: {
                    color: "rgb(158, 158, 158)",
                    width: "1px",
                  },
                  background: "rgb(58, 58, 58)",

                  text: "rgb(255, 255, 255)",
                },
                hover: {
                  border: {
                    color: "rgba(255, 255, 255, 0.192)",
                    width: "1px",
                  },
                  background: "rgba(255, 255, 255, 0.075)",
                  text: "rgb(255, 255, 255)",
                },
                normal: {
                  border: "none",
                  background: "transparent",
                  text: "rgb(255, 255, 255)",
                },
              },
            },
          }}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
