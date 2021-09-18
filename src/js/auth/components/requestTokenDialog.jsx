import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";

const title = "Sign in with credentials";
const RequestTokenDialog = ({ isOpen, onClose }) => {
  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
    </Dialog>
  );
};

export default RequestTokenDialog;
