import React from "react";
import PropType from "prop-types";
import { Box, Typography } from "@material-ui/core";

const propTypes = {
  children: PropType.node,
  index: PropType.any.isRequired,
  value: PropType.any.isRequired,
};
const Panel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      aria-labelledby={`nav-tab-${index}`}
      component="div"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

Panel.propTypes = propTypes;
export default Panel;
