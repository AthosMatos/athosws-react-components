import { useState } from "react";
import ATHOSCards from "../component";

import { BiCalendar } from "react-icons/bi";
import { BoardI } from "../component/interface";

const ATHOSCardPage = () => {
  /* const [boards, setBoards] = useState<BoardI[]>([
    {
      direction: "horizontal",
      cards: [
        {
          header: {
            icon: <BiCalendar className="text-2xl" />,
            title: "Agenda Semanal",
            className: "font-bold ",
          },
          component: <div className="w-1/2">Content</div>,
        },
        {
          header: {
            title: "Card 2",
          },
        },
        {
          header: {
            title: "Card 3",
          },
        },
      ],
    },
    {
      direction: "horizontal" ,
      cards: [
        {
          header: {
            title: "Card 4",
          },
        },
        {
          header: {
            title: "Card 5",
          },
        },
        {
          header: {
            title: "Card 6",
          },
        },
      ],
    },
    {
      OuterWrapperClass: "w-fit",
      cards: [
        {
          header: {
            title: "Card 4",
          },
        },
        {
          header: {
            title: "Card 5",
          },
        },
        {
          header: {
            title: "Card 6",
          },
        },
      ],
    },
  ]); */
  const [boards, setBoards] = useState<BoardI[]>([
    {
      direction: "horizontal",
      cards: [
        {
          header: {
            icon: <BiCalendar className="text-2xl" />,
            title: "Agenda Semanal",
            className: "font-bold ",
          },
          component: <div className="">Content</div>,
        },
        {
          header: {
            title: "Atuaçôes do mês",
            className: "font-bold ",
          },
        },
        {
          header: {
            title: "Peças",
            className: "font-bold ",
          },
        },
      ],
    },
  ]);

  return (
    <div>
      {/*  <ATHOSCards
        className="flex-col"
        GclassName={{
          boardClassName: "w-full !m-0 ",
          
          cardClassName: "border border-black border-opacity-10 dark:border-white dark:border-opacity-10 rounded-lg",
          headerClassName: "dark:text-white text-black justify-between py-2 pb-0 px-3 gap-4 w-full",
        }}
        updateBoards={setBoards}
        boards={boards}
      /> */}
      <ATHOSCards
        className="flex-col"
        GclassName={{
          boardClassName: "w-full !m-0 ",
          cardOuterWrapperClassName: "w-full max-w-[500px]",
          cardClassName: "border border-black border-opacity-10 dark:border-white dark:border-opacity-10 rounded-lg",
          headerClassName: "dark:text-white text-black justify-between py-2 pb-0 px-3 gap-4 w-full",
        }}
        updateBoards={setBoards}
        boards={boards}
      />
    </div>
  );
};

export default ATHOSCardPage;
