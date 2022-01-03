import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import NoteCard from "../noteCard";
import BookView from "./bookView";
import { propTypesBookV1 } from "./types";

const propTypes = {
  minHeight: PropType.string,
  noteData: PropType.shape(propTypesBookV1),
  show: PropType.bool,
};

const BookCard = ({ minHeight = null, noteData = null, show = false }) => {
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    setShowFull(!!show);
  }, [show]);

  const handleClick = () => {
    setShowFull((prev) => !prev);
  };

  return (
    <NoteCard isFullView={null} minHeight={minHeight} onClickFull={handleClick}>
      <BookView note={noteData} showFull={showFull} />
    </NoteCard>
  );
};

BookCard.propTypes = propTypes;
export default BookCard;
