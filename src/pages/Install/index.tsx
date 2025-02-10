import { ReactNode } from "react";
import PageTitle from "../../components/PageTitle";
import { ATHOSTabs } from "../../module-index";

const Code = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <code>{children}</code>
    </div>
  );
};

const InstallPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageTitle title="Install" subtitle="How to install ATHOSComponents?" />

      <ATHOSTabs
        //gap={6}
        tabs={[
          {
            title: {
              value: "yarn",
              className: {
                default: "text-black dark:text-white",
              },
            },
            content: {
              value: <Code>yarn add @athosws/react-components</Code>,
              className: "text-white dark:text-black",
            },
          },

          {
            title: {
              value: "npm",
              className: {
                active: "text-black dark:text-white",
                default: "text-black dark:text-white",
              },
            },
            content: {
              value: <Code>npm install @athosws/react-components</Code>,
              className: "text-white dark:text-black",
            },
          },
          {
            title: {
              value: "pnpm",
              className: {
                active: "text-black dark:text-white",
                default: "text-black dark:text-white",
              },
            },
            content: {
              value: <Code>pnpm install @athosws/react-components</Code>,
              className: "text-white dark:text-black",
            },
          },
        ]}
      />
    </div>
  );
};

export default InstallPage;
