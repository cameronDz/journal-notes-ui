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
const CLONE_V2 = "Clone Note V2";
const EDIT = "Edit Note";
const EDIT_V2 = "Edit Note V2";
const EXPAND = "Expand to see More";
const RETRACT = "Show less";

const propTypes = {
  children: PropType.node,
  isButtonMisc: PropType.bool,
  isClonable: PropType.bool,
  isClonableV2: PropType.bool,
  isEditable: PropType.bool,
  isEditableV2: PropType.bool,
  isFullView: PropType.bool,
  hasBorder: PropType.bool,
  maxHeight: PropType.string,
  minHeight: PropType.string,
  onClickButtonMisc: PropType.func,
  onClickClone: PropType.func,
  onClickCloneV2: PropType.func,
  onClickEdit: PropType.func,
  onClickEditV2: PropType.func,
  onClickFull: PropType.func,
  textButtonMisc: PropType.string,
};
const NoteCard = ({
  children = null,
  isButtonMisc = false,
  isClonable = false,
  isClonableV2 = false,
  isEditable = false,
  isEditableV2 = false,
  isFullView = false,
  hasBorder = false,
  maxHeight = null,
  minHeight = null,
  onClickClone = null,
  onClickCloneV2 = null,
  onClickButtonMisc = null,
  onClickEdit = null,
  onClickEditV2 = null,
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
        {isEditableV2 && (
          <Button
            onClick={() => handleFunction(onClickEditV2)}
            size="small"
            variant="outlined"
          >
            {EDIT_V2}
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
        {isClonableV2 && (
          <Button
            onClick={() => handleFunction(onClickCloneV2)}
            size="small"
            variant="outlined"
          >
            {CLONE_V2}
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
