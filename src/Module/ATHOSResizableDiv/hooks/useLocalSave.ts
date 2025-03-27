/* localStorage.setItem(wName, div.style.width);
localStorage.setItem(hName, div.style.height); */

interface Props {
  savename?: string;
}
type Group = {
  Width?: string | number;
  Height?: string | number;
};

const useLocalSave = ({ savename }: Props) => {
  if (!savename) return { sizes: { Width: "100%", Height: "100%" }, saveSizes: () => {} };
  const localStorage = window.localStorage;
  const item = localStorage.getItem(savename);
  const sizes: Group = (item && JSON.parse(item)) || {
    Width: "100%",
    Height: "100%",
  };
  const saveSizes = (Width: string, Height: string) => {
    localStorage.setItem(savename, JSON.stringify({ Width, Height }));
  };

  return { sizes, saveSizes };
};

export default useLocalSave;
