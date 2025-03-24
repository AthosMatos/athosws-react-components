import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeWrapper = ({ children }) => {
  return (
    <SyntaxHighlighter language="tsx" style={vscDarkPlus} wrapLines wrapLongLines customStyle={{ borderRadius: "8px", fontSize: "14px" }}>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeWrapper;
