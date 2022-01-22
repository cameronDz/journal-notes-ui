import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import NoteCard from "../noteCard";
import BookView from "./bookView";
import { propTypesBookV1 } from "./types";

const propTypes = {
  isEditable: PropType.bool,
  minHeight: PropType.string,
  noteData: PropType.shape(propTypesBookV1),
  onClickEdit: PropType.func,
  show: PropType.bool,
};

const BookCard = ({
  isEditable = false,
  minHeight = null,
  noteData = null,
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
      isEditable={isEditable}
      isFullView={null}
      minHeight={minHeight}
      onClickFull={handleClick}
      onClickEdit={onClickEdit}
    >
      <BookView note={noteData} showFull={showFull} />
    </NoteCard>
  );
};

BookCard.propTypes = propTypes;
export default BookCard;
