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
  const localStorage = window.localStorage;
  const sizes: Group = (savename && JSON.parse(localStorage.getItem(savename))) || {
    Width: "100%",
    Height: "100%",
  };
  const saveSizes = (Width: string, Height: string) => {
    localStorage.setItem(savename, JSON.stringify({ Width, Height }));
  };

  return { sizes, saveSizes };
};

export default useLocalSave;
