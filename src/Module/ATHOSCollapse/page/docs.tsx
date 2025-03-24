import { useState } from "react";
import {
  DocumentationPropsCode,
  DocumentationPropsLi,
  DocumentationPropsUl,
  DocumentationPropsWrapper,
  DocumentationText,
  DocumentationWrapper,
} from "../../../components/DocumentationStyled";
import { ATHOSCollapse } from "../component";

const DocsProps = () => (
  <DocumentationPropsUl>
    <DocumentationPropsLi>
      <strong>children</strong>: <DocumentationPropsCode>React.ReactNode</DocumentationPropsCode>
      <p>The content that will be displayed as the main clickable area to toggle the collapse state.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>collpasedComponent</strong>: <DocumentationPropsCode>React.ReactNode</DocumentationPropsCode>
      <p>The content that will be revealed or hidden when the component is expanded or collapsed.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>onOpen</strong>: <DocumentationPropsCode>(isOpen: boolean) ={">"} void</DocumentationPropsCode> (optional)
      <p>A callback function that is triggered when the collapse state changes.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>initialOpen</strong>: <DocumentationPropsCode>boolean</DocumentationPropsCode> (optional, default:{" "}
      <DocumentationPropsCode>false</DocumentationPropsCode>)<p>Specifies whether the component should be open by default.</p>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>position</strong>: <DocumentationPropsCode>"top" | "bottom" | "left" | "right"</DocumentationPropsCode> (optional, default:{" "}
      <DocumentationPropsCode>"bottom"</DocumentationPropsCode>)
      <p>
        Determines the direction from which the <DocumentationPropsCode>collpasedComponent</DocumentationPropsCode> will expand. The
        possible values are:
      </p>
      <DocumentationPropsUl>
        <DocumentationPropsLi>
          <DocumentationPropsCode>"top"</DocumentationPropsCode>: The <DocumentationPropsCode>collpasedComponent</DocumentationPropsCode>{" "}
          expands from the top.
        </DocumentationPropsLi>
        <DocumentationPropsLi>
          <DocumentationPropsCode>"bottom"</DocumentationPropsCode>: The <DocumentationPropsCode>collpasedComponent</DocumentationPropsCode>{" "}
          expands from the bottom.
        </DocumentationPropsLi>
        <DocumentationPropsLi>
          <DocumentationPropsCode>"left"</DocumentationPropsCode>: The <DocumentationPropsCode>collpasedComponent</DocumentationPropsCode>{" "}
          expands from the left.
        </DocumentationPropsLi>
        <DocumentationPropsLi>
          <DocumentationPropsCode>"right"</DocumentationPropsCode>: The <DocumentationPropsCode>collpasedComponent</DocumentationPropsCode>{" "}
          expands from the right.
        </DocumentationPropsLi>
      </DocumentationPropsUl>
    </DocumentationPropsLi>
    <DocumentationPropsLi>
      <strong>spacing</strong>: <DocumentationPropsCode>number</DocumentationPropsCode> (optional)
      <p>
        Specifies the gap between the <DocumentationPropsCode>children</DocumentationPropsCode> and the{" "}
        <DocumentationPropsCode>collpasedComponent</DocumentationPropsCode>.
      </p>
    </DocumentationPropsLi>
  </DocumentationPropsUl>
);

const Docs = () => {
  const [isPropsShown, setIsPropsShown] = useState(false);

  return (
    <DocumentationWrapper>
      <DocumentationText>
        The <DocumentationPropsCode>ATHOSCollapse</DocumentationPropsCode> component is a collapsible container that can expand or collapse
        its content based on user interaction. It uses the <DocumentationPropsCode>framer-motion</DocumentationPropsCode> library for smooth
        animations.
      </DocumentationText>
      <DocumentationPropsWrapper>
        <ATHOSCollapse
          onOpen={(isOpen) => setIsPropsShown(isOpen)}
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
