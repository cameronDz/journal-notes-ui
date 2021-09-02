import React from "react";
import PropType from "prop-types";
import { Grid as MuiGrid } from "@material-ui/core";

const propTypes = { section: PropType.object, title: PropType.string };
const Grid = ({ section, title }) => {
  return (
    !!section &&
    !!title && (
      <MuiGrid item xs={12} sm={4}>
        <h3>{title}</h3>
        {section}
      </MuiGrid>
    )
  );
};

Grid.propTypes = propTypes;
export default Grid;
