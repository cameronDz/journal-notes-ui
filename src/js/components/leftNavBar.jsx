import React, { Fragment } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import {
  DescriptionTwoTone,
  Edit,
  HomeTwoTone,
  SearchTwoTone,
} from "@material-ui/icons";
import NavIcon from "./navIcon";
import { navBarStyles } from "./styles";

const icons = [
  {
    icon: <HomeTwoTone />,
    name: "home",
  },
  {
    icon: <DescriptionTwoTone />,
    name: "view",
  },
  {
    icon: <SearchTwoTone />,
    name: "search",
  },
  {
    icon: <Edit />,
    name: "create",
  },
];

const useStyles = makeStyles(() => navBarStyles);
const LeftNavBar = () => {
  const handleClick = (event) => {
    console.info("EVENT:", event);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <div className={classNames(classes?.navBarRoot)}>
        {Array.isArray(icons) &&
          icons.map((icon) => {
            return (
              icon && (
                <Fragment key={icon?.name}>
                  <NavIcon
                    icon={icon?.icon}
                    name={icon?.name}
                    onClick={handleClick}
                  />
                </Fragment>
              )
            );
          })}
      </div>
    </Fragment>
  );
};

export default LeftNavBar;
