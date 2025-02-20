import { ReactNode } from "react";

interface PageTextProps {
  children: ReactNode;
}

const PageText = ({ children }: PageTextProps) => {
  return <p className="text-xl text-zinc-600 dark:text-zinc-400">{children}</p>;
};

export default PageText;
