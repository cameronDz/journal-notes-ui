import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import NoteCard from "../noteCard";
import BookView from "./bookView";
import { propTypesBookV1 } from "./types";

const propTypes = {
  isButtonMisc: PropType.bool,
  isChild: PropType.bool,
  isClonable: PropType.bool,
  isClonableV2: PropType.bool,
  isEditable: PropType.bool,
  isEditableV2: PropType.bool,
  hasBorder: PropType.bool,
  minHeight: PropType.string,
  noteData: PropType.shape(propTypesBookV1),
  onClickBookId: PropType.func,
  onClickClone: PropType.func,
  onClickCloneV2: PropType.func,
  onClickEdit: PropType.func,
  onClickEditV2: PropType.func,
  show: PropType.bool,
};

const BookCard = ({
  isButtonMisc = false,
  isChild = false,
  isClonable = false,
  isClonableV2 = false,
  isEditable = false,
  isEditableV2 = false,
  hasBorder = false,
  minHeight = null,
  noteData = null,
  onClickBookId = null,
  onClickClone = null,
  onClickCloneV2 = null,
  onClickEdit = null,
  onClickEditV2 = null,
  show = false,
}) => {
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    setShowFull(!!show);
  }, [show]);

  const handleClick = () => {
    setShowFull((prev) => !prev);
  };

  const maxHeight = isChild ? "20px" : "unset";
  const slimMinHeight = isChild ? "20px" : null;
  const calcMinHeight = minHeight || slimMinHeight;
  return (
    <NoteCard
      isButtonMisc={isButtonMisc}
      isClonable={isClonable}
      isClonableV2={isClonableV2}
      isEditable={isEditable}
      isEditableV2={isEditableV2}
      isFullView={showFull}
      hasBorder={hasBorder}
      maxHeight={maxHeight}
      minHeight={calcMinHeight}
      onClickButtonMisc={onClickBookId}
      onClickClone={onClickClone}
      onClickCloneV2={onClickCloneV2}
      onClickEdit={onClickEdit}
      onClickEditV2={onClickEditV2}
      onClickFull={handleClick}
      textButtonMisc="Align Book ID"
    >
      <BookView isChild={isChild} note={noteData} showFull={showFull} />
    </NoteCard>
  );
};

BookCard.propTypes = propTypes;
export default BookCard;
