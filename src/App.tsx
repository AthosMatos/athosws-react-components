import { useState } from "react";
import "./App.css";
import { tdata } from "./data-CC71BNrg8tmzETG2KjpiS";
import { GroupI } from "./Module/ATHOSCard";
import { useATHOSToast } from "./Module/ATHOSToast/useToast";

const TestPage = () => {
  const [error, setError] = useState<string>();
  const [boards, setBoards] = useState<GroupI[]>([]);
  const [tableData, setTableData] = useState(tdata);
  const [open, setOpen] = useState(false);

  const { toast } = useATHOSToast();

  return <div className="p-2 w-60">TEST </div>;
};

export default TestPage;
