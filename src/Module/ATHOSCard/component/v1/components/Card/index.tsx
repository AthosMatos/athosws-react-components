import { motion } from "framer-motion";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
import { ATHOSCardProps } from "../../interface";
import { GripIcon } from "./gripIcon";

const ATHOSCard = (props: ATHOSCardProps) => {
  const { className, style, children, index, id, removeSelf, isDeleting, setIsDeleting } = props;
  const [isDelete, setIsDelete] = useState(false);

  const onDeleteProps = {
    animate: isDelete
      ? {
          opacity: 0,
          scale: 0,
        }
      : undefined,
  };

  //onset capture widht and height
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          id={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...onDeleteProps}
          key={`${id}-${index}-${isDeleting}`}
          layout={isDeleting ? "position" : false}
          className={className}
          style={{ ...provided.draggableProps.style, ...style }}
          transition={{ duration: 0.4, ease: "anticipate" }}
        >
          <div className="flex relative p-2 justify-center">
            <div {...provided.dragHandleProps} className="w-2/3">
              <GripIcon className="w-full fill-gray-300" />
            </div>
            <FaTrash
              onClick={() => {
                setIsDeleting(true);
                setIsDelete(true);
                setTimeout(() => {
                  removeSelf();
                }, 200);
                setTimeout(() => {
                  setIsDeleting(false);
                }, 800);
              }}
              className="text-lg absolute right-2 cursor-pointer"
            />
          </div>

          {children}
        </motion.div>
      )}
    </Draggable>
  );
};

export default ATHOSCard;
