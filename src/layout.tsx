import { MdDashboard } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ATHOSColors } from "./module-index";
import { ATHOSMenu } from "./Module/ATHOSMenu";

const Layout = () => {
  return (
    <div
      style={{
        backgroundColor: ATHOSColors.white.eggshell,
      }}
      className="h-screen w-screen p-4"
    >
      <div className="w-60">
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
              path: "/test2",
              subOpts: [
                {
                  label: "Sub Option 1",
                  subSubOpts: [
                    {
                      label: "Sub Sub Option 1",
                      // path: "/test2",
                      onClick: () => {
                        console.log("Sub Sub Option 1 clicked");
                      },
                    },
                    {
                      label: "Sub Sub Option 2",
                    },
                    {
                      label: "Sub Sub Option 2",
                    },
                  ],
                },
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
                color: "rgba(0, 0, 0, 0.295)",
                width: "1px",
              },
              background: "rgba(0, 0, 0, 0.158)",
              text: "rgb(0, 0, 0)",
            },
            menu: {
              subSubOption: {
                clicked: {
                  background: "transparent",
                  text: "rgb(0, 0, 0)",
                  border: {
                    color: "rgba(0, 0, 0, 0.486)",
                    width: "1px",
                  },
                },
                normal: {
                  text: "rgb(0, 0, 0)",
                  background: "transparent",
                },
                hover: {
                  text: "rgb(0, 0, 0)",
                  background: "rgba(255, 255, 255, 0.075)",
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
                    color: "rgba(0, 0, 0, 0.507)",
                    width: "1px",
                  },
                  background: "rgba(255, 255, 255, 0.075)",
                },
                normal: {
                  border: "none",
                  background: "transparent",
                  text: "rgb(0, 0, 0)",
                },
              },
              subOption: {
                clicked: {
                  background: "rgb(255, 255, 255)",
                },
              },
              background: "rgba(202, 202, 202, 0.89)",
            },
          }}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
