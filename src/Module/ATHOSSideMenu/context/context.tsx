import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { SelectedDataTrackOptI } from "../ASM/Options/Option/interfaces";
import { ATHOSSideMenuProps } from "../interfaces";
import { ATHOSSideMenuContextProps } from "./interfaces";

const ATHOSSideMenuContext = createContext<ATHOSSideMenuContextProps | null>(null);
const ATHOSSideMenuProvider = ({ children, props }: { children: React.ReactNode; props: ATHOSSideMenuProps }) => {
  const dropId = "athos-side-menu-drop-area";
  const [hideMenu, setHideMenu] = useState(false);
  const [editing, setEditing] = useState(false);

  const [selectedDataTrack, setSelectedData] = useState<SelectedDataTrackOptI[]>(
    props.options.map((dt) => {
      const index = v4();
      return {
        ...dt,
        id: `${dt.label}-${index}`,
        selected: false,
        subOptions: dt.subOptions?.map((sub) => {
          const subIndex = v4();
          return {
            id: `${dt.label}-${sub.label}-${subIndex}`,
            label: sub.label,
            onClick: sub.onClick,
            selected: false,
          };
        }),
      };
    })
  );

  const selectOption = (id: string) => {
    const subopts = selectedDataTrack.find((dt) => dt.id == id)?.subOptions;
    const clickedHasSubOptions = subopts && subopts.length > 0;

    setSelectedData(
      selectedDataTrack.map((dt, i) => {
        if (dt.id == id) {
          dt.onClick && dt.onClick();
          return {
            ...dt,
            selected: clickedHasSubOptions ? !dt.selected : true,
          };
        }
        return {
          ...dt,
          selected: clickedHasSubOptions ? dt.selected : false,
          subOptions: !clickedHasSubOptions
            ? dt.subOptions?.map((sub) => {
                return {
                  ...sub,
                  selected: false,
                };
              })
            : dt.subOptions,
        };
      })
    );

    if (clickedHasSubOptions && hideMenu) {
      setHideMenu(false);
    }
  };

  const selectSubOption = (parentId: string, id: string) => {
    setSelectedData(
      selectedDataTrack.map((dt, i) => {
        if (dt.id == parentId) {
          return {
            ...dt,
            subOptions: dt.subOptions?.map((sub, j) => {
              if (sub.id == id) {
                sub.onClick && sub.onClick();
                return {
                  ...sub,
                  selected: true,
                };
              }
              return {
                ...sub,
                selected: false,
              };
            }),
          };
        }
        return {
          ...dt,
          selected: false,
          subOptions: dt.subOptions?.map((sub) => {
            return {
              ...sub,
              selected: false,
            };
          }),
        };
      })
    );
  };

  useEffect(() => {
    if (hideMenu) {
      setSelectedData(
        selectedDataTrack.map((dt, i) => {
          const hasSubOptions = dt.subOptions && dt.subOptions.length > 0;
          if (hasSubOptions) {
            return {
              ...dt,
              selected: false,
            };
          }
          return dt;
        })
      );
    }
  }, [hideMenu]);

  return (
    <ATHOSSideMenuContext.Provider
      value={{
        selectOption,
        selectedDataTrack,
        selectSubOption,
        props,
        dropId,
        setSelectedData,
        hideMenu,
        setHideMenu,
        editing,
        setEditing,
      }}
    >
      {children}
    </ATHOSSideMenuContext.Provider>
  );
};

const useATHOSSideMenu = () => {
  const context = useContext(ATHOSSideMenuContext);
  if (!context) {
    throw new Error("useATHOSSideMenu must be used within a ATHOSSideMenuProvider");
  }
  return context;
};

export { ATHOSSideMenuProvider, useATHOSSideMenu };
