import { ReactNode } from "react";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaCopy, FaReact } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { AppState } from "../..";
import PageText from "../../components/PageText";
import { AppText } from "../../langContext/lang";
import { ATHOSTabs, useATHOSToast } from "../../module-index";

const Code = ({ children }: { children: ReactNode }) => {
  const { toast } = useATHOSToast();
  const copy = () => {
    navigator.clipboard.writeText(children as string);
    toast("Copied to clipboard", { position: "top-right" });
  };

  return (
    <div className="flex gap-2 items-center justify-between">
      <code>{children}</code>
      <FaCopy onClick={copy} className="text-lg text-neutral-400 dark:text-neutral-500 cursor-pointer" />
    </div>
  );
};

const InstallPage = () => {
  const lang = useSelector((state: AppState) => state.LangReducer.lang);

  return (
    <>
      <ATHOSTabs
        className={{
          tab: {
            default: "text-zinc-400 dark:text-zinc-500 ",
            active: "bg-zinc-200 dark:bg-zinc-700 text-black dark:text-snow",
          },
          body: "text-black dark:text-snow bg-zinc-200 dark:bg-zinc-700",
        }}
        tabs={[
          {
            title: {
              value: "yarn",
            },
            content: {
              value: <Code>yarn add @athosws/react-components</Code>,
            },
          },

          {
            title: {
              value: "npm",
            },
            content: {
              value: <Code>npm install @athosws/react-components</Code>,
            },
          },
          {
            title: {
              value: "pnpm",
            },
            content: {
              value: <Code>pnpm install @athosws/react-components</Code>,
            },
          },
        ]}
      />

      <PageText>{AppText.pages.install.compatible[lang]}</PageText>
      <div className="flex gap-4 items-center">
        <div className="border border-sky-600 w-40 h-40 text-sky-600 rounded-2xl flex items-center justify-center flex-col gap-2">
          <FaReact className="text-7xl" />
          <p>React JS</p>
        </div>
        <div className="border border-blue-800 w-40 h-40 text-blue-800 rounded-2xl flex items-center justify-center flex-col gap-2">
          <BiLogoTailwindCss className="text-7xl text-blue-500" />
          <p>Tailwind CSS</p>
        </div>
      </div>
    </>
  );
};

export default InstallPage;
