import { LangsI, useLang } from "../../langContext/redux";
import { ATHOSSwitcher } from "../../Module/ATHOSSwitcher";
import { isBiggerThan } from "../../Module/hooks/useWindowSize";

const BrasilFlag = require("./assets/Flag_of_Brazil.svg.png");
const USUKFlag = require("./assets/US-UK-blend.png");

const Flag = ({ src }: { src: string }) => <img className="h-6 w-6 object-cover rounded-full" src={src} />;

const LangSwitcher = () => {
  const { setLang, lang } = useLang();

  return (
    <ATHOSSwitcher
      selectedId={lang}
      className={{
        container: "dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 border",
        switches: {
          default: "text-black dark:text-white",
          active: "bg-zinc-100 dark:bg-zinc-600 dark:text-white rounded-lg border dark:border-zinc-500 border-zinc-300",
        },
      }}
      onChange={(id: any) => setLang(id)}
      switchs={[
        {
          icon: <Flag src={BrasilFlag} />,
          label: isBiggerThan("md") && "Português",
          id: "pt-BR" as LangsI,
        },
        {
          icon: <Flag src={USUKFlag} />,
          label: isBiggerThan("md") && "English",
          id: "en-US" as LangsI,
        },
      ]}
    />
  );
};

export default LangSwitcher;
