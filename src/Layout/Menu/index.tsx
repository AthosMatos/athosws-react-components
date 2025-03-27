import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { ATHOSMenu } from "../../module-index";
import { OptKeyed } from "../../Module/ATHOSMenu/helpers";
import { useRoutes, WithComponent } from "../../Routes/routes";

const TranslateToOptions = (routes: WithComponent<OptKeyed>) =>
  Object.values(routes).map((route) => ({
    ...route,
    subOpts:
      route.subOpts &&
      Object.values(route.subOpts).map((subOpt) => {
        return {
          ...subOpt,
          subSubOpts: subOpt.subSubOpts && Object.values(subOpt.subSubOpts).map((subSubOpt) => subSubOpt),
        };
      }),
  }));

const Menu = () => {
  const routesObj = useRoutes();
  const opts = useRef(TranslateToOptions(routesObj)).current;
  return (
    <div className="md:w-60 w-44">
      <ATHOSMenu
        blur={{ menu: true }}
        navigate={{
          useLocation: useLocation,
          useNavigate: useNavigate,
        }}
        options={opts}
        generalColors={{
          selected: {
            className: `text-black bg-gradient-to-r border
            dark:from-pink-800 dark:to-indigo-400 dark:border-zinc-500 dark:text-white
            from-pink-400 to-indigo-100 border-zinc-600
            `,
          },
          menu: {
            option: {
              defaults: {
                className: "text-black bg-transparent dark:text-white",
              },
              clicked: {
                className: "bg-zinc-300 border border-zinc-500 dark:bg-zinc-800 text-black dark:text-white",
              },
            },

            className: `bg-zinc-200 dark:bg-zinc-700 border-zinc-400 
            bg-opacity-95 dark:bg-opacity-95 dark:border-zinc-500 border`,
          },
        }}
      />
    </div>
  );
};

export default Menu;
