import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { v4 } from "uuid";
import { JvrisColors } from "../colors/colors";

interface JvrisTooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    wrapperStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
}

const JTWrapper = styled.div`
    height: fit-content;
    width: fit-content;
`;

const JTTooltipText = styled.label`
    font-size: 1.5rem;
`;

const JvrisTooltip = (props: JvrisTooltipProps) => {
    const id = v4();

    return (
        <>
            <Tooltip
                style={{
                    backgroundColor: JvrisColors.black,
                    color: JvrisColors.white,
                    borderRadius: "5px",
                    ...props.wrapperStyle
                }}
                id={id}
            >
                {typeof props.content === "string" ? (
                    <JTTooltipText style={props.textStyle}>
                        {props.content}
                    </JTTooltipText>
                ) : (
                    props.content
                )}
            </Tooltip>
            <JTWrapper data-tooltip-place={props.position} data-tooltip-id={id}>
                {props.children}
            </JTWrapper>
        </>
    );
};

export default JvrisTooltip;
