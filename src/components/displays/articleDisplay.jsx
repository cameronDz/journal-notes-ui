import React from "react";
import PropType from "prop-types";
import Article from "./article";

const propTypes = { articleData: PropType.object };
const ArticleDisplay = ({ articleData }) => {
  return (
    <div style={{ paddingBottom: "16px", paddingTop: "4px" }}>
      <Article {...articleData} showFull={false} />
    </div>
  );
};

ArticleDisplay.propTypes = propTypes;
export default ArticleDisplay;
