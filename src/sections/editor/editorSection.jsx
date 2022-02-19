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
import { defaultEmptyString, defaultUniqueArray } from "../../libs/defaults";
import { downloadJson } from "../../libs/download";
import { generateFormValues } from "../../libs/generateFormValues";
import { journalForms, journalTypes } from "../../libs/types";
import {
  clearNote,
  getNote,
  upsertNote,
  upsertIndex,
} from "../../state/editor/actions";
import { editorSectionStyles as styles } from "./styles";

const propTypes = {
  clearEditNote: PropType.func,
  editNote: PropType.object,
  isLoadingNote: PropType.bool,
  isLoadingIndex: PropType.bool,
  isNew: PropType.bool,
  isProcessingNote: PropType.bool,
  isProcessingIndex: PropType.bool,
  isUserSecured: PropType.bool,
  pageTitle: PropType.string,
  requestNoteGet: PropType.func,
  requestNoteUpsert: PropType.func,
  updateArticleIndexList: PropType.func,
};

const availableTypes = Object.values(journalTypes);
const buttonTitleDownload = "Download article notes in JSON format";
const buttonTitleReset = "Clear input of article notes";
const buttonTitleUpload = "Upload article notes to S3";

const cloneKey = "/clone?id";
const editKey = "/edit?id";

const useStyles = makeStyles(() => styles);
const EditorSection = ({
  clearEditNote,
  editNote,
  isLoadingNote,
  isLoadingIndex,
  isNew = true,
  isProcessingNote,
  isProcessingIndex,
  isUserSecured,
  pageTitle,
  requestNoteGet,
  requestNoteUpsert,
  updateArticleIndexList,
}) => {
  const history = useHistory();
  const [cloneId, setCloneId] = useState("");
  const [editId, setEditId] = useState("");
  const [editValues, setEditValues] = useState(null);
  const [hasStartedUpsert, setHasStartedUpsert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reloadInputs, setReloadInputs] = useState(false);
  const [reloadValues, setReloadValues] = useState(false);
  const [type, setType] = useState(journalTypes.ARTICLE);
  const [values, setValues] = useState({});

  useEffect(() => {
    const parsedHash = parse(location?.hash);
    if (parsedHash?.[editKey]) {
      setEditId(parsedHash?.[editKey]);
    } else if (parsedHash?.[cloneKey]) {
      setCloneId(parsedHash?.[cloneKey]);
    }
  }, []);

  useEffect(() => {
    if (!!editNote && typeof editNote === "object") {
      setType(editNote.journalType);
      if (!!cloneId) {
        const cloneValues = {
          author: defaultEmptyString(editNote.author),
          bookDescription: defaultEmptyString(editNote.bookDescription),
          bookSource: defaultEmptyString(editNote.bookSource),
          journalType: defaultEmptyString(editNote.journalType),
          pageCount: defaultEmptyString(editNote.pageCount),
          publishDate: defaultEmptyString(editNote.publishDate),
          publisher: defaultEmptyString(editNote.publisher),
          tags: defaultUniqueArray(editNote.tags),
          title: defaultEmptyString(editNote.title),
          _version: defaultEmptyString(editNote._version),
        };
        const cloneInputs = journalForms?.[editNote.journalType]?.inputs || {};
        const clonedNote = generateFormValues(cloneInputs, cloneValues);
        setEditValues(clonedNote);
      } else {
        setEditValues({ ...editNote });
      }
      setReloadValues(true);
      setTimeout(() => {
        setEditValues(null);
        clearEditNote();
      });
    }
  }, [clearEditNote, cloneId, editNote]);

  useEffect(() => {
    const id = editId || cloneId;
    if (!isNew && isUserSecured && !!id) {
      requestNoteGet(id);
    }
  }, [cloneId, editId, isNew, isUserSecured, requestNoteGet]);

  useEffect(() => {
    const isLoad = isLoadingNote || isLoadingIndex;
    const isProc = isProcessingNote || isProcessingIndex;
    setIsProcessing(isLoad || isProc);
  }, [isLoadingNote, isLoadingIndex, isProcessingNote, isProcessingIndex]);

  useEffect(() => {
    setIsDisabled(isProcessing || !isUserSecured);
  }, [isProcessing, isUserSecured]);

  useEffect(() => {
    if (hasStartedUpsert && !isProcessingIndex && !isProcessingNote) {
      clearForm();
      setHasStartedUpsert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStartedUpsert, isProcessingNote, isProcessingIndex]);

  const clearForm = () => {
    setValues(null);
    setIsDirty(false);
    if (!isNew) {
      const pathname = "/create";
      history.push({ pathname });
    }
  };

  const fireIndexUpdate = () => {
    if (!!values?.id) {
      if (isNew) {
        updateArticleIndexList(values.id);
      }
      setHasStartedUpsert(true);
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
    const payload = { ...(values || {}) };
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

  const handleChangeType = (event) => {
    const newType = event?.target?.value || "";
    setType(newType);
    setReloadInputs(true);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <RouteTitle title={pageTitle} />
      <div className={classes.radioContainer}>
        <JournalFormRadioSelect
          availableTypes={availableTypes}
          currentType={type}
          isDisabled={isDirty && isNew}
          onTypeChange={handleChangeType}
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
        reloadInputs={reloadInputs}
        reloadValues={reloadValues}
        setReloadInputs={setReloadInputs}
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
  editNote: state.editor.note,
  isLoadingNote: state.editor.isLoadingNote,
  isLoadingIndex: state.editor.isLoadingIndex,
  isProcessingNote: state.editor.isProcessingNote,
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
