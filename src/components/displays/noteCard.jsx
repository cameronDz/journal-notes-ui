import React, { useState } from "react";
import PropType from "prop-types";
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { handleFunction } from "../../libs/eventUtil";

const CLONE = "Clone Note";
const EDIT = "Edit Note";
const EXPAND = "Expand to see More";
const RETRACT = "Show less";

const propTypes = {
  children: PropType.node,
  isClonable: PropType.bool,
  isEditable: PropType.bool,
  isFullView: PropType.bool,
  maxHeight: PropType.string,
  minHeight: PropType.string,
  onClickClone: PropType.func,
  onClickEdit: PropType.func,
  onClickFull: PropType.func,
};
const NoteCard = ({
  children = null,
  isClonable = false,
  isEditable = false,
  isFullView = false,
  maxHeight = null,
  minHeight = null,
  onClickClone = null,
  onClickEdit = null,
  onClickFull = null,
}) => {
  const calcMaxHeight = maxHeight || "unset";
  const height = isFullView ? "unset" : calcMaxHeight;
  const cardActionText = isFullView ? RETRACT : EXPAND;
  return (
    <MuiCard style={{ margin: "6px" }}>
      <CardContent
        style={{
          margin: "6px",
          maxHeight: height,
          minHeight: minHeight || "180px",
          paddingBottom: "6px",
        }}
      >
        {children}
      </CardContent>
      <CardActions style={{ alignItems: "center", justifyContent: "center" }}>
        <Button onClick={() => handleFunction(onClickFull)} size="small">
          {cardActionText}
        </Button>
        {isEditable && (
          <Button
            onClick={() => handleFunction(onClickEdit)}
            size="small"
            variant="outlined"
          >
            {EDIT}
          </Button>
        )}
        {isClonable && (
          <Button
            onClick={() => handleFunction(onClickClone)}
            size="small"
            variant="outlined"
          >
            {CLONE}
          </Button>
        )}
      </CardActions>
    </MuiCard>
  );
};

NoteCard.propTypes = propTypes;
export default NoteCard;
