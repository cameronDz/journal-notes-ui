import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PropType from "prop-types";
import { Button } from "@material-ui/core";
import RouteTitle from "../../components/routeTitle";
import { BookCard, BookTitleSection } from "../../components/displays/book";
import StandardButton from "../../components/standardButton";
import { generateDateString } from "../../libs/date";
import { downloadJson } from "../../libs/download";
import { handleFunction } from "../../libs/eventUtil";
import { sortByCreatedDate as sortFunc } from "../../libs/sorts";
import { upsertNote } from "../../state/editor/actions";
import { fetchArticles } from "../../state/notes/actions";

const styleButton = { margin: "12px" };
const styleHeader = { display: "inline-block", marginRight: "12px" };
const styleInline = { display: "inline-block" };
const textHideEntires = "Hide Entries";
const textShowEntries = "Show Entries";

let abortCtrlFetchAll = null;
const propTypes = {
  getAllNotes: PropType.func,
  isLoading: PropType.bool,
  isUserSecured: PropType.bool,
  notes: PropType.array,
  pageTitle: PropType.string,
  requestNoteUpsert: PropType.func,
};
const BookSection = ({
  getAllNotes = null,
  isLoading = false,
  isUserSecured = false,
  notes = [],
  pageTitle = "",
  requestNoteUpsert = null,
}) => {
  const history = useHistory();
  const [expandEntry, setExpandEntry] = useState({});
  const [meta, setMeta] = useState({});
  const [showEntry, setShowEntry] = useState(true);
  const [showResources, setShowResources] = useState(false);
  const [updatedNotesKeys, setUpdatedNotesKeys] = useState({});

  useEffect(() => {
    return () => {
      abortCtrlFetchAll?.abort();
    };
  }, []);

  useEffect(() => {
    const clonedNotes = JSON.parse(JSON.stringify(notes || [])).sort(sortFunc);
    const metaData = {};
    const open = {};
    const length = clonedNotes?.length || 0;
    for (let idx = 0; idx < length; idx++) {
      if (clonedNotes[idx].journalType === "BOOK") {
        const {
          author,
          bookId,
          bookDescription,
          bookSource,
          id,
          pageCount,
          publisher,
          title,
        } = clonedNotes[idx];
        if (bookId) {
          if (!metaData[bookId]) {
            metaData[bookId] = {
              author,
              bookDescription,
              bookId,
              bookSource,
              entryIds: [],
              id: bookId,
              pageCount,
              publisher,
              title,
            };
            open[bookId] = false;
          }
          metaData[bookId].entryIds.push(id);
        }
      }
    }
    setMeta(metaData);
    setExpandEntry(open);
  }, [notes]);

  const handleClickAlignBookId = (tempBookId, noteId) => {
    const aligningNote = notes.find((note) => {
      return note.id === noteId;
    });
    aligningNote.bookId = meta[tempBookId].bookId;
    aligningNote.updatedDate = generateDateString();
    downloadJson(aligningNote, aligningNote.id || "data");
    requestNoteUpsert(aligningNote, false);
    setUpdatedNotesKeys((prev) => {
      return { ...prev, [noteId]: true };
    });
  };

  const handleClickCardBtn = (id, type = "") => {
    if (!!id && ["clone", "edit"].indexOf(type) > -1) {
      const search = `id=${id}`;
      const pathname = `/${type}`;
      history.push({ pathname, search });
    }
  };

  const handleClickGenerateId = (id) => {
    const clonedMeta = JSON.parse(JSON.stringify(meta));
    clonedMeta[id].bookId = uuidv4();
    setMeta(clonedMeta);
  };

  const handleClickLoadAll = () => {
    abortCtrlFetchAll = new AbortController();
    const config = { signal: abortCtrlFetchAll.signal };
    handleFunction(getAllNotes, config);
  };

  const handleClickShowEntries = (id) => {
    const open = { ...expandEntry };
    open[id] = !open[id];
    setExpandEntry(open);
  };

  const handleClickToggleDisplay = () => {
    setShowEntry((prev) => !prev);
    setShowResources((prev) => !prev);
  };

  return (
    <section>
      <RouteTitle title={pageTitle} />
      <section>
        <h4 style={styleHeader}>{`Total Books:`}</h4>
        <span style={styleInline}>{Object.keys(meta).length || `0`}</span>
        <div style={{ ...styleInline, margin: 12 }}>
          <StandardButton
            disabled={isLoading}
            label="Load All"
            onClick={handleClickLoadAll}
          />
        </div>
        <div style={{ ...styleInline, margin: 12 }}>
          <StandardButton
            disabled={isLoading}
            label="Toggle Display"
            onClick={handleClickToggleDisplay}
          />
        </div>
      </section>
      {Object.keys(meta).map((bookId) => {
        const entries = meta[bookId].entryIds.length || 0;
        const isChild = entries > 1;
        return (
          <section key={bookId}>
            <BookTitleSection
              author={meta[bookId].author}
              bookDescription={meta[bookId].bookDescription}
              bookSource={meta[bookId].bookSource}
              pageCount={meta[bookId].pageCount}
              publishDate={meta[bookId].publishDate}
              publisher={meta[bookId].publisher}
              title={meta[bookId].title}
            />
            <Button
              onClick={() => handleClickShowEntries(bookId)}
              size="small"
              style={styleButton}
              variant="outlined"
            >
              {expandEntry[bookId] ? textHideEntires : textShowEntries}
              {`: ${entries}`}
            </Button>
            {expandEntry[bookId] &&
              meta[bookId].entryIds.map((id) => {
                const data = notes.find((note) => {
                  return note.id === id;
                });
                return (
                  <Fragment key={id}>
                    {showEntry && (
                      <BookCard
                        hasBorder={true}
                        isButtonMisc={
                          !updatedNotesKeys[id] &&
                          isUserSecured &&
                          data.bookId !== meta[bookId].bookId
                        }
                        isChild={isChild}
                        isClonable={isUserSecured}
                        isEditable={isUserSecured}
                        noteData={data}
                        onClickBookId={() => handleClickAlignBookId(bookId, id)}
                        onClickClone={() => handleClickCardBtn(id, "clone")}
                        onClickEdit={() => handleClickCardBtn(id, "edit")}
                      />
                    )}
                    {showResources && (
                      <ul>
                        {data.resources?.map((res, idx) => {
                          return <li key={res.id || idx}>{res.resource}</li>;
                        })}
                      </ul>
                    )}
                  </Fragment>
                );
              })}
          </section>
        );
      })}
    </section>
  );
};

BookSection.propTypes = propTypes;
const mapStateToProps = (state) => ({
  isLoading: !!state.notes.isLoadingIndex || !!state.notes.isLoadingNotes,
  isUserSecured: !!state.auth.token,
  notes: state.notes.notes,
});
const mapDispatchToProps = {
  getAllNotes: fetchArticles,
  requestNoteUpsert: upsertNote,
};
export default connect(mapStateToProps, mapDispatchToProps)(BookSection);
