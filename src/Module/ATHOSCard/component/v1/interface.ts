import { ReactNode } from "react";

export interface ATHOSCardProps extends CreateATHOSCardProps {
  id: string;
  index: number;
  removeSelf: () => void;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleting: boolean;
}

export interface BoardI extends CreateBoardI {
  id: string;
  cards?: ATHOSCardProps[];
  removeSelf: (id: string, boardId: string) => void;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleting: boolean;
}

export interface CreateATHOSCardProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface CreateBoardI {
  direction?: "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
  cards?: CreateATHOSCardProps[];
  preChildren?: ReactNode;
  postChildren?: ReactNode;
}
