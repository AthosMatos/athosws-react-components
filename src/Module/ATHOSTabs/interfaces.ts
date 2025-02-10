import { ReactNode } from "react";

interface TabProps {
  title: {
    value: ReactNode;
    className?: {
      default?: string;
      active?: string;
    };
  };
  content: {
    value: ReactNode;
    className?: string;
  };
}

export interface ATHOSTabsProps {
  tabs: TabProps[];
  gap?: number;
  className?: {
    tab?: string;
    body?: string;
  };
}
