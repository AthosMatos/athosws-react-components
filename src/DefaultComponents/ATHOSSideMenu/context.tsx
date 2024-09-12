import { createContext, useContext, useEffect, useState } from "react";
import {
  ATHOSSideMenuContextProps,
  ATHOSSideMenuProps,
  SelecetDataTrackI,
} from "./interfaces";

const ATHOSSideMenuContext = createContext<ATHOSSideMenuContextProps | null>(
  null
);
const ATHOSSideMenuProvider = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props: ATHOSSideMenuProps;
}) => {
  const [selectedDataTrack, setSelectedData] = useState<SelecetDataTrackI[]>(
    props.options.map((dt, index) => {
      return {
        label: dt.label,
        onClick: dt.onClick,
        show: false,
        subOptions: dt.subOptions?.map((sub) => {
          return {
            label: sub.label,
            onClick: sub.onClick,
            show: false,
          };
        }),
      };
    })
  );

  const selectOption = (index: number) => {
    const subopts = selectedDataTrack[index].subOptions;
    const clickedHasSubOptions = subopts && subopts.length > 0;

    setSelectedData(
      selectedDataTrack.map((dt, i) => {
        if (i == index) {
          dt.onClick && dt.onClick();
          return {
            ...dt,
            show: clickedHasSubOptions ? !dt.show : true,
          };
        }
        return {
          ...dt,
          show: clickedHasSubOptions ? dt.show : false,
          subOptions: !clickedHasSubOptions
            ? dt.subOptions?.map((sub) => {
                return {
                  ...sub,
                  show: false,
                };
              })
            : dt.subOptions,
        };
      })
    );

    if (clickedHasSubOptions && props.hideMenu) {
      props.setHideMenu(false);
    }
  };

  const selectSubOption = (parentIndex: number, index: number) => {
    setSelectedData(
      selectedDataTrack.map((dt, i) => {
        if (i == parentIndex) {
          return {
            ...dt,
            subOptions: dt.subOptions?.map((sub, j) => {
              if (j == index) {
                sub.onClick && sub.onClick();
                return {
                  ...sub,
                  show: true,
                };
              }
              return {
                ...sub,
                show: false,
              };
            }),
          };
        }
        return {
          ...dt,
          show: false,
          subOptions: dt.subOptions?.map((sub) => {
            return {
              ...sub,
              show: false,
            };
          }),
        };
      })
    );
  };

  useEffect(() => {
    if (props.hideMenu) {
      setSelectedData(
        selectedDataTrack.map((dt, i) => {
          const hasSubOptions = dt.subOptions && dt.subOptions.length > 0;
          if (hasSubOptions) {
            return {
              ...dt,
              show: false,
            };
          }
          return dt;
        })
      );
    }
  }, [props.hideMenu]);

  return (
    <ATHOSSideMenuContext.Provider
      value={{
        selectOption,
        selectedDataTrack,
        selectSubOption,
        props,
      }}
    >
      {children}
    </ATHOSSideMenuContext.Provider>
  );
};

const useATHOSSideMenu = () => {
  const context = useContext(ATHOSSideMenuContext);
  if (!context) {
    throw new Error(
      "useATHOSSideMenu must be used within a ATHOSSideMenuProvider"
    );
  }
  return context;
};

export { ATHOSSideMenuProvider, useATHOSSideMenu };
