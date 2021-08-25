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
  const [authorName, setAuthorName] = useState("");
  const [displayVersion, setDisplayVersion] = useState("");

  useEffect(() => {
    if (_packageDetails) {
      const { author, version } = _packageDetails;
      if (author && author.name) {
        setAuthorName(author.name);
      }
      if (version) {
        setDisplayVersion("v" + version);
      }
    }
  }, []);

  return (
    <Fragment>
      <div style={{ minHeight: "100%" }}>
        <div style={{ paddingBottom: "36px" }}>
          <NavTabs />
        </div>
      </div>
      <div style={footerStyling}>
        {authorName} &copy; 2021 {displayVersion}
      </div>
    </Fragment>
  );
};

export default App;
