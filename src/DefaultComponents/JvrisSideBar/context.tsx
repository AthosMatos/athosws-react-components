import { createContext, useContext, useState } from "react";

interface SubOptionI {
    label: string;
    onClick?: () => void;
}

export interface JvrisSideBarDataI {
    label: string;
    Icon: any;
    iconSize?: string | number;
    subOptions?: SubOptionI[];
    onClick?: () => void;
}

interface SelecetDataTrackSubOptI {
    label: string;
    onClick?: () => void;
    show: boolean;
}

interface SelecetDataTrackI {
    label: string;
    onClick?: () => void;
    show: boolean;
    subOptions?: SelecetDataTrackSubOptI[];
}

interface JvrisSideBarContextProps {
    size: number;
    selectOption: (index: number) => void;
    selectDataTrack: SelecetDataTrackI[];
    selectSubOption: (parentIndex: number, index: number) => void;
}

const JvrisSideBarContext = createContext<JvrisSideBarContextProps | null>(
    null
);
const JvrisSideBarProvider = ({
    children,
    size,
    goToFirstSubOnOpen,
    propsData
}: {
    children: React.ReactNode;
    size: number;
    goToFirstSubOnOpen?: boolean;
    propsData: JvrisSideBarDataI[];
}) => {
    const [selectDataTrack, setSelectData] = useState<SelecetDataTrackI[]>(
        propsData.map((dt, index) => {
            return {
                label: dt.label,
                onClick: dt.onClick,
                show: false,
                subOptions: dt.subOptions?.map((sub) => {
                    return {
                        label: sub.label,
                        onClick: sub.onClick,
                        show: false
                    };
                })
            };
        })
    );

    const selectOption = (index: number) => {
        const clickedHasSubOptions =
            selectDataTrack[index].subOptions?.length > 0;
        setSelectData(
            selectDataTrack.map((dt, i) => {
                if (i == index) {
                    dt.onClick && dt.onClick();
                    return {
                        ...dt,
                        show: clickedHasSubOptions ? !dt.show : true
                    };
                }
                return {
                    ...dt,
                    show: clickedHasSubOptions ? dt.show : false,
                    subOptions: !clickedHasSubOptions
                        ? dt.subOptions?.map((sub) => {
                              return {
                                  ...sub,
                                  show: false
                              };
                          })
                        : dt.subOptions
                };
            })
        );
    };

    const selectSubOption = (parentIndex: number, index: number) => {
        setSelectData(
            selectDataTrack.map((dt, i) => {
                if (i == parentIndex) {
                    return {
                        ...dt,
                        subOptions: dt.subOptions?.map((sub, j) => {
                            if (j == index) {
                                sub.onClick && sub.onClick();
                                return {
                                    ...sub,
                                    show: true
                                };
                            }
                            return {
                                ...sub,
                                show: false
                            };
                        })
                    };
                }
                return {
                    ...dt,
                    show: false,
                    subOptions: dt.subOptions?.map((sub) => {
                        return {
                            ...sub,
                            show: false
                        };
                    })
                };
            })
        );
    };

    return (
        <JvrisSideBarContext.Provider
            value={{
                size,
                selectOption,
                selectDataTrack,
                selectSubOption
            }}
        >
            {children}
        </JvrisSideBarContext.Provider>
    );
};

const useJvrisSideBar = () => {
    const context = useContext(JvrisSideBarContext);
    if (!context) {
        throw new Error(
            "useJvrisSideBar must be used within a JvrisSideBarProvider"
        );
    }
    return context;
};

export { JvrisSideBarProvider, useJvrisSideBar };
