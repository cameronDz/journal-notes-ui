import React, { useEffect, useState, Fragment } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";
import ArticleCard from "../../components/displays/articleCard";
import RouteTitle from "../../components/routeTitle";
import StandardButton from "../../components/standardButton";
import JournalForm from "./journalForm";
import JournalFormRadioSelect from "./journalFormRadioSelect";

import { downloadJson } from "../../libs/download";
import { journalForms, journalTypes } from "../../libs/types";
import { postArticle, putIndex } from "./state/actions";
import { editorSectionStyles as styles } from "./styles";

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

const availableTypes = Object.values(journalTypes);
const buttonTitleDownload = "Download article notes in JSON format";
const buttonTitleReset = "Clear input of article notes";
const buttonTitleUpload = "Upload article notes to S3";

const useStyles = makeStyles(() => styles);
const EditorSection = ({
  isLoadingIndex,
  isProcessingArticle,
  isProcessingIndex,
  isUserSecured,
  indexList,
  pageTitle,
  postNewArticle,
  updateArticleIndexList,
}) => {
  const [hasStartedIndexPut, setHasStartedIndexPut] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [type, setType] = useState(journalTypes.ARTICLE);
  const [values, setValues] = useState({});

  useEffect(() => {
    clearForm();
  }, [type, isUserSecured]);

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
    setIsDirty(false);
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
    return { ...(values || {}) };
  };

  const updateValues = (updatedValues) => {
    setValues(updatedValues);
  };

  const handleDirtiedForm = (val) => {
    setIsDirty(val);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <RouteTitle title={pageTitle} />
      <div className={classes.radioContainer}>
        <JournalFormRadioSelect
          availableTypes={availableTypes}
          currentType={type}
          isDisabled={isDirty}
          onTypeChange={(event) => setType(event?.target?.value)}
        />
      </div>
      {!isUserSecured && (
        <span className={classes.unauthWarning}>
          * Must log in with user credentials in order to create journal notes.
        </span>
      )}
      <JournalForm
        formValues={values}
        inputs={journalForms?.[type]?.inputs}
        isDisabled={isDisabled}
        onDirtiedForm={handleDirtiedForm}
        updateValues={updateValues}
      />
      <Grid container spacing={0}>
        {type === journalTypes.ARTICLE && (
          <Grid item xs={12}>
            <div style={{ fontSize: "20px", marginBottom: "12px" }}>
              Card Preview
            </div>
            <Grid item sm={12}>
              <ArticleCard articleData={generateCardPayload()} show={true} />
            </Grid>
          </Grid>
        )}
        <Grid className={classes.buttonContainer} item xs={12}>
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

EditorSection.propTypes = propTypes;
const mapStateToProps = (state) => ({
  indexList: state.notes.index,
  isLoadingIndex: state.editor.isLoadingIndex,
  isProcessingArticle: state.editor.isProcessingArticle,
  isProcessingIndex: state.editor.isProcessingIndex,
  isUserSecured: !!state.auth.token,
});
const mapDispatchToProps = {
  postNewArticle: postArticle,
  updateArticleIndexList: putIndex,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditorSection);
