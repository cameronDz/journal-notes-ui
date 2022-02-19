import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import NoteCard from "../noteCard";
import BookView from "./bookView";
import { propTypesBookV1 } from "./types";

const propTypes = {
  isClonable: PropType.bool,
  isEditable: PropType.bool,
  minHeight: PropType.string,
  noteData: PropType.shape(propTypesBookV1),
  onClickClone: PropType.func,
  onClickEdit: PropType.func,
  show: PropType.bool,
};

const BookCard = ({
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

  return (
    <NoteCard
      isClonable={isClonable}
      isEditable={isEditable}
      isFullView={showFull}
      minHeight={minHeight}
      onClickClone={onClickClone}
      onClickEdit={onClickEdit}
      onClickFull={handleClick}
    >
      <BookView note={noteData} showFull={showFull} />
    </NoteCard>
  );
};

BookCard.propTypes = propTypes;
export default BookCard;
