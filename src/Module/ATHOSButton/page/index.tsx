import { FaPlus, FaTrash } from "react-icons/fa";
import { ATHOSButton } from "../component";

const ATHOSButtonPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <ATHOSButton tooltip={"button"} className="bg-red-600 p-2 px-3 rounded-lg">
        Button
      </ATHOSButton>
      <ATHOSButton className="bg-teal-600 p-1 px-2 rounded-md font-light">Fazer Peça</ATHOSButton>
      <ATHOSButton className="bg-teal-600/10 p-2 border border-teal-600 px-5 rounded-lg text-teal-500 font-medium ">Salvar</ATHOSButton>
      <ATHOSButton
        icon={<FaPlus />}
        className="dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-200 text-zinc-600 p-2 pl-3 pr-4 rounded-lg font-medium "
      >
        Adicionar
      </ATHOSButton>
      <ATHOSButton
        inConfirmClassName="text-red-400 font-semibold"
        confirmCollapse
        icon={<FaTrash />}
        className="font-semibold dark:text-white text-black"
        onConfirm={() => {
          alert("Deletar");
        }}
      >
        Deletar
      </ATHOSButton>
    </div>
  );
};

export default ATHOSButtonPage;
