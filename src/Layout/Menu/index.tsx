import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { ATHOSMenu } from "../../module-index";
import { routes } from "../../Routes/routes";

const TranslateToOptions = () =>
  Object.values(routes).map((route) => ({
    label: route.label,
    path: route.path,
    icon: route.icon,
    onClick: route.onClick,
    specificColors: route.specificColors,
    subOpts:
      route.subOpts &&
      Object.values(route.subOpts).map((subOpt) => ({
        label: subOpt.label,
        path: subOpt.path,
        icon: subOpt.icon,
        onClick: route.onClick,
        specificColors: route.specificColors,
        subSubOpts:
          subOpt.subSubOpts &&
          Object.values(subOpt.subSubOpts).map((subSubOpt) => ({
            label: subSubOpt.label,
            path: subSubOpt.path,
            icon: subSubOpt.icon,
            onClick: route.onClick,
            specificColors: route.specificColors,
          })),
      })),
  }));

/* 
text-black dark:text-white 
          bg-neutral-300 dark:bg-neutral-700 bg-opacity-50
          border-neutral-400 dark:border-neutral-500 border 
*/

const Menu = () => {
  const opts = useMemo(() => TranslateToOptions(), []);
  return (
    <div className="w-60">
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
            dark:from-pink-800 dark:to-indigo-400 dark:border-neutral-400 dark:text-white
            from-pink-400 to-indigo-100 border-neutral-600
            `,
          },
          menu: {
            option: {
              defaults: {
                className: "text-black bg-transparent dark:text-white",
              },
              clicked: {
                className: "bg-neutral-300 border border-neutral-500 dark:bg-neutral-800 text-black dark:text-white",
              },
            },
            subOption: {
              clicked: {
                className: "text-purple-800 bg-purple-500 dark:bg-indigo-600 dark:text-white",
              },
            },
            className: `bg-neutral-200 dark:bg-neutral-700 border-neutral-400 
            bg-opacity-95 dark:bg-opacity-95 dark:border-neutral-500 border`,
          },
        }}
      />
    </div>
  );
};

export default Menu;
