import React, { useEffect, useState, Fragment } from "react";
import NavTabs from "./components/sections/tabs";
import * as _packageDetails from "../../package.json";

const footerStyling = {
  bottom: "0px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "-36px",
  maxHeight: "24px",
  maxWidth: "1440px",
  textAlign: "center",
};
const App = () => {
  const [displayVersion, setDisplayVersion] = useState("");

  useEffect(() => {
    const version = _packageDetails?.version;
    const display = version ? "v" + version : "";
    setDisplayVersion(display);
  }, []);

  return (
    <Fragment>
      <div style={{ minHeight: "100%" }}>
        <div style={{ paddingBottom: "36px" }}>
          <NavTabs />
        </div>
      </div>
      <div style={footerStyling}>
        {_packageDetails?.author?.name || ""} &copy; 2021 {displayVersion}
      </div>
    </Fragment>
  );
};

export default App;
