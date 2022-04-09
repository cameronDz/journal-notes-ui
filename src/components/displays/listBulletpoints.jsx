import React, { Fragment } from "react";
import PropType from "prop-types";
import SectionHeader from "./sectionHeader";

const propTypes = {
  keyName: PropType.string,
  points: PropType.array,
  title: PropType.string,
};

const bullet = <span>&#8226;</span>;
const ListBulletpoints = ({ keyName = "", points = [], title = "" }) => {
  return (
    Array.isArray(points) &&
    points.length > 0 && (
      <Fragment>
        <SectionHeader title={title} />
        {!!keyName &&
          points.map((point, index) => {
            return (
              point?.[keyName] && (
                <div key={point.id || index}>
                  {bullet} {point[keyName]}
                </div>
              )
            );
          })}
      </Fragment>
    )
  );
};

ListBulletpoints.propTypes = propTypes;
export default ListBulletpoints;
