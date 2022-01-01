import React, { Fragment } from "react";
import PropType from "prop-types";

const propTypes = { title: PropType.string };
const SectionHeader = ({ title }) => {
  return (
    <Fragment>
      <br />
      {!!title && (
        <div>
          <strong style={{ fontSize: "16px" }}>{title}</strong>
        </div>
      )}
    </Fragment>
  );
};

SectionHeader.propTypes = propTypes;
export default SectionHeader;
