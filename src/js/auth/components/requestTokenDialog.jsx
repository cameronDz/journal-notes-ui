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
import { clearToken, fetchToken, livenessCheck } from "../state/actions";
import { requestTokenDialogStyles } from "./styles";

const handleEvent = (onEvent) => {
  if (typeof onEvent === "function") {
    onEvent();
  }
};

const title = "Sign in with credentials";
const propTypes = {
  clearUserToken: PropType.func,
  error: PropType.any,
  fetchUserToken: PropType.func,
  isOpen: PropType.bool,
  isProcessingRequest: PropType.bool,
  livenessTokenCheck: PropType.func,
  onClose: PropType.func,
  token: PropType.any,
};
const useStyles = makeStyles(() => requestTokenDialogStyles);
const RequestTokenDialog = ({
  clearUserToken,
  error,
  fetchUserToken,
  isOpen,
  isProcessingRequest,
  livenessTokenCheck,
  onClose,
  token,
}) => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isOpen) {
      handleEvent(livenessTokenCheck);
    }
  }, [isOpen]);

  const handleActionClick = () => {
    if (!!token) {
      handleEvent(clearUserToken);
    } else {
      handleEvent(fetchUserToken);
    }
  }

  const handleClose = () => {
    if (!isProcessingRequest) {
      handleEvent(onClose);
    }
  };

  const getText = () => {
    let text = `To create new journal notes, please log in with valid credentials.`;
    if (!!token) {
      text = `You're credentials are valid.`;
    } else if (!!error) {
      text = `Unable to verify credentials. Please, try again.`;
    }
    return text;
  }

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <div className={classes?.dialogContainer}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div className={classes?.dialogContentContainer}>
            <DialogContentText>
              {isProcessingRequest ? <CircularProgress /> : getText()}
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

          <Button disabled={isProcessingRequest} onClick={handleActionClick}>
            {!!token ? `Clear Credentials` : `Signin`}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

RequestTokenDialog.propTypes = propTypes;
const mapStateToProps = (state) => ({
  error: state.auth.error,
  isProcessingRequest: state.auth.isFetching,
  token: state.auth.token,
});
const mapDispatchToProps = {
  clearUserToken: clearToken,
  fetchUserToken: fetchToken,
  livenessTokenCheck: livenessCheck,
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestTokenDialog);
