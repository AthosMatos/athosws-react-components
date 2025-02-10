import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../Layout";
import { routes } from "./routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={routes.install.path || ""} replace={true} />} />
          {Object.values(routes).map((route) => (
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
