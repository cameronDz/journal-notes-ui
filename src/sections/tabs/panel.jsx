import React from "react";
import PropType from "prop-types";
import { Box, Typography } from "@material-ui/core";

const propTypes = { children: PropType.node };
const Panel = ({ children, ...other }) => {
  return (
    <Typography component="div" {...other}>
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

Panel.propTypes = propTypes;
export default Panel;
