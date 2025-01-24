import { useState } from "react";
import "./App.css";
import { tdata } from "./data-CC71BNrg8tmzETG2KjpiS";
import { GroupI } from "./Module/ATHOSCard";
import { ATHOSMenu } from "./Module/ATHOSMenu";
import { useATHOSToast } from "./Module/ATHOSToast/useToast";

const TestPage = () => {
  const [error, setError] = useState<string>();
  const [boards, setBoards] = useState<GroupI[]>([]);
  const [tableData, setTableData] = useState(tdata);
  const [open, setOpen] = useState(false);

  const { toast } = useATHOSToast();

  return (
    <div className="p-2">
      <ATHOSMenu
        options={[
          {
            label: "Option 1",
            subOpt: [
              {
                label: "Sub Option 1",
                subSubOpt: [
                  {
                    label: "Sub Sub Option 1",
                  },
                  {
                    label: "Sub Sub Option 2",
                  },
                ],
              },
            ],
          },
          {
            label: "Option 2",
            subOpt: [
              {
                label: "Sub Option 2",
                subSubOpt: [
                  {
                    label: "Sub Sub Option 2",
                  },
                ],
              },
            ],
          },
          {
            label: "Option 3",
            subOpt: [
              {
                label: "Sub Option 3",
              },
            ],
          },
        ]}
        colors={{
          selected: {
            border: {
              color: "rgb(194, 194, 194)",
              width: "1px",
            },
            background: "rgba(0, 0, 0, 0.349)",
            text: "rgb(255, 255, 255)",
          },
          menu: {
            option: {
              clicked: {
                border: {
                  color: "rgba(255, 255, 255, 0.075)",
                  width: "1px",
                },
                background: "rgba(255, 255, 255, 0.075)",
                text: "rgb(255, 255, 255)",
              },
              normal: {
                border: "none",
                background: "transparent",
                text: "rgb(255, 255, 255)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TestPage;
