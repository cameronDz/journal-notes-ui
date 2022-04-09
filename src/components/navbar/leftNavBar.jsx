import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  DescriptionTwoTone,
  Edit,
  HomeTwoTone,
  SearchTwoTone,
  VpnKey,
} from "@material-ui/icons";
import { handleFunction } from "../../libs/eventUtil";
import NavIcon from "./navIcon";
import { navBarStyles as styles } from "./styles";

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
  {
    icon: <VpnKey />,
    name: "sign-in",
  },
];

const propTypes = { onClick: PropType.func };
const useStyles = makeStyles(() => styles);
const LeftNavBar = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classNames(classes.navBarRoot)}>
        {Array.isArray(icons) &&
          icons.map((icon) => {
            return (
              icon && (
                <Fragment key={icon.name}>
                  <NavIcon
                    icon={icon.icon}
                    name={icon.name}
                    onClick={(event) => handleFunction(onClick, event)}
                  />
                </Fragment>
              )
            );
          })}
      </div>
    </Fragment>
  );
};

LeftNavBar.propTypes = propTypes;
export default LeftNavBar;
