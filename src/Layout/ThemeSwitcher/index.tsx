import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../..";
import { tooogleTheme } from "../../themeContext/redux";

const ThemeSwitcher = () => {
  const theme = useSelector((state: AppState) => state.ThemeReducer.theme);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(tooogleTheme())}
      className={`w-16 h-10 flex rounded-full p-1 
cursor-pointer text-black dark:text-white 
bg-yellow-200 dark:bg-slate-800 transition-colors
bg-opacity-50 border-zinc-300 dark:border-zinc-600 border
${theme === "light" ? "justify-start" : "justify-end"}`}
    >
      <motion.div
        layout
        className="h-full flex items-center justify-center aspect-square rounded-full dark:border-slate-800
     border-yellow-500 bg-yellow-400 dark:bg-slate-700 
      bg-opacity-50 transition-colors border dark:text-slate-100 text-slate-700"
      >
        {theme === "light" ? <FaSun /> : <FaMoon />}
      </motion.div>
    </div>
  );
};

export default ThemeSwitcher;
