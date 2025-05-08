import { useState } from "react";
import {
  DocumentationPropsCode,
  DocumentationPropsLi,
  DocumentationPropsUl,
  DocumentationPropsWrapper,
  DocumentationText,
  DocumentationWrapper,
} from "../../../components/DocumentationStyled";
import { ATHOSCollapse } from "../../ATHOSCollapse/component";

const DocsProps = () => (
  <DocumentationPropsUl>
    <DocumentationPropsLi>
      <strong>children</strong>: <DocumentationPropsCode>React.ReactNode</DocumentationPropsCode>
      <p>The content that will be displayed as the main clickable area to toggle the dropdown.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>position</strong>:{" "}
      <DocumentationPropsCode>
        "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right" | "top" | "bottom"
      </DocumentationPropsCode>{" "}
      (optional, default: <DocumentationPropsCode>"top-left"</DocumentationPropsCode>)
      <p>Determines the position of the dropdown relative to the children.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>matchChildrenWidth</strong>: <DocumentationPropsCode>boolean</DocumentationPropsCode> (optional, default:{" "}
      <DocumentationPropsCode>false</DocumentationPropsCode>)<p>Specifies whether the dropdown should match the width of the children.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>onOpen</strong>: <DocumentationPropsCode>(isOpen: boolean) ={">"} void</DocumentationPropsCode> (optional)
      <p>A callback function that is triggered when the dropdown is opened or closed.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>labels</strong>: <DocumentationPropsCode>LabelI[]</DocumentationPropsCode>
      <p>An array of label objects that define the items in the dropdown menu.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>style</strong>: <DocumentationPropsCode>React.CSSProperties</DocumentationPropsCode> (optional)
      <p>Custom styles for the dropdown container.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>className</strong>: <DocumentationPropsCode>string</DocumentationPropsCode> (optional)
      <p>Custom class name for the dropdown container.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>labelsClassName</strong>: <DocumentationPropsCode>string</DocumentationPropsCode> (optional)
      <p>Custom class name for the dropdown labels.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>labelsStyle</strong>: <DocumentationPropsCode>React.CSSProperties</DocumentationPropsCode> (optional)
      <p>Custom styles for the dropdown labels.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>spacing</strong>: <DocumentationPropsCode>number</DocumentationPropsCode> (optional)
      <p>Specifies the gap between the children and the dropdown menu.</p>
    </DocumentationPropsLi>
  </DocumentationPropsUl>
);

const Docs = () => {
  const [isPropsShown, setIsPropsShown] = useState(false);

  return (
    <DocumentationWrapper>
      <DocumentationText>
        The <DocumentationPropsCode>ATHOSDropDown</DocumentationPropsCode> component is a customizable dropdown menu that can be positioned
        relative to its trigger element. It supports various positions and custom styles.
      </DocumentationText>
      <DocumentationPropsWrapper>
        <ATHOSCollapse
          onToggle={(isOpen) => setIsPropsShown(!!isOpen)}
          collapsedClassName="w-full"
          initialOpen
          spacing={10}
          collpasedComponent={<DocsProps />}
        >
          <div className="cursor-pointer flex items-end gap-2">
            <h3 className="text-2xl font-bold ">Props</h3>
            <p className="text-xs">{isPropsShown ? "Click to hide" : "Click to show"}</p>
          </div>
        </ATHOSCollapse>
      </DocumentationPropsWrapper>
    </DocumentationWrapper>
  );
};

export { Docs };
