import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
} from "@material-ui/core";

const EXPAND = "Expand to see More";
const RETRACT = "Show less";

const propTypes = {
  children: PropType.node,
  isFullView: PropType.bool,
  minHeight: PropType.string,
  onClickFull: PropType.func,
};
const NoteCard = ({ children, isFullView, minHeight, onClickFull }) => {
  const [cardActionText, setCardActionText] = useState("");

  useEffect(() => {
    const text = isFullView ? RETRACT : EXPAND;
    setCardActionText(text);
  }, [isFullView]);

  return (
    <MuiCard style={{ margin: "6px" }}>
      <CardContent
        style={{
          margin: "6px",
          minHeight: minHeight || "180px",
          paddingBottom: "6px",
        }}
      >
        {children}
      </CardContent>
      <CardActions style={{ alignItems: "center", justifyContent: "center" }}>
        <Button onClick={() => onClickFull()} size="small">
          {cardActionText}
        </Button>
      </CardActions>
    </MuiCard>
  );
};

NoteCard.propTypes = propTypes;
export default NoteCard;
