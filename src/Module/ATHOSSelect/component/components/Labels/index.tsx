import { useATHOSSelectContext } from "../../context";
import { ATHOSSelectPropsList } from "../../intefaces";
import ListItem from "../ListItem";

const Labels = (props: ATHOSSelectPropsList) => {
  const { labelClassName, labelsStyle } = props;
  const { select, labels, selectedItems: selected } = useATHOSSelectContext();

  return (
    <>
      {labels?.map((option) => (
        <ListItem
          key={option.value}
          selectedClassName={props.selectedLabelClassName}
          selectedStyle={props.selectedLabelStyle}
          style={labelsStyle}
          className={labelClassName}
          option={option}
          onClick={() => select(option.value)}
          isSelected={selected.includes(option.value)}
        />
      ))}
    </>
  );
};

export default Labels;
