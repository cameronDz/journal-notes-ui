import React, { useState, Fragment } from "react";
import { Button } from "@material-ui/core";
import RequestTokenDialog from "./requestTokenDialog";

const CredentialsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Fragment>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Sign In
      </Button>
      <RequestTokenDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Fragment>
  );
};

export default CredentialsButton;
