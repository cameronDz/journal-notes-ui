import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import NoteCard from "../noteCard";
import Article from "./article";

const propTypes = {
  articleData: PropType.object,
  minHeight: PropType.string,
  show: PropType.bool,
};
const ArticleCard = ({ articleData, minHeight, show }) => {
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    setShowFull(!!show);
  }, [show]);

  const handleClick = () => {
    setShowFull((prev) => !prev);
  };

  return (
    <NoteCard isFullView={null} minHeight={minHeight} onClickFull={handleClick}>
      <Article {...articleData} showFull={showFull} />
    </NoteCard>
  );
};

ArticleCard.propTypes = propTypes;
export default ArticleCard;