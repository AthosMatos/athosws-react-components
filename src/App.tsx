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
              selected: {
                border: {
                  color: "rgb(194, 194, 194)",
                  width: "1px",
                },
                background: "rgba(0, 0, 0, 0.349)",
                text: "rgb(255, 255, 255)",
              },
              normal: {
                border: "none",
                background: "rgba(0, 0, 0, 0.349)",
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
