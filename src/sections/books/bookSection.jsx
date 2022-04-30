import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropType from "prop-types";
import { Button, FormControlLabel, Switch } from "@material-ui/core";
import RouteTitle from "../../components/routeTitle";
import { BookCard, BookTitleSection } from "../../components/displays/book";
import { NavIcon } from "../../components/navbar";
import { sortByCreatedDate as sortFunc } from "../../libs/sorts";
import {
  ArrowDropDown as DownArrow,
  ArrowDropUp as UpArrow,
} from "@material-ui/icons";
const styleButton = { margin: "12px" };
const styleHeader = { display: "inline-block", marginRight: "12px" };
const styleInline = { display: "inline-block" };
const textHideEntires = "Hide Entries";
const textShowEntries = "Show Entries";

const propTypes = {
  isLoading: PropType.bool,
  isUserSecured: PropType.bool,
  notes: PropType.array,
  pageTitle: PropType.string,
};
const BookSection = ({
  isLoading = false,
  isUserSecured = false,
  notes = [],
  pageTitle = "",
}) => {
  const history = useHistory();
  const [expandEntry, setExpandEntry] = useState({});
  const [meta, setMeta] = useState({});
  const [showEntry, setShowEntry] = useState(true);
  const [showResources, setShowResources] = useState(false);
  const [updatedNotesKeys, setUpdatedNotesKeys] = useState({});

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

  const handleClickCardBtn = (id, type = "") => {
    if (!!id && ["clone", "edit"].indexOf(type) > -1) {
      const search = `id=${id}`;
      const pathname = `/${type}`;
      history.push({ pathname, search });
    }
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
          <FormControlLabel
            control={
              <Switch
                checked={showEntry}
                color={"primary"}
                onChange={handleClickToggleDisplay}
              />
            }
            disabled={isLoading}
            label={`Showing ${showEntry ? "entries" : "resources"}`}
            style={{ padding: "2px" }}
          />
        </div>
      </section>
      {Object.keys(meta).map((bookId) => {
        const entries = meta[bookId].entryIds.length || 0;
        const isChild = entries > 1;
        return (
          <section key={bookId} style={{ paddingBottom: "6px" }}>
            <div style={{ display: "flex" }}>
              <div style={{ display: "inline-block", marginRight: "12px" }}>
                <div
                  style={{ display: "block", width: "72px" }}
                >{`Notes: ${entries}`}</div>
                <div style={{ display: "block" }}>
                  <NavIcon
                    icon={expandEntry[bookId] ? <UpArrow /> : <DownArrow />}
                    name={expandEntry[bookId] ? "expand" : "collapse"}
                    onClick={() => handleClickShowEntries(bookId)}
                  />
                </div>
              </div>
              <div style={{ display: "inline-block", overflowX: "hidden" }}>
                <BookTitleSection
                  author={meta[bookId].author}
                  bookDescription={meta[bookId].bookDescription}
                  bookSource={meta[bookId].bookSource}
                  pageCount={meta[bookId].pageCount}
                  publishDate={meta[bookId].publishDate}
                  publisher={meta[bookId].publisher}
                  title={meta[bookId].title}
                />
              </div>
            </div>
            {expandEntry[bookId] && showResources && (
              <ul>
                {meta[bookId].entryIds.map((id) => {
                  const data = notes.find((note) => {
                    return note.id === id;
                  });
                  return data.resources?.map((res, idx) => {
                    return <li key={res.id || idx}>{res.resource}</li>;
                  });
                })}
              </ul>
            )}
            {expandEntry[bookId] &&
              showEntry &&
              meta[bookId].entryIds.map((id) => {
                const data = notes.find((note) => {
                  return note.id === id;
                });
                return (
                  <Fragment key={id}>
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
                      onClickClone={() => handleClickCardBtn(id, "clone")}
                      onClickEdit={() => handleClickCardBtn(id, "edit")}
                    />
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
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BookSection);
