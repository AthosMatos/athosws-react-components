import { createContext, useContext, useEffect, useState } from "react";
import { BiCard, BiCollapseVertical } from "react-icons/bi";
import { BsFillMenuButtonWideFill, BsInputCursorText } from "react-icons/bs";
import { FaTable } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrInstallOption } from "react-icons/gr";
import { RxButton, RxComponent1 } from "react-icons/rx";
import { SlSizeFullscreen } from "react-icons/sl";
import { TfiViewList } from "react-icons/tfi";
import { VscScreenFull } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { AppState } from "..";
import { AppText } from "../langContext/lang";
import ATHOSButtonPage from "../Module/ATHOSButton/page";
import ATHOSCardPage from "../Module/ATHOSCard/page";
import ATHOSDropDownPage from "../Module/ATHOSDropDown/page";
import ATHOSDynamicTablePage from "../Module/ATHOSDynamicTable/page";
import { OptKeyed } from "../Module/ATHOSMenu/helpers";
import AthosVirtualDivPage from "../Module/ATHOSVirtualDiv/page";
import { usePage } from "../pageContext/redux";
import InstallPage from "../pages/Install";

export type WithComponent<T> = {
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
const RoutesContext = createContext<WithComponent<OptKeyed>>({} as WithComponent<OptKeyed>);
export const RoutesProvider = ({ children }: { children: React.ReactNode }) => {
  const lang = useSelector((state: AppState) => state.LangReducer.lang);
  const pageTitle = useSelector((state: AppState) => state.PageReducer);
  const [pageLang, setPageLang] = useState<any>();
  const { setTitle } = usePage();

  const setPageTitle = (pageLang: any) => {
    setPageLang(pageLang);
    setTitle(pageLang.title[lang], pageLang.subtitle[lang]);
  };

  /* useEffect(() => {
    if (!pageTitle.title && !pageTitle.subtitle) {
      setPageTitle(AppText.pages.install);
    }
  }, [pageTitle]); */

  useEffect(() => {
    if (pageLang) {
      setTitle(pageLang.title[lang], pageLang.subtitle[lang]);
    }
  }, [lang]);

  const routes: WithComponent<OptKeyed> = {
    install: {
      path: "install",
      component: InstallPage,
      label: AppText.pages.install.title[lang],
      icon: <GrInstallOption />,
      onClick: () => setPageTitle(AppText.pages.install),
      onInit: () => setPageTitle(AppText.pages.install),
    },
    components: {
      /* path: "/components",
      component: InstallPage, */
      label: AppText.pages.components.title[lang],
      icon: <RxComponent1 />,
      subOpts: {
        button: {
          path: "components/button",
          component: ATHOSButtonPage,
          label: "Button",
          icon: <RxButton />,
          onClick: () => setPageTitle(AppText.pages.components.button),
          onInit: () => setPageTitle(AppText.pages.components.button),
        },
        cards: {
          path: "components/cards",
          component: ATHOSCardPage,
          label: "Cards",
          icon: <BiCard />,
          onClick: () => setPageTitle(AppText.pages.components.cards),
          onInit: () => setPageTitle(AppText.pages.components.cards),
        },
        collapse: {
          path: "components/collapse",
          component: ATHOSCardPage,
          label: "Collapse",
          icon: <BiCollapseVertical />,
          onClick: () => setPageTitle(AppText.pages.components.collapse),
          onInit: () => setPageTitle(AppText.pages.components.collapse),
        },
        dropDown: {
          path: "components/add",
          component: ATHOSDropDownPage,
          label: "Drop Down",
          icon: <BsFillMenuButtonWideFill />,
          onClick: () => setPageTitle(AppText.pages.components.dropdown),
          onInit: () => setPageTitle(AppText.pages.components.dropdown),
        },
        dynamicTable: {
          path: "components/adt",
          component: ATHOSDynamicTablePage,
          label: AppText.pages.components.dynamicTable.title[lang],
          icon: <FaTable />,
          onClick: () => setPageTitle(AppText.pages.components.dynamicTable),
          onInit: () => setPageTitle(AppText.pages.components.dynamicTable),
        },
        input: {
          path: "components/input",
          component: ATHOSCardPage,
          label: "Input",
          icon: <BsInputCursorText />,
          onClick: () => setPageTitle(AppText.pages.components.input),
          onInit: () => setPageTitle(AppText.pages.components.input),
        },
        menu: {
          path: "components/menu",
          component: ATHOSCardPage,
          label: "Menu",
          icon: <GiHamburgerMenu />,
          onClick: () => setPageTitle(AppText.pages.components.menu),
          onInit: () => setPageTitle(AppText.pages.components.menu),
        },
        modal: {
          path: "components/modal",
          component: ATHOSCardPage,
          label: "Modal",
          icon: <VscScreenFull />,
          onClick: () => setPageTitle(AppText.pages.components.modal),
          onInit: () => setPageTitle(AppText.pages.components.modal),
        },
        resizableDiv: {
          path: "components/resizableDiv",
          component: ATHOSCardPage,
          label: "Resizable Div",
          icon: <SlSizeFullscreen />,
          onClick: () => setPageTitle(AppText.pages.components.resizableDiv),
          onInit: () => setPageTitle(AppText.pages.components.resizableDiv),
        },
        switcher: {
          path: "components/switcher",
          component: ATHOSCardPage,
          label: "Switcher",
          icon: <VscScreenFull />,
          onClick: () => setPageTitle(AppText.pages.components.switcher),
          onInit: () => setPageTitle(AppText.pages.components.switcher),
        },
        virtualList: {
          path: "components/virtualDiv",
          component: AthosVirtualDivPage,
          label: "Virtual Div",
          icon: <TfiViewList />,
          onClick: () => setPageTitle(AppText.pages.components.virtualDIV),
          onInit: () => setPageTitle(AppText.pages.components.virtualDIV),
        },
      },
    },
  };

  return <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>;
};
export const useRoutes = () => {
  const context = useContext(RoutesContext);
  if (!context) {
    throw new Error("useRoutes must be used within a RoutesProvider");
  }
  return context;
};
