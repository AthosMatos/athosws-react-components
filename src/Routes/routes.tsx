import { createContext, useContext, useEffect, useState } from "react";
import { BiCollapseVertical } from "react-icons/bi";
import { BsFillMenuButtonWideFill, BsGrid3X2GapFill, BsInputCursorText } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
import { FaListCheck, FaTable } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrInstallOption } from "react-icons/gr";
import { RxButton, RxComponent1 } from "react-icons/rx";
import { SlSizeFullscreen } from "react-icons/sl";
import { TfiViewList } from "react-icons/tfi";
import { VscScreenFull } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { AppState } from "..";
import { PopUpIcon } from "../assets/icons/popUp";
import { AppText } from "../langContext/lang";
import ATHOSButtonPage from "../Module/ATHOSButton/page";
import ATHOSCardPage from "../Module/ATHOSCard/page";
import ATHOSCollapsePage from "../Module/ATHOSCollapse/page";
import ATHOSDropDownPage from "../Module/ATHOSDropDown/page";
import ATHOSDynamicTablePage from "../Module/ATHOSDynamicTable/page";
import ATHOSFormPage from "../Module/ATHOSForm/page";
import ATHOSInputPage from "../Module/ATHOSInput/page";
import { OptKeyed } from "../Module/ATHOSMenu/helpers";
import ATHOSPopUpPage from "../Module/ATHOSPopUp/page";
import ATHOSSelectPage from "../Module/ATHOSSelect/page";
import AthosVirtualDivPage from "../Module/ATHOSVirtualDiv/page";
import { usePage } from "../pageContext/redux";
import InstallPage from "../pages/Install";
import ATHOSBreadcrumbs from "../Module/ATHOSBreadcrumbs/component";
import ATHOSBreadcrumbsPage from "../Module/ATHOSBreadcrumbs/page";

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

  const [pageLang, setPageLang] = useState<any>();
  const { setTitle } = usePage();

  const setPageTitle = (pageLang: any) => {
    setPageLang(pageLang);
    setTitle(pageLang.title[lang], pageLang.subtitle[lang]);
  };

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
        breadcrumbs: {
          path: "components/breadcrumbs",
          component: ATHOSBreadcrumbsPage,
          label: "Breadcrumbs",
          icon: <FaWpforms />,
          onClick: () => setPageTitle(AppText.pages.components.breadcrumbs),
          onInit: () => setPageTitle(AppText.pages.components.breadcrumbs),
        },
        form: {
          path: "components/form",
          component: ATHOSFormPage,
          label: "Form",
          icon: <FaWpforms />,
          onClick: () => setPageTitle(AppText.pages.components.form),
          onInit: () => setPageTitle(AppText.pages.components.form),
        },
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
          icon: <BsGrid3X2GapFill />,
          onClick: () => setPageTitle(AppText.pages.components.cards),
          onInit: () => setPageTitle(AppText.pages.components.cards),
        },
        collapse: {
          path: "components/collapse",
          component: ATHOSCollapsePage,
          label: "Collapse",
          icon: <BiCollapseVertical />,
          onClick: () => setPageTitle(AppText.pages.components.collapse),
          onInit: () => setPageTitle(AppText.pages.components.collapse),
        },
        dropDown: {
          path: "components/dropdown",
          component: ATHOSDropDownPage,
          label: "Drop Down",
          icon: <BsFillMenuButtonWideFill />,
          onClick: () => setPageTitle(AppText.pages.components.dropdown),
          onInit: () => setPageTitle(AppText.pages.components.dropdown),
        },
        dynamicTable: {
          path: "components/dynamictable",
          component: ATHOSDynamicTablePage,
          label: AppText.pages.components.dynamicTable.title[lang],
          icon: <FaTable />,
          onClick: () => setPageTitle(AppText.pages.components.dynamicTable),
          onInit: () => setPageTitle(AppText.pages.components.dynamicTable),
        },
        input: {
          path: "components/input",
          component: ATHOSInputPage,
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
        popup: {
          path: "components/popup",
          component: ATHOSPopUpPage,
          label: "PopUp",
          icon: <PopUpIcon className="w-4 h-4 dark:fill-white" />,
          onClick: () => setPageTitle(AppText.pages.components.popUp),
          onInit: () => setPageTitle(AppText.pages.components.popUp),
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
        tabs: {
          path: "components/tabs",
          component: ATHOSCardPage,
          label: "Switcher",
          icon: <VscScreenFull />,
          onClick: () => setPageTitle(AppText.pages.components.switcher),
          onInit: () => setPageTitle(AppText.pages.components.switcher),
        },
        toast: {
          path: "components/toast",
          component: ATHOSCardPage,
          label: "Switcher",
          icon: <VscScreenFull />,
          onClick: () => setPageTitle(AppText.pages.components.switcher),
          onInit: () => setPageTitle(AppText.pages.components.switcher),
        },
        tooltip: {
          path: "components/tooltip",
          component: ATHOSCardPage,
          label: "Switcher",
          icon: <VscScreenFull />,
          onClick: () => setPageTitle(AppText.pages.components.switcher),
          onInit: () => setPageTitle(AppText.pages.components.switcher),
        },
        virtualDiv: {
          path: "components/virtualDiv",
          component: AthosVirtualDivPage,
          label: "Virtual Div",
          icon: <TfiViewList />,
          onClick: () => setPageTitle(AppText.pages.components.virtualDIV),
          onInit: () => setPageTitle(AppText.pages.components.virtualDIV),
        },
        select: {
          path: "components/select",
          component: ATHOSSelectPage,
          label: "Select",
          icon: <FaListCheck />,
          onClick: () => setPageTitle(AppText.pages.components.select),
          onInit: () => setPageTitle(AppText.pages.components.select),
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
