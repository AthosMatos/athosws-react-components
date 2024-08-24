import { useJvrisSideBar } from "../context";
import { JSBOptionLabel, JSBSubOptionWrapper } from "../styled/styled";

interface JSBSubOptionProps {
    label: string;

    index: number;
    parentIndex: number;
}

const JSBSubOption = ({
    label,

    index,
    parentIndex
}: JSBSubOptionProps) => {
    const { size, selectDataTrack, selectSubOption } = useJvrisSideBar();
    const isOpen = selectDataTrack[parentIndex].subOptions[index].show;
    return (
        <JSBSubOptionWrapper
            clicked={isOpen}
            onClick={() => {
                selectSubOption(parentIndex, index);
            }}
            size={size}
        >
            <JSBOptionLabel size={size}>{label}</JSBOptionLabel>
        </JSBSubOptionWrapper>
    );
};

export default JSBSubOption;
