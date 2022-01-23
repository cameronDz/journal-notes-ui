import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import NoteCard from "../noteCard";
import Article from "./article";

const propTypes = {
  articleData: PropType.object,
  isEditable: PropType.bool,
  minHeight: PropType.string,
  onClickEdit: PropType.func,
  show: PropType.bool,
};
const ArticleCard = ({
  articleData,
  isEditable,
  minHeight,
  onClickEdit,
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
      isFullView={showFull}
      minHeight={minHeight}
      onClickEdit={onClickEdit}
      onClickFull={handleClickFull}
    >
      <Article {...articleData} showFull={showFull} />
    </NoteCard>
  );
};

ArticleCard.propTypes = propTypes;
export default ArticleCard;
