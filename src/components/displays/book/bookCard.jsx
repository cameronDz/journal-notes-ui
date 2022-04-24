import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import NoteCard from "../noteCard";
import BookView from "./bookView";
import { propTypesBookV1 } from "./types";

const propTypes = {
  isButtonMisc: PropType.bool,
  isChild: PropType.bool,
  isClonable: PropType.bool,
  isEditable: PropType.bool,
  hasBorder: PropType.bool,
  minHeight: PropType.string,
  noteData: PropType.shape(propTypesBookV1),
  onClickBookId: PropType.func,
  onClickClone: PropType.func,
  onClickEdit: PropType.func,
  show: PropType.bool,
};

const BookCard = ({
  isButtonMisc = false,
  isChild = false,
  isClonable = false,
  isEditable = false,
  hasBorder = false,
  minHeight = null,
  noteData = null,
  onClickBookId = null,
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

  const maxHeight = isChild ? "12px" : "unset";
  const slimMinHeight = isChild ? "12px" : null;
  const calcMinHeight = minHeight || slimMinHeight;
  return (
    <NoteCard
      isButtonMisc={isButtonMisc}
      isClonable={isClonable}
      isEditable={isEditable}
      isFullView={showFull}
      hasBorder={hasBorder}
      maxHeight={maxHeight}
      minHeight={calcMinHeight}
      onClickButtonMisc={onClickBookId}
      onClickClone={onClickClone}
      onClickEdit={onClickEdit}
      onClickFull={handleClick}
      textButtonMisc="Align Book ID"
    >
      <BookView isChild={isChild} note={noteData} showFull={showFull} />
    </NoteCard>
  );
};

BookCard.propTypes = propTypes;
export default BookCard;
