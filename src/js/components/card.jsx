import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Article from "./article";

const propTypes = { articleData: PropType.object, show: PropType.bool };
const card = ({ articleData, show }) => {
  const EXPAND = "Expand to see More";
  const RETRACT = "Show less";

  const [cardActionText, setCardActionText] = useState(EXPAND);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    const text = show ? RETRACT : EXPAND;
    setCardActionText(text);
    setShowFull(!!show);
  }, []);

  const switchExpand = () => {
    const newText = showFull ? EXPAND : RETRACT;
    setCardActionText(newText);
    setShowFull(!showFull);
  };

  return (
    <Card style={{ margin: "6px" }}>
      <CardContent
        style={{ margin: "6px", minHeight: "180px", paddingBottom: "6px" }}
      >
        <Article {...articleData} showFull={showFull} />
      </CardContent>
      <CardActions style={{ alignItems: "center", justifyContent: "center" }}>
        <Button onClick={() => switchExpand()} size="small">
          {cardActionText}
        </Button>
      </CardActions>
    </Card>
  );
};

card.propTypes = propTypes;
export default card;
