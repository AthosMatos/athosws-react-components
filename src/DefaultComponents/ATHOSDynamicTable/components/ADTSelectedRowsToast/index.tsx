import toast from "react-hot-toast";

interface ADTSelectedRowsToastProps {
  selectedRows: number;
  toastID: string;
  uncheckAll: () => void;
}
const ADTSelectedRowsToast = ({
  selectedRows,
  toastID,
  uncheckAll,
}: ADTSelectedRowsToastProps) => {
  const onDismiss = () => {
    toast.dismiss(toastID);
    uncheckAll();
  };

  return (
    <div>
      <span>{selectedRows} rows selected</span>
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  );
};

export default ADTSelectedRowsToast;
