import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TbGripVertical } from "react-icons/tb";
import { v4 } from "uuid";
import { ATHOSCardProps, IGlobalStyle } from "../../interface";

const ATHOSCard = ({
  index,
  header,
  component,
  className,
  style,
  GclassName,
  Gstyle,
  OuterWrapperClass,
  OuterWrapperStyle,
}: ATHOSCardProps & { index: number } & IGlobalStyle) => {
  const id = useMemo(() => v4(), []);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={`p-1 ${OuterWrapperClass} ${GclassName?.cardOuterWrapperClassName}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...OuterWrapperStyle, ...Gstyle?.cardOuterWrapperStyle, ...provided.draggableProps.style }}
        >
          <div style={{ ...style, ...Gstyle?.cardStyle }} className={`${className} ${GclassName?.cardClassName} flex flex-col`}>
            <div
              style={{ ...header.style, ...Gstyle?.headerStyle }}
              className={`${header.className} ${GclassName?.headerClassName} flex items-center`}
            >
              <div className="flex items-center gap-2">
                {header.icon}
                {header.title}
              </div>
              <div {...provided.dragHandleProps}>
                <TbGripVertical className="text-lg" />
              </div>
            </div>

            <div className="p-4">{component}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ATHOSCard;
