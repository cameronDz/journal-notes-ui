import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import PropType from "prop-types";
import { parse } from "query-string";
import { connect } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";
import { ArticleCard } from "../../components/displays/article";
import { BookCard } from "../../components/displays/book";
import RouteTitle from "../../components/routeTitle";
import StandardButton from "../../components/standardButton";
import JournalForm from "./journalForm";
import JournalFormRadioSelect from "./journalFormRadioSelect";

import { generateDateString } from "../../libs/date";
import { downloadJson } from "../../libs/download";
import { journalForms, journalTypes } from "../../libs/types";
import { clearNote, getNote, upsertNote, upsertIndex } from "./state/actions";
import { editorSectionStyles as styles } from "./styles";

const propTypes = {
  clearEditNote: PropType.func,
  editNote: PropType.object,
  isLoadingEditNote: PropType.bool,
  isLoadingIndex: PropType.bool,
  isNew: PropType.bool,
  isProcessingArticle: PropType.bool,
  isProcessingIndex: PropType.bool,
  isUserSecured: PropType.bool,
  indexList: PropType.arrayOf(PropType.string),
  pageTitle: PropType.string,
  requestNoteGet: PropType.func,
  requestNoteUpsert: PropType.func,
  updateArticleIndexList: PropType.func,
};

const availableTypes = Object.values(journalTypes);
const buttonTitleDownload = "Download article notes in JSON format";
const buttonTitleReset = "Clear input of article notes";
const buttonTitleUpload = "Upload article notes to S3";

const useStyles = makeStyles(() => styles);
const EditorSection = ({
  clearEditNote,
  editNote,
  isLoadingEditNote,
  isLoadingIndex,
  isNew = true,
  isProcessingArticle,
  isProcessingIndex,
  isUserSecured,
  indexList,
  pageTitle,
  requestNoteGet,
  requestNoteUpsert,
  updateArticleIndexList,
}) => {
  const history = useHistory();
  const [editId, setEditId] = useState("");
  const [editValues, setEditValues] = useState(null);
  const [hasStartedIndexPut, setHasStartedIndexPut] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reloadValues, setReloadValues] = useState(false);
  const [type, setType] = useState(journalTypes.ARTICLE);
  const [values, setValues] = useState({});

  useEffect(() => {
    const parsedHash = parse(location?.hash);
    const hashKey = "/edit?id";
    const id = parsedHash?.[hashKey];
    setEditId(id);
  }, []);

  useEffect(() => {
    if (!!editNote && typeof editNote === "object") {
      setType(editNote.journalType);
      setEditValues({...editNote});
      setReloadValues(true);
      setTimeout(() => {
        setEditValues(null);
        clearEditNote();
      })
    }
  }, [editNote]);

  useEffect(() => {
    if (!isNew && isUserSecured && !!editId) {
      requestNoteGet(editId);
    }
  }, [isNew, isUserSecured, editId]);

  useEffect(() => {
    setIsProcessing(isLoadingEditNote || isLoadingIndex || isProcessingArticle || isProcessingIndex);
  }, [isLoadingEditNote, isLoadingIndex, isProcessingArticle, isProcessingIndex]);

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
    if (!isNew) {
      const pathname = "/create";
      history.push({ pathname });
    }
  };

  const fireIndexUpdate = () => {
    if (!!values?.id && Array.isArray(indexList) && isNew) {
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
    requestNoteUpsert(payload, isNew);
  };

  const handleDownloadClick = () => {
    const payload = generateCardPayload();
    downloadJson(JSON.stringify(payload), values?.id || "data");
  };

  const generateCardPayload = () => {
    const payload = { ...(values || {}) }
    if (!isNew) {
      payload.updatedDate = generateDateString();
    }
    return payload;
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
        editValues={editValues}
        formValues={values}
        inputs={journalForms?.[type]?.inputs}
        isDisabled={isDisabled}
        onDirtiedForm={handleDirtiedForm}
        reloadValues={reloadValues}
        setReloadValues={setReloadValues}
        updateValues={updateValues}
      />
      <Grid container spacing={0}>
        {(type === journalTypes.ARTICLE || type === journalTypes.BOOK) && (
          <Grid item xs={12}>
            <div style={{ fontSize: "20px", marginBottom: "12px" }}>
              Card Preview
            </div>
            <Grid item sm={12}>
              {type === journalTypes.ARTICLE && (
                <ArticleCard articleData={generateCardPayload()} show={true} />
              )}
              {type === journalTypes.BOOK && (
                <BookCard noteData={generateCardPayload()} show={true} />
              )}
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
  editNote: state.editor.editNote,
  indexList: state.notes.index,
  isLoadingEditNote: state.editor.isLoadingEditNote,
  isLoadingIndex: state.editor.isLoadingIndex,
  isProcessingArticle: state.editor.isProcessingArticle,
  isProcessingIndex: state.editor.isProcessingIndex,
  isUserSecured: !!state.auth.token,
});
const mapDispatchToProps = {
  clearEditNote: clearNote,
  requestNoteGet: getNote,
  requestNoteUpsert: upsertNote,
  updateArticleIndexList: upsertIndex,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditorSection);
