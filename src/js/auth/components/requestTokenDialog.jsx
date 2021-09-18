import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { requestTokenDialogStyles } from "./styles";

const title = "Sign in with credentials";
const useStyles = makeStyles(() => requestTokenDialogStyles);
const RequestTokenDialog = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    if (!isProcessing && typeof onClose === "function") {
      onClose();
    }
  };

  const handleSignInClick = () => {
    setIsProcessing(!isProcessing);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <div className={classes?.dialogContainer}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div className={classes?.dialogContentContainer}>
            <DialogContentText>
              {isProcessing ? (
                <CircularProgress />
              ) : (
                `To create new journal notes, please log in with valid credentials.`
              )}
            </DialogContentText>
          </div>

          <TextField
            autoFocus
            disabled={isProcessing}
            fullWidth={true}
            id="username"
            label="Username"
            margin="dense"
            type="text"
            variant="standard"
          />
          <TextField
            disabled={isProcessing}
            fullWidth={true}
            id="password"
            label="Password"
            margin="dense"
            type="password"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isProcessing} onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSignInClick}>Signin</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default RequestTokenDialog;
