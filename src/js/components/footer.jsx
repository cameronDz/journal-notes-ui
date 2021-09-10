import React from "react";
import _packageDetails from "../../../package.json";

const topStyles = {
  width: "100%",
};
const centeredStyles = {
  fontStyle: "italic",
  margin: "auto",
  maxWidth: "1080px",
  textAlign: "center",
};

const displayDate = new Date().getFullYear();
const displayName = "Cam Dziurgot";
const displayVersion = _packageDetails?.version
  ? "v" + _packageDetails.version
  : "";

const Footer = () => {
  return (
    <div style={topStyles}>
      <div style={centeredStyles}>
        {displayName} &copy; {displayDate} {displayVersion}
      </div>
    </div>
  );
};

export default Footer;
