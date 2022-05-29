import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import PropType from "prop-types";
import { parse } from "query-string";
import { connect } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ArticleCard } from "../../components/displays/article";
import { BookCard } from "../../components/displays/book";
import RouteTitle from "../../components/routeTitle";
import StandardButton from "../../components/standardButton";
import JournalForm from "./journalForm";
import JournalFormRadioSelect from "./journalFormRadioSelect";
import { generateDateString } from "../../libs/date";
import {
  defaultEmptyString,
  defaultEventEmptyString,
  defaultUniqueArray,
} from "../../libs/defaults";
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
import { generateTimeString } from "../../libs/time";

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
const buttonTitleReset = "Clear note inputs";
const buttonTitleUpload = "Save note";

const cloneKey = "/clone?id";
const editKey = "/edit?id";

let abortCtrlIndexUpsert = null;
let abortCtrlNoteGet = null;
let abortCtrlNoteUpsert = null;

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
    return () => {
      abortCtrlNoteGet?.abort();
      abortCtrlNoteUpsert?.abort();
      abortCtrlIndexUpsert?.abort();
    };
  }, []);

  useEffect(() => {
    if (!!editNote && typeof editNote === "object") {
      setType(editNote.journalType);
      if (cloneId) {
        const cloneValues = {
          author: defaultEmptyString(editNote.author),
          bookDescription: defaultEmptyString(editNote.bookDescription),
          bookId: defaultEmptyString(editNote.bookId),
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
    if (isUserSecured && !!id) {
      abortCtrlNoteGet?.abort();
      abortCtrlNoteGet = new AbortController();
      requestNoteGet(id, { signal: abortCtrlNoteGet.signal });
    }
  }, [cloneId, editId, isUserSecured, requestNoteGet]);

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
    if (!!cloneId || !!editId) {
      setCloneId("");
      setEditId("");
      const pathname = "/create";
      history.push({ pathname });
    }
  };

  const fireIndexUpdate = () => {
    if (values?.id) {
      if (isNew) {
        abortCtrlIndexUpsert?.abort();
        abortCtrlIndexUpsert = new AbortController();
        const config = { signal: abortCtrlIndexUpsert.signal };
        updateArticleIndexList(values.id, config);
      }
      setHasStartedUpsert(true);
    }
  };

  const handleClearClick = () => {
    clearForm();
  };

  const handleUploadClick = () => {
    const payload = generateCardPayload();
    downloadJson(payload, values?.id || "data");
    fireIndexUpdate();
    abortCtrlNoteUpsert?.abort();
    abortCtrlNoteUpsert = new AbortController();
    const config = { signal: abortCtrlNoteUpsert.signal };
    requestNoteUpsert(payload, isNew, config);
  };

  const generateCardPayload = () => {
    const payload = { ...(values || {}) };
    if (!isNew) {
      payload.updatedDate = generateDateString();
      payload.updatedTime = generateTimeString();
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
    const newType = defaultEventEmptyString(event);
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
        <Alert severity="error">
          Must log in with user credentials in order to create journal notes.
        </Alert>
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
            label="Save"
            onClick={handleUploadClick}
            title={buttonTitleUpload}
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
