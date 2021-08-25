import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
} from "@material-ui/core";
import Article from "./article";

const propTypes = { articleData: PropType.object, show: PropType.bool };
const Card = ({ articleData, show }) => {
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
    <MuiCard style={{ margin: "6px" }}>
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
    </MuiCard>
  );
};

Card.propTypes = propTypes;
export default Card;
