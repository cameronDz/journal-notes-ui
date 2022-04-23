import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import PropType from "prop-types";
import { Button } from "@material-ui/core";
import RouteTitle from "../../components/routeTitle";
import { BookCard, BookTitleSection } from "../../components/displays/book";
import StandardButton from "../../components/standardButton";
import { handleFunction } from "../../libs/eventUtil";
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
  notes: PropType.array,
  title: PropType.string,
};
const BookSection = ({
  getAllNotes = null,
  isLoading = false,
  notes = [],
  title = "",
}) => {
  const [meta, setMeta] = useState({});
  const [showEntry, setShowEntry] = useState({});

  useEffect(() => {
    return () => {
      abortCtrlFetchAll?.abort();
    };
  }, []);

  const handleClickLoadAll = () => {
    abortCtrlFetchAll = new AbortController();
    const config = { signal: abortCtrlFetchAll.signal };
    handleFunction(getAllNotes, config);
  };

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
              bookDescription,
              bookSource,
              id,
              pageCount,
              publisher,
            } = notes[idx];
            metaData[tempId] = {
              author,
              bookDescription,
              bookSource,
              entryIds: [id],
              id: tempId,
              pageCount,
              publisher,
              title,
            };
            open[tempId] = false;
          } else {
            metaData[existingId].entryIds.push(notes[idx].id);
          }
        }
      }
    }
    setMeta(metaData);
    setShowEntry(open);
  }, [notes]);

  const handleClickShowEntries = (id) => {
    const open = { ...showEntry };
    open[id] = !open[id];
    setShowEntry(open);
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
            {showEntry[tempBookId] &&
              meta[tempBookId].entryIds.map((id) => {
                const data = notes.find((note) => {
                  return note.id === id;
                });
                return (
                  <BookCard
                    key={id}
                    hasBorder={true}
                    isChild={isChild}
                    noteData={data}
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
  notes: state.notes.notes,
});
const mapDispatchToProps = { getAllNotes: fetchArticles };
export default connect(mapStateToProps, mapDispatchToProps)(BookSection);
