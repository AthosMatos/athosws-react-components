import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { AppState } from "..";
import PageTitle from "../components/PageTitle";
import { PageWrapper } from "../components/styled";
import { setupTheme } from "../themeContext/redux";
import LangSwitcher from "./LanguageSwitcher";
import Menu from "./Menu";
import ThemeSwitcher from "./ThemeSwitcher";

const Layout = () => {
  useEffect(() => {
    setupTheme();
  }, []);
  const { subtitle, title } = useSelector((state: AppState) => state.PageReducer);

  return (
    <div className={`h-full min-h-screen flex-1 p-4 flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900`}>
      <div className="flex justify-between">
        <Menu />
        <div className="flex gap-2">
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      </div>
      <div className="h-full w-full">
        <PageWrapper>
          <PageTitle title={title} subtitle={subtitle} />
          <Outlet />
        </PageWrapper>
      </div>
    </div>
  );
};

export default Layout;
