import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../Layout";
import { useRoutes } from "./routes";
const defaultPath = "athosws-react-components";
const AppRoutes = () => {
  const routesObj = useRoutes();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={defaultPath} element={<Layout />}>
          <Route index element={<Navigate to={routesObj.install.path || ""} replace={true} />} />
          {Object.values(routesObj).map((route) => (
            <>
              <Route key={route.path} path={route.path} element={route.component && <route.component />} />
              {route.subOpts &&
                Object.values(route.subOpts).map((subOpt) => (
                  <>
                    <Route key={subOpt.path} path={subOpt.path} element={subOpt.component && <subOpt.component />} />
                    {subOpt.subSubOpts &&
                      Object.values(subOpt.subSubOpts).map((subSubOpt) => (
                        <Route key={subSubOpt.path} path={subSubOpt.path} element={subSubOpt.component && <subSubOpt.component />} />
                      ))}
                  </>
                ))}
            </>
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
