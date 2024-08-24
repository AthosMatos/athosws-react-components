import { adaptSize } from "../../utils";

export const jvrisButton_dftprops = (size: number) => `
    cursor: pointer;
    border: none;
    text-align: center;
    text-decoration: none;    
    font-weight: 400;
    transition: all 0.14s;
    user-select: none;
    height: fit-content;
${`
    font-size: ${adaptSize(size, 2, "rem")};
    padding: ${adaptSize(size, 0.7, "rem")} ${adaptSize(size, 3.4, "rem")};
    border-radius:${adaptSize(size, 0.5, "rem")};
`};
`;

export const jvrisButton_dftanim = `
    &:hover {
        box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
        transform: scale(1.04);
    }

    &:active {
        transform: scale(1.0);
    }
`;
