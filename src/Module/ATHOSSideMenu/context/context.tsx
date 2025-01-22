import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { SelectedDataTrackOptI } from "../ASM/Options/Option/interfaces";
import { ATHOSSideMenuProps, DefaultOptI } from "../interfaces";
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
            ...sub,
            id: `${dt.label}-${sub.label}-${subIndex}`,
            label: sub.label,
            onClick: sub.onClick,
            selected: false,
            subSubOptions: sub.subsubOptions?.map((subsub) => {
              const subSubIndex = v4();
              return {
                ...subsub,
                id: `${dt.label}-${sub.label}-${subsub.label}-${subSubIndex}`,
                label: subsub.label,
                onClick: subsub.onClick,
                selected: false,
              };
            }),
          };
        }),
      };
    })
  );

  const [selectedData, setSelData] = useState<DefaultOptI>();

  const getStatePath = (path: string) => {
    const selectedData = selectedDataTrack.map((sdtopt) => {
      if (path === sdtopt.path) {
        setSelData(sdtopt);
        return {
          ...sdtopt,
          selected: true,
        };
      }
      const hasSelectedSubOptions = !!sdtopt.subOptions?.some((subopt) => {
        if (path === subopt.path) {
          return true;
        } else if (subopt.subSubOptions) {
          return !!subopt.subSubOptions.some((subsubopt) => path === subsubopt.path);
        }
        return false;
      });
      return {
        ...sdtopt,
        selected: hasSelectedSubOptions,
        subOptions: sdtopt.subOptions?.map((subopt) => {
          if (path === subopt.path) {
            setSelData(subopt);
            return {
              ...subopt,
              selected: true,
            };
          }
          const hasSelectedSubSubOptions = !!subopt.subSubOptions?.some((subsubopt) => path === subsubopt.path);
          return {
            ...subopt,
            selected: hasSelectedSubSubOptions,
            subSubOptions: subopt.subSubOptions?.map((subsubopt) => {
              if (path === subsubopt.path) {
                setSelData(subsubopt);
                return {
                  ...subsubopt,
                  selected: true,
                };
              }
              return {
                ...subsubopt,
                selected: false,
              };
            }),
          };
        }),
      };
    });

    return selectedData;
  };

  if (props.usesRouter) {
    const location = props.usesRouter.location;

    useEffect(() => {
      //define the selected data track based on the location
      const path = location.pathname;
      const selectedData = getStatePath(path);
      setSelectedData(selectedData);
    }, [location]);
  }

  const selectOption = (id: string) => {
    const subopts = selectedDataTrack.find((dt) => dt.id == id)?.subOptions;
    const clickedHasSubOptions = subopts && subopts.length > 0;
    const OPT = selectedDataTrack.find((sdtopt) => sdtopt.id == id);
    const path = window.location.pathname;

    if (path && OPT?.path && path !== OPT.path) {
      props.usesRouter?.navigate(OPT.path);
      setSelData(OPT);
    }

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
                  subSubOptions: sub.subSubOptions?.map((subsub) => {
                    return {
                      ...subsub,
                      selected: false,
                    };
                  }),
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
    const subopts = selectedDataTrack.find((dt) => dt.id == parentId)?.subOptions?.find((sub) => sub.id == id);
    const subsubopts = subopts?.subSubOptions;
    const clickedHasSubsubOptions = subsubopts && subsubopts.length > 0;
    const path = window.location.pathname;

    const subPath = subopts?.path;
    if (path && subPath && path !== subPath) {
      props.usesRouter?.navigate(subPath);
      setSelData(subopts);
    }
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
                  selected: !sub.selected,
                };
              }
              return {
                ...sub,
                selected: false,
              };
            }),
            selected: true,
          };
        }
        return {
          ...dt,
          selected: clickedHasSubsubOptions ? dt.selected : false,
          subOptions: dt.subOptions?.map((sub) => {
            return {
              ...sub,
              selected: clickedHasSubsubOptions ? sub.selected : false,
            };
          }),
        };
      })
    );
  };

  const selectSubSubOption = (optId: string, subOptId: string, id: string) => {
    const subsubopt = selectedDataTrack
      .find((dt) => dt.id == optId)
      ?.subOptions?.find((sub) => sub.id == subOptId)
      ?.subSubOptions?.find((subsub) => subsub.id == id);
    const subSubPath = subsubopt?.path;
    const path = window.location.pathname;
    if (path && subSubPath && path !== subSubPath) {
      props.usesRouter?.navigate(subSubPath);
      setSelData(subsubopt);
    }

    setSelectedData(
      selectedDataTrack.map((dt, i) => {
        if (dt.id == optId) {
          return {
            ...dt,
            subOptions: dt.subOptions?.map((sub, j) => {
              if (sub.id == subOptId) {
                return {
                  ...sub,
                  subSubOptions: sub.subSubOptions?.map((subsub) => {
                    if (subsub.id == id) {
                      subsub.onClick && subsub.onClick();
                      return {
                        ...subsub,
                        selected: !subsub.selected,
                      };
                    }
                    return {
                      ...subsub,
                      selected: false,
                    };
                  }),
                };
              }
              return {
                ...sub,
                selected: false,
                subSubOptions: sub.subSubOptions?.map((subsub) => {
                  return {
                    ...subsub,
                    selected: false,
                  };
                }),
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
              subSubOptions: sub.subSubOptions?.map((subsub) => {
                return {
                  ...subsub,
                  selected: false,
                };
              }),
            };
          }),
        };
      })
    );
  };

  useEffect(() => {
    if (hideMenu) {
      setSelectedData(
        selectedDataTrack.map((opt, i) => {
          const hasSubOptions = opt.subOptions && opt.subOptions.length > 0;
          if (hasSubOptions) {
            const hasSubSubOptions = opt.subOptions?.some((sub) => sub.subSubOptions?.length && sub.subSubOptions?.length > 0);
            if (hasSubSubOptions) {
              const hasSelectedSubSubOptions = !!opt.subOptions?.some((sub) => sub.subSubOptions?.some((subsub) => subsub.selected));
              return {
                ...opt,
                selected: hasSelectedSubSubOptions,
                subOptions: opt.subOptions?.map((sub) => {
                  return {
                    ...sub,
                    selected: hasSelectedSubSubOptions,
                    subSubOptions: sub.subSubOptions?.map((subsub) => {
                      return {
                        ...subsub,
                        selected: hasSelectedSubSubOptions,
                      };
                    }),
                  };
                }),
              };
            }
            const hasSelectedSubOptions = !!opt.subOptions?.some((sub) => sub.selected);
            return {
              ...opt,
              selected: hasSelectedSubOptions,
              subOptions: opt.subOptions?.map((sub) => {
                return {
                  ...sub,
                  selected: hasSelectedSubOptions,
                };
              }),
            };
          }
          return opt;
        })
      );
    } else if (props.usesRouter) {
      const location = props.usesRouter.location;
      const path = location.pathname;
      const selectedData = getStatePath(path);
      setSelectedData(selectedData);
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
        selectedData,
        hideMenu,
        setHideMenu,
        editing,
        setEditing,
        selectSubSubOption,
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
