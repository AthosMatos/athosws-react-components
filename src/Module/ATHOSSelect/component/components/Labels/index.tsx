import { useState } from "react";
import { useATHOSSelectContext } from "../../context";
import { ATHOSSelectPropsList } from "../../intefaces";
import ListItem from "../ListItem";

const Labels = (props: ATHOSSelectPropsList) => {
  const { labelClassName, labelsStyle } = props;
  const { select, labels, selectedItems: selected, isOpened, setLastSelected, lastSelected } = useATHOSSelectContext();

  return (
    <>
      {labels?.map((option, index) => (
        <ListItem
          isOpened={isOpened}
          index={index}
          key={option.value}
          selectedClassName={props.selectedLabelClassName}
          selectedStyle={props.selectedLabelStyle}
          style={labelsStyle}
          className={labelClassName}
          option={option}
          onClick={() => {
            select(option.value);
            setLastSelected(option.value);
          }}
          isLastSelected={lastSelected === option.value}
          isSelected={selected.includes(option.value)}
        />
      ))}
    </>
  );
};

export default Labels;
