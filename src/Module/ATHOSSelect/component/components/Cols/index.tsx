import { useATHOSSelectContext } from "../../context";
import { ATHOSSelectPropsCols } from "../../intefaces";
import ListItem from "../ListItem";

const Cols = (props: ATHOSSelectPropsCols) => {
  const { colClassName, labelClassName, labelsStyle } = props;
  const { cols, select, selectedItems: selected } = useATHOSSelectContext();
  return (
    <>
      {cols?.map((colGroup, index) => (
        <div key={index} className={`flex ${colClassName}`} style={props.colStyle}>
          {colGroup.map((option) => (
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
        </div>
      ))}
    </>
  );
};

export default Cols;
