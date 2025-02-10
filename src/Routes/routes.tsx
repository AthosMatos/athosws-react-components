import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FaTable } from "react-icons/fa6";
import { GrInstallOption } from "react-icons/gr";
import { RxButton, RxComponent1 } from "react-icons/rx";
import ATHOSButtonPage from "../Module/ATHOSButton/page";
import ATHOSDropDownPage from "../Module/ATHOSDropDown/page";
import ATHOSDynamicTablePage from "../Module/ATHOSDynamicTable/page";
import { OptKeyed } from "../Module/ATHOSMenu/helpers";
import InstallPage from "../pages/Install";

type WithComponent<T> = {
  [key in keyof T]: T[key] & {
    component?: React.FC;
    subOpts?: {
      [key in keyof T]: T[key] & {
        component?: React.FC;
        subSubOpts?: {
          [key in keyof T]: T[key] & {
            component?: React.FC;
          };
        };
      };
    };
  };
};

export const routes: WithComponent<OptKeyed> = {
  install: {
    path: "/install",
    component: InstallPage,
    label: "Install",
    icon: <GrInstallOption />,
  },
  components: {
    /* path: "/components",
    component: InstallPage, */
    label: "Components",
    icon: <RxComponent1 />,
    subOpts: {
      dynamicTable: {
        path: "/components/adt",
        component: ATHOSDynamicTablePage,
        label: "Dynamic Table",
        icon: <FaTable />,
      },
      dropDown: {
        path: "/components/add",
        component: ATHOSDropDownPage,
        label: "Drop Down",
        icon: <BsFillMenuButtonWideFill />,
      },
      button: {
        path: "/components/button",
        component: ATHOSButtonPage,
        label: "Button",
        icon: <RxButton />,
      },
    },
  },
};
