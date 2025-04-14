import styled from "styled-components";

const DocumentationWrapper = styled.div.attrs({
  className: "p-4 flex flex-col gap-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-black dark:text-snow",
})``;
const DocumentationPropsWrapper = styled.div.attrs({
  className: "flex flex-col gap-3 text-black dark:text-snow",
})``;

const DocumentationPropsLi = styled.li.attrs({
  className: "p-1 border rounded-lg border-zinc-400 dark:border-zinc-600",
})``;
const DocumentationPropsCode = styled.code.attrs({
  className: "text-blue-600 dark:text-blue-300 font-semibold",
})``;

const DocumentationPropsUl = styled.ul.attrs({
  className: "p-2 border dark:border-zinc-500 border-zinc-400 rounded-lg flex flex-col gap-2",
})``;

const DocumentationText = styled.p.attrs({
  className: "text-lg",
})``;

export {
  DocumentationPropsCode,
  DocumentationPropsLi,
  DocumentationPropsUl,
  DocumentationPropsWrapper,
  DocumentationText,
  DocumentationWrapper,
};
