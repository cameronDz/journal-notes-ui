import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { bulletPointStyles } from "./styles";

const propTypes = {
  keyName: PropType.string,
  points: PropType.array,
  title: PropType.string,
};

const bullet = <span>&#8226;</span>;
const useStyles = makeStyles(() => bulletPointStyles);
const ArticleBulletPoints = ({ keyName = "", points = [], title = "" }) => {
  const classes = useStyles();
  return (
    Array.isArray(points) &&
    points.length > 0 && (
      <Fragment>
        <br />
        {!!title && (
          <div>
            <strong className={classNames(classes?.bulletsTitle)}>
              {title}
            </strong>
          </div>
        )}
        {!!keyName &&
          points.map((point, index) => {
            return (
              point &&
              point?.[keyName](
                <div key={point?.id || index}>
                  {bullet} {point[keyName]}
                </div>
              )
            );
          })}
      </Fragment>
    )
  );
};

ArticleBulletPoints.propTypes = propTypes;
export default ArticleBulletPoints;
