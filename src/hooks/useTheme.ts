export const useTheme = () => {
  const setupTheme = () => {
    //if there's no theme set, use system preference
    //this only specifies if is dark or not (wich means light)
    document.documentElement.classList.toggle(
      "dark",
      localStorage.currentTheme === "dark" ||
        (!("currentTheme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };

  const getTheme = (): "dark" | "light" => {
    const currentTheme = localStorage.currentTheme;
    if (!currentTheme) {
      //get system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return currentTheme;
  };

  const toogleTheme = () => {
    const currentTheme = getTheme();
    localStorage.currentTheme = currentTheme === "dark" ? "light" : "dark";
    setupTheme();
  };

  return { setupTheme, getTheme, toogleTheme };
};
