import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { Grid } from "@material-ui/core";
import ArticleCard from "../../components/displays/articleCard";
import RouteTitle from "../../components/routeTitle";
import StandardButton from "./standardButton";
import JournalForm from "./journalForm";

import { postArticle, putIndex } from "./state/actions";
import { downloadJson } from "../../libs/download";
import { generateDateString } from "../../libs/date";
import { journalForms } from "../../libs/types";

const propTypes = {
  isLoadingIndex: PropType.bool,
  isProcessingArticle: PropType.bool,
  isProcessingIndex: PropType.bool,
  isUserSecured: PropType.bool,
  indexList: PropType.arrayOf(PropType.string),
  pageTitle: PropType.string,
  postNewArticle: PropType.func,
  updateArticleIndexList: PropType.func,
};

const buttonContainerStyle = {
  marginTop: "12px",
  padding: "4px",
  textAlign: "center",
};
const buttonTitleDownload = "Download article notes in JSON format";
const buttonTitleReset = "Clear input of article notes";
const buttonTitleUpload = "Upload article notes to S3";

const Input = ({
  isLoadingIndex,
  isProcessingArticle,
  isProcessingIndex,
  isUserSecured,
  indexList,
  pageTitle,
  postNewArticle,
  updateArticleIndexList,
}) => {
  const [values, setValues] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [hasStartedIndexPut, setHasStartedIndexPut] = useState(false);

  useEffect(() => {
    setIsProcessing(isLoadingIndex || isProcessingArticle || isProcessingIndex);
  }, [isLoadingIndex, isProcessingArticle, isProcessingIndex]);

  useEffect(() => {
    setIsDisabled(isProcessing || !isUserSecured);
  }, [isProcessing, isUserSecured]);

  useEffect(() => {
    if (hasStartedIndexPut && !isProcessingIndex) {
      clearForm();
      setHasStartedIndexPut(false);
    }
  }, [hasStartedIndexPut, isProcessingIndex]);

  const clearForm = () => {
    setValues(null);
  };

  const fireIndexUpdate = () => {
    if (!!values?.id && Array.isArray(indexList)) {
      const newIndex = [...indexList, values?.id];
      updateArticleIndexList(newIndex);
      setHasStartedIndexPut(true);
    }
  };

  const handleClearClick = () => {
    clearForm();
  };

  const handleUploadClick = () => {
    const payload = generateCardPayload();
    fireIndexUpdate();
    postNewArticle(payload);
  };

  const handleDownloadClick = () => {
    const payload = generateCardPayload();
    downloadJson(JSON.stringify(payload), values?.id || "data");
  };

  const generateCardPayload = () => {
    const createdDate = generateDateString();
    return { ...(values || {}), createdDate };
  };

  const updateValues = (updatedValues) => {
    setValues(updatedValues);
  };

  return (
    <Fragment>
      <RouteTitle title={pageTitle} />
      {!isUserSecured && (
        <span style={{ color: "red" }}>
          * Must log in with user credentials in order to create journal notes.
        </span>
      )}
      <JournalForm
        formValues={values}
        inputs={journalForms.ARTICLE.inputs}
        isDisabled={isDisabled}
        updateValues={updateValues}
      />
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div style={{ fontSize: "20px", marginBottom: "12px" }}>
            Card Preview
          </div>
          <Grid item sm={12}>
            <ArticleCard articleData={generateCardPayload()} show={true} />
          </Grid>
        </Grid>
        <Grid style={buttonContainerStyle} item xs={12}>
          <StandardButton
            disabled={isDisabled}
            isFat={true}
            label="Upload"
            onClick={handleUploadClick}
            title={buttonTitleUpload}
          />
          <StandardButton
            disabled={isDisabled}
            isFat={true}
            label="Download"
            onClick={handleDownloadClick}
            title={buttonTitleDownload}
          />
          <StandardButton
            disabled={isDisabled}
            isFat={true}
            label="Reset"
            onClick={handleClearClick}
            title={buttonTitleReset}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

Input.propTypes = propTypes;
const mapStateToProps = (state) => ({
  indexList: state.articles.index,
  isLoadingIndex: state.input.isLoadingIndex,
  isProcessingArticle: state.input.isProcessingArticle,
  isProcessingIndex: state.input.isProcessingIndex,
  isUserSecured: !!state.auth.token,
});
const mapDispatchToProps = {
  postNewArticle: postArticle,
  updateArticleIndexList: putIndex,
};
export default connect(mapStateToProps, mapDispatchToProps)(Input);
