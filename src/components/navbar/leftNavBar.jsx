import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  BookOutlined,
  Cached,
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
    icon: <BookOutlined />,
    name: "books",
  },
  {
    icon: <Edit />,
    name: "create",
  },
  {
    icon: <VpnKey />,
    name: "sign-in",
  },
  {
    icon: <Cached />,
    isDisabledable: true,
    name: "load-all",
  },
];

const propTypes = { isLoading: PropType.bool, onClick: PropType.func };
const useStyles = makeStyles(() => styles);
const LeftNavBar = ({ isLoading = false, onClick = null }) => {
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
                    isDisabled={icon.isDisabledable && isLoading}
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
