import { MdBlock } from "react-icons/md";
import { ATHOSColors } from "../../../colors/colors";
import { useATHOSInputContext } from "../context";
import { AIErrorLabel, AIInputLabel, AILabelsWrapper } from "../styled";

export const Label = () => {
  const {
    props: { type, label, disabled, error },
    hasError,
  } = useATHOSInputContext();

  return (
    <AILabelsWrapper>
      <div className="flex items-center gap-1">
        {type === "password" ? (
          <AIInputLabel>{"Senha"}</AIInputLabel>
        ) : type === "user" ? (
          <AIInputLabel>{"Usuário"}</AIInputLabel>
        ) : (
          label && <AIInputLabel>{label}</AIInputLabel>
        )}
        {disabled && type !== "file" && <MdBlock size={13} color={ATHOSColors.gray.dark} />}
      </div>
      {hasError && <AIErrorLabel>{`*${error}`}</AIErrorLabel>}
    </AILabelsWrapper>
  );
};
