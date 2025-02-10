import { useEffect } from "react";
import { Outlet } from "react-router";
import { useTheme } from "../hooks/useTheme";
import Menu from "./Menu";
import ThemeSwitcher from "./ThemeSwitcher";

/* const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${ATHOSColors.white.eggshell};

  &:is(.dark *) {
    background-color: ${ATHOSColors.black.coal};
  }
`; */
const Layout = () => {
  const { setupTheme, toogleTheme, getTheme } = useTheme();
  useEffect(() => {
    setupTheme();
  }, []);

  return (
    <div className={`h-screen w-screen p-4 flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900`}>
      <div className="flex justify-between">
        <Menu />
        <ThemeSwitcher />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
