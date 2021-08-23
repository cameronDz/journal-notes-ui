import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import Grid from "@material-ui/core/Grid";

const propTypes = { section: PropType.object, title: PropType.string };
const grid = (props) => {
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
      <Grid item xs={12} sm={4}>
        <h3>{title}</h3>
        {section}
      </Grid>
    )
  );
};

grid.propTypes = propTypes;
export default grid;
