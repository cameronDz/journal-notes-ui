import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
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
import { fetchToken, livenessCheck } from "../state/actions";
import { requestTokenDialogStyles } from "./styles";

const title = "Sign in with credentials";
const propTypes = {
  fetchUserToken: PropType.func,
  isOpen: PropType.bool,
  isProcessingRequest: PropType.bool,
  livenessTokenCheck: PropType.func,
  onClose: PropType.func,
};
const useStyles = makeStyles(() => requestTokenDialogStyles);
const RequestTokenDialog = ({
  fetchUserToken,
  isOpen,
  isProcessingRequest,
  livenessTokenCheck,
  onClose,
}) => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof livenessTokenCheck === "function") {
      fetchUserToken();
    }
  }, []);

  const handleClose = () => {
    if (!isProcessingRequest && typeof onClose === "function") {
      onClose();
    }
  };

  const handleSignInClick = () => {
    if (typeof fetchUserToken === "function") {
      fetchUserToken();
    }
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <div className={classes?.dialogContainer}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div className={classes?.dialogContentContainer}>
            <DialogContentText>
              {isProcessingRequest ? (
                <CircularProgress />
              ) : (
                `To create new journal notes, please log in with valid credentials.`
              )}
            </DialogContentText>
          </div>

          <TextField
            autoFocus
            disabled={isProcessingRequest}
            fullWidth={true}
            id="username"
            label="Username"
            margin="dense"
            onChange={(event) => setUsername(event?.target?.value)}
            type="text"
            value={username}
            variant="standard"
          />
          <TextField
            disabled={isProcessingRequest}
            fullWidth={true}
            id="password"
            label="Password"
            margin="dense"
            onChange={(event) => setPassword(event?.target?.value)}
            type="password"
            value={password}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isProcessingRequest} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={isProcessingRequest} onClick={handleSignInClick}>
            Signin
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

RequestTokenDialog.propTypes = propTypes;
const mapStateToProps = (state) => ({
  isProcessingRequest: state.auth.isFetching,
});
const mapDispatchToProps = {
  fetchUserToken: fetchToken,
  livenessTokenCheck: livenessCheck,
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestTokenDialog);
