import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import NoteCard from "../noteCard";
import Article from "./article";

const propTypes = {
  articleData: PropType.object,
  isEditable: PropType.bool,
  isEditableV2: PropType.bool,
  minHeight: PropType.string,
  onClickEdit: PropType.func,
  onClickEditV2: PropType.func,
  show: PropType.bool,
};
const ArticleCard = ({
  articleData,
  isEditable,
  isEditableV2,
  minHeight,
  onClickEdit,
  onClickEditV2,
  show,
}) => {
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    setShowFull(!!show);
  }, [show]);

  const handleClickFull = () => {
    setShowFull((prev) => !prev);
  };

  return (
    <NoteCard
      isEditable={isEditable}
      isEditableV2={isEditableV2}
      isFullView={showFull}
      minHeight={minHeight}
      onClickEdit={onClickEdit}
      onClickEditV2={onClickEditV2}
      onClickFull={handleClickFull}
    >
      <Article {...articleData} showFull={showFull} />
    </NoteCard>
  );
};

ArticleCard.propTypes = propTypes;
export default ArticleCard;
