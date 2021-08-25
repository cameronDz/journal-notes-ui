import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import { Grid as MuiGrid } from "@material-ui/core";

const propTypes = { section: PropType.object, title: PropType.string };
const Grid = (props) => {
  const [section, setSection] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const { section, title } = props;
    setSection(section);
    setTitle(title);
  }, []);

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
