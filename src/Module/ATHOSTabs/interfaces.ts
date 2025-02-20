import { ReactNode } from "react";
interface TabClassNameProps {
  default?: string;
  active?: string;
}

export interface TabColorsProps {
  default?: React.CSSProperties;
  active?: React.CSSProperties;
}
interface TabProps {
  title: {
    value: ReactNode;
    className?: TabClassNameProps;
    style?: TabColorsProps;
  };
  content: {
    value: ReactNode;
    className?: string;
    style?: React.CSSProperties;
  };
}

export interface ATHOSTabsProps {
  tabs: TabProps[];
  gap?: number;
  className?: {
    tab?: TabClassNameProps;
    body?: string;
  };
  colors?: {
    tab?: TabColorsProps;
    body?: React.CSSProperties;
  };
}
