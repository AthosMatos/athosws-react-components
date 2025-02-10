export const ATHOSButton_dftprops = `
    display: flex;
    cursor: pointer;
    border: none;
    text-align: center;
    text-decoration: none;    
    font-weight: 400;
    transition: all 0.14s;
    user-select: none;
    height: fit-content;
    font-size: 1rem;
    padding: 0.7rem 1.6rem;
    border-radius: 0.3rem;
    width: fit-content;
`;

export const ATHOSButton_dftanim = `
    &:hover {
        box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
        transform: scale(1.04);
    }

    &:active {
        transform: scale(1.0);
    }
`;
