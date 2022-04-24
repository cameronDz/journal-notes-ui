import React from "react";
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
  isButtonMisc: PropType.bool,
  isClonable: PropType.bool,
  isEditable: PropType.bool,
  isFullView: PropType.bool,
  hasBorder: PropType.bool,
  maxHeight: PropType.string,
  minHeight: PropType.string,
  onClickButtonMisc: PropType.func,
  onClickClone: PropType.func,
  onClickEdit: PropType.func,
  onClickFull: PropType.func,
  textButtonMisc: PropType.string,
};
const NoteCard = ({
  children = null,
  isButtonMisc = false,
  isClonable = false,
  isEditable = false,
  isFullView = false,
  hasBorder = false,
  maxHeight = null,
  minHeight = null,
  onClickClone = null,
  onClickButtonMisc = null,
  onClickEdit = null,
  onClickFull = null,
  textButtonMisc = "",
}) => {
  const calcMaxHeight = maxHeight || "unset";
  const height = isFullView ? "unset" : calcMaxHeight;
  const cardActionText = isFullView ? RETRACT : EXPAND;
  const stylesCard = { margin: "6px" };
  if (hasBorder) {
    stylesCard.border = "1px solid black";
  }
  return (
    <MuiCard style={stylesCard}>
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
        {isButtonMisc && (
          <Button
            onClick={() => handleFunction(onClickButtonMisc)}
            size="small"
            variant="outlined"
          >
            {textButtonMisc}
          </Button>
        )}
      </CardActions>
    </MuiCard>
  );
};

NoteCard.propTypes = propTypes;
export default NoteCard;
