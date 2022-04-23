import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import NoteCard from "../noteCard";
import BookView from "./bookView";
import { propTypesBookV1 } from "./types";

const propTypes = {
  isChild: PropType.bool,
  isClonable: PropType.bool,
  isEditable: PropType.bool,
  minHeight: PropType.string,
  noteData: PropType.shape(propTypesBookV1),
  onClickClone: PropType.func,
  onClickEdit: PropType.func,
  show: PropType.bool,
};

const BookCard = ({
  isChild = false,
  isClonable = false,
  isEditable = false,
  minHeight = null,
  noteData = null,
  onClickClone = null,
  onClickEdit = null,
  show = false,
}) => {
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    setShowFull(!!show);
  }, [show]);

  const handleClick = () => {
    setShowFull((prev) => !prev);
  };

  const slimHeight = isChild ? "45px" : null;
  const calcMinHeight = minHeight || slimHeight;
  return (
    <NoteCard
      isClonable={isClonable}
      isEditable={isEditable}
      isFullView={showFull}
      minHeight={calcMinHeight}
      onClickClone={onClickClone}
      onClickEdit={onClickEdit}
      onClickFull={handleClick}
    >
      <BookView isChild={isChild} note={noteData} showFull={showFull} />
    </NoteCard>
  );
};

BookCard.propTypes = propTypes;
export default BookCard;
