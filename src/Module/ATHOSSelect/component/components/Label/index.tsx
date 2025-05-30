import { MdBlock } from "react-icons/md";
import { AIErrorLabel, AIInputLabel, AILabelsWrapper } from "../../../../ATHOSInput/component/styled";
import { ATHOSColors } from "../../../../colors/colors";
import { useATHOSSelectContext } from "../../context";

export const Label = () => {
  const {
    props: { label, disabled, error },
  } = useATHOSSelectContext();
  return (
    <AILabelsWrapper>
      <div className="flex items-center gap-1">
        {label && <AIInputLabel>{label}</AIInputLabel>}
        {disabled && <MdBlock size={13} color={ATHOSColors.gray.dark} />}
      </div>
      {error && <AIErrorLabel>{`*${error}`}</AIErrorLabel>}
    </AILabelsWrapper>
  );
};
