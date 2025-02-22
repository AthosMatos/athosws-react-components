import { ReactNode } from "react";

export interface ATHOSCardProps {
  header: {
    icon?: ReactNode;
    title: string;
    className?: string;
    style?: React.CSSProperties;
  };
  component?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  OuterWrapperClass?: string;
  OuterWrapperStyle?: React.CSSProperties;
}

export interface BoardI {
  cards: ATHOSCardProps[];
  direction?: "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
  OuterWrapperClass?: string;
  OuterWrapperStyle?: React.CSSProperties;
  cardsClassName?: string;
  cardsStyle?: React.CSSProperties;
}

export interface IGlobalStyle {
  Gstyle?: {
    boardStyle?: React.CSSProperties;
    cardStyle?: React.CSSProperties;
    cardOuterWrapperStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
  };
  GclassName?: {
    boardClassName?: string;
    cardClassName?: string;
    cardOuterWrapperClassName?: string;
    headerClassName?: string;
  };
}

export interface ATHOSCardsProps extends IGlobalStyle {
  boards: BoardI[];
  updateBoards: (boards: BoardI[]) => void;
  className?: string;
  style?: React.CSSProperties;
}
