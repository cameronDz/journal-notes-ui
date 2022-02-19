import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import {
  clearError,
  clearToken,
  fetchToken,
  livenessCheck,
} from "../state/auth/actions";
import { handleFunction } from "../libs/eventUtil";
import { authText } from "../libs/text";
import { requestTokenDialogStyles as styles } from "./styles";

let abortCtrlPostCredentials = null;
const title = "Sign in with credentials";
const propTypes = {
  clearTokenError: PropType.func,
  clearTokenUser: PropType.func,
  error: PropType.any,
  fetchUserToken: PropType.func,
  isAuthLive: PropType.bool,
  isOpen: PropType.bool,
  isProcessingRequest: PropType.bool,
  livenessTokenCheck: PropType.func,
  onClose: PropType.func,
  token: PropType.any,
};
const useStyles = makeStyles(() => styles);
const RequestTokenDialog = ({
  clearTokenError,
  clearTokenUser,
  error,
  fetchUserToken,
  isAuthLive,
  isOpen,
  isProcessingRequest,
  livenessTokenCheck,
  onClose,
  token,
}) => {
  const classes = useStyles();
  const [dialogSeverity, setDialogSeverity] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    return () => {
      abortCtrlPostCredentials?.abort();
    };
  }, []);

  useEffect(() => {
    let status = "info";
    if (!!token) {
      status = "success";
    } else if (!!error) {
      status = "error";
    }
    setDialogSeverity(status);
    setDialogText(authText[status]);
  }, [error, token]);

  useEffect(() => {
    if (isOpen) {
      if (!isAuthLive) {
        handleFunction(livenessTokenCheck);
      }
    } else {
      handleFunction(clearTokenError);
      setPassword("");
      setUsername("");
    }
  }, [clearTokenError, isAuthLive, isOpen, livenessTokenCheck]);

  const handleActionClick = () => {
    if (!!token) {
      handleFunction(clearTokenUser);
    } else {
      abortCtrlPostCredentials?.abort();
      abortCtrlPostCredentials = new AbortController();
      const config = { signal: abortCtrlPostCredentials.signal };
      const credentials = { username, password };
      handleFunction(fetchUserToken, credentials, config);
    }
  };

  const handleClose = () => {
    if (!isProcessingRequest) {
      handleFunction(onClose);
    }
  };

  const handleTextKeyPress = (event) => {
    if (event?.key === "Enter" && !!username && !!password) {
      handleActionClick();
    }
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <div className={classes.dialogContainer}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div className={classes.dialogContentContainer}>
            {isProcessingRequest && <CircularProgress />}
            {!isProcessingRequest && (
              <Alert severity={dialogSeverity}>{dialogText}</Alert>
            )}
          </div>

          <TextField
            autoFocus
            disabled={isProcessingRequest || !!token}
            fullWidth={true}
            id="username"
            label="Username"
            margin="dense"
            onChange={(event) => setUsername(event?.target?.value)}
            onKeyPress={(event) => handleTextKeyPress(event)}
            type="text"
            value={username}
            variant="standard"
          />
          <TextField
            disabled={isProcessingRequest || !!token}
            fullWidth={true}
            id="password"
            label="Password"
            margin="dense"
            onChange={(event) => setPassword(event?.target?.value)}
            onKeyPress={(event) => handleTextKeyPress(event)}
            type="password"
            value={password}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isProcessingRequest} onClick={handleClose}>
            {!!token ? `Close` : `Cancel`}
          </Button>
          {!!token ? (
            <Button disabled={isProcessingRequest} onClick={handleActionClick}>
              Clear Credentials
            </Button>
          ) : (
            <Button
              disabled={isProcessingRequest || !username || !password}
              onClick={handleActionClick}
            >
              Signin
            </Button>
          )}
        </DialogActions>
      </div>
    </Dialog>
  );
};

RequestTokenDialog.propTypes = propTypes;
const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthLive: state.auth.isLive,
  isProcessingRequest: state.auth.isFetching,
  token: state.auth.token,
});
const mapDispatchToProps = {
  clearTokenError: clearError,
  clearTokenUser: clearToken,
  fetchUserToken: fetchToken,
  livenessTokenCheck: livenessCheck,
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestTokenDialog);
