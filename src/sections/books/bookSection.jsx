import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import PropType from "prop-types";
import { Button } from "@material-ui/core";
import RouteTitle from "../../components/routeTitle";
import { BookCard, BookTitleSection } from "../../components/displays/book";
import StandardButton from "../../components/standardButton";
import { generateDateString } from "../../libs/date";
import { downloadJson } from "../../libs/download";
import { handleFunction } from "../../libs/eventUtil";
import { upsertNote } from "../../state/editor/actions";
import { fetchArticles } from "../../state/notes/actions";

const styleButton = { margin: "12px" };
const styleHeader = { display: "inline-block", marginRight: "12px" };
const styleInline = { display: "inline-block" };
const textAlignAllIds = "Align All Book IDs";
const textGenerateBookId = "Generate Book ID";
const textHideEntires = "Hide Entries";
const textShowEntries = "Show Entries";

const hasMisalignedIds = (meta, notes) => {
  let isMisaligned = false;
  const { length } = meta.entryIds;
  const metaId = meta.bookId;
  for (let idx = 0; idx < length; idx++) {
    const { bookId } = notes.find((note) => {
      return note.id === meta.entryIds[idx];
    });
    if (bookId !== metaId) {
      isMisaligned = true;
      break;
    }
  }
  return isMisaligned;
};

let abortCtrlFetchAll = null;
const propTypes = {
  getAllNotes: PropType.func,
  isLoading: PropType.bool,
  isUserSecured: PropType.bool,
  notes: PropType.array,
  requestNoteUpsert: PropType.func,
  title: PropType.string,
};
const BookSection = ({
  getAllNotes = null,
  isLoading = false,
  isUserSecured = false,
  notes = [],
  requestNoteUpsert = null,
  title = "",
}) => {
  const [meta, setMeta] = useState({});
  const [showEntry, setShowEntry] = useState({});
  const [updatedNotesKeys, setUpdatedNotesKeys] = useState({});

  useEffect(() => {
    return () => {
      abortCtrlFetchAll?.abort();
    };
  }, []);

  useEffect(() => {
    const metaData = {};
    const open = {};
    const length = notes?.length || 0;
    for (let idx = 0; idx < length; idx++) {
      if (notes?.[idx]?.journalType === "BOOK") {
        const title = notes[idx].title;
        if (title) {
          const existingId = Object.keys(metaData).find((datum) => {
            return metaData[datum].title === title;
          });
          if (!existingId) {
            const tempId = uuidv4();
            const {
              author,
              bookId,
              bookDescription,
              bookSource,
              id,
              pageCount,
              publisher,
            } = notes[idx];
            metaData[tempId] = {
              author,
              bookDescription,
              bookId,
              bookSource,
              entryIds: [id],
              id: tempId,
              pageCount,
              publisher,
              title,
            };
            open[tempId] = false;
          } else {
            const { bookId, id } = notes[idx];
            metaData[existingId].entryIds.push(id);
            if (!metaData[existingId].bookId && bookId) {
              metaData[existingId].bookId = bookId;
            }
          }
        }
      }
    }
    setMeta(metaData);
    setShowEntry(open);
  }, [notes]);

  const handleClickAlignAllBookId = (tempBookId) => {
    const { length } = meta[tempBookId].entryIds;
    for (let idx = 0; idx < length; idx++) {
      setTimeout(() => {
        handleClickAlignBookId(tempBookId, meta[tempBookId].entryIds[idx]);
      }, 350);
    }
  };

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

  const handleClickShowEntries = (id) => {
    const open = { ...showEntry };
    open[id] = !open[id];
    setShowEntry(open);
  };

  const handleClickLoadAll = () => {
    abortCtrlFetchAll = new AbortController();
    const config = { signal: abortCtrlFetchAll.signal };
    handleFunction(getAllNotes, config);
  };

  const handleClickGenerateId = (id) => {
    const clonedMeta = JSON.parse(JSON.stringify(meta));
    clonedMeta[id].bookId = uuidv4();
    setMeta(clonedMeta);
  };

  return (
    <div>
      <RouteTitle title={title} />
      <div>
        <h4 style={styleHeader}>{`Total Books:`}</h4>
        <span style={styleInline}>{Object.keys(meta).length || `0`}</span>
        <div style={{ ...styleInline, margin: 12 }}>
          <StandardButton
            disabled={isLoading}
            label="Load All"
            onClick={handleClickLoadAll}
          />
        </div>
      </div>
      {Object.keys(meta).map((tempBookId) => {
        const entries = meta[tempBookId].entryIds.length || 0;
        const isChild = entries > 1;
        return (
          <div key={tempBookId}>
            <BookTitleSection
              author={meta[tempBookId].author}
              bookDescription={meta[tempBookId].bookDescription}
              bookSource={meta[tempBookId].bookSource}
              pageCount={meta[tempBookId].pageCount}
              publishDate={meta[tempBookId].publishDate}
              publisher={meta[tempBookId].publisher}
              title={meta[tempBookId].title}
            />
            <Button
              onClick={() => handleClickShowEntries(tempBookId)}
              size="small"
              style={styleButton}
              variant="outlined"
            >
              {showEntry[tempBookId] ? textHideEntires : textShowEntries}
              {`: ${entries}`}
            </Button>
            {isUserSecured && !meta[tempBookId].bookId && (
              <Button
                onClick={() => handleClickGenerateId(tempBookId)}
                size="small"
                style={styleButton}
                variant="outlined"
              >
                {textGenerateBookId}
              </Button>
            )}
            {isUserSecured &&
              meta[tempBookId].bookId &&
              hasMisalignedIds(meta[tempBookId], notes) && (
                <Button
                  onClick={() => handleClickAlignAllBookId(tempBookId)}
                  size="small"
                  style={styleButton}
                  variant="outlined"
                >
                  {textAlignAllIds}
                </Button>
              )}
            {showEntry[tempBookId] &&
              meta[tempBookId].entryIds.map((id) => {
                const data = notes.find((note) => {
                  return note.id === id;
                });
                return (
                  <BookCard
                    key={id}
                    hasBorder={true}
                    isButtonMisc={
                      !updatedNotesKeys[id] &&
                      isUserSecured &&
                      meta[tempBookId].bookId &&
                      data.bookId !== meta[tempBookId].bookId
                    }
                    isChild={isChild}
                    noteData={data}
                    onClickBookId={() => handleClickAlignBookId(tempBookId, id)}
                  />
                );
              })}
          </div>
        );
      })}
    </div>
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
