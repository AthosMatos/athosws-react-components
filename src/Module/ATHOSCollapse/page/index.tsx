import CodeWrapper from "../../../components/CodeWrapper";

import { ATHOSTabs } from "../../ATHOSTabs";
import { ATHOSCollapse } from "../component";
import { collapsecodestrings } from "./codeStrings";
import { Docs } from "./docs";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae aliquet ligula, eu accumsan lacus. Vivamus eget
                      faucibus urna, ut feugiat magna. Ut eget nisi justo. Vivamus quis magna ante. Fusce molestie, mauris eget cursus
                      egestas, diam ex scelerisque ante, vitae efficitur dolor odio eget quam. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Aliquam tincidunt urna nunc, vitae euismod ligula eleifend eget. Sed sed tincidunt urna, a mattis
                      augue. Etiam justo nisi, molestie sed hendrerit eget, lobortis in erat. Nullam pellentesque finibus lectus, sed
                      dignissim ante feugiat a. Sed vel magna eu libero gravida ultricies. Pellentesque ac justo eget massa porttitor
                      egestas sed eget magna. Mauris commodo varius risus vel sollicitudin. Praesent mattis velit vitae pretium eleifend.
                      Morbi eu mi`;

const ATHOSCollapsePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Docs />
      <ATHOSTabs
        className={{
          tab: {
            default: "text-neutral-400 dark:text-neutral-500 ",
            active: "bg-zinc-200 dark:bg-zinc-800 text-black dark:text-snow",
          },
          body: "text-black dark:text-snow bg-zinc-200 dark:bg-zinc-800",
        }}
        tabs={[
          {
            title: {
              value: "Bottom",
            },
            content: {
              value: (
                <div>
                  <div>
                    <ATHOSCollapse position="bottom" collpasedComponent={<div className="p-2 bg-blue-900 ">Collapsed component</div>}>
                      <div className="p-2 bg-red-900 w-fit cursor-pointer select-none">Click to open</div>
                    </ATHOSCollapse>
                    {lorem}
                  </div>
                  <CodeWrapper>{collapsecodestrings.codeStringBottom}</CodeWrapper>
                </div>
              ),
            },
          },
          {
            title: {
              value: "Left",
            },
            content: {
              value: (
                <div>
                  <div className="flex gap-3">
                    <ATHOSCollapse position="left" collpasedComponent={<div className="p-2 bg-blue-900 ">Collapsed component</div>}>
                      <div className="p-2 bg-red-900 w-max cursor-pointer select-none">Click to open</div>
                    </ATHOSCollapse>
                    {lorem}
                  </div>
                  <CodeWrapper>{collapsecodestrings.codeStringLeft}</CodeWrapper>
                </div>
              ),
            },
          },
          {
            title: {
              value: "Right",
            },
            content: {
              value: (
                <div>
                  <div className="flex gap-3">
                    <ATHOSCollapse position="right" collpasedComponent={<div className="p-2 bg-blue-900 ">Collapsed component</div>}>
                      <div className="p-2 bg-red-900 w-max cursor-pointer select-none">Click to open</div>
                    </ATHOSCollapse>
                    {lorem}
                  </div>
                  <CodeWrapper>{collapsecodestrings.codeStringRight}</CodeWrapper>
                </div>
              ),
            },
          },
          {
            title: {
              value: "Top",
            },
            content: {
              value: (
                <div>
                  <div>
                    <ATHOSCollapse position="top" collpasedComponent={<div className="p-2 bg-blue-900 ">Collapsed component</div>}>
                      <div className="p-2 bg-red-900 w-fit cursor-pointer select-none">Click to open</div>
                    </ATHOSCollapse>
                    {lorem}
                  </div>
                  <CodeWrapper>{collapsecodestrings.codeStringTop}</CodeWrapper>
                </div>
              ),
            },
          },
        ]}
      />
    </div>
  );
};

export default ATHOSCollapsePage;
