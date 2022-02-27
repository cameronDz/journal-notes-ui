import React, { useCallback, useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import PropType from "prop-types";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FilterSortOrder, FilterTagSelector } from "../../components/filters";
import { ArticleCard } from "../../components/displays/article";
import { BookCard } from "../../components/displays/book";
import RouteTitle from "../../components/routeTitle";
import { notesGridStyles as styles } from "./styles";
import { generateTagsFromList } from "../../libs/generateTagList";
import { journalTypes } from "../../libs/types";
import * as _sorts from "../../libs/sorts";

const orderTypes = {
  createdDate: "createdDate",
  publishedDate: "publishedDate",
  title: "title",
};

const propTypes = {
  notes: PropType.array,
  isLoadingIndex: PropType.bool,
  isLoadingNotes: PropType.bool,
  isUserSecured: PropType.bool,
  pageName: PropType.string,
  title: PropType.string,
};
const useStyles = makeStyles(() => styles);
const DisplayAllSection = ({
  notes = null,
  isLoadingIndex = false,
  isLoadingNotes = false,
  isUserSecured = false,
  pageName = "",
  title = "",
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [checkedCreatedDate, setCheckedCreatedDate] = useState(true);
  const [checkedPublishDate, setCheckedPublishDate] = useState(true);
  const [checkedTitle, setCheckedTitle] = useState(true);
  const [filterTagAvailable, setFilterTagAvailable] = useState([]);
  const [filterTagSelected, setFilterTagSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderType, setOrderType] = useState(orderTypes.createdDate);
  const [sortFunc, setSortFunc] = useState(() => _sorts.sortByCreatedDate);
  const [tagsAvailable, setTagsAvailable] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);

  useEffect(() => {
    if (!isLoadingNotes) {
      setTagsFilter([]);
      collectTagList();
    }
  }, [isLoadingNotes, collectTagList]);

  useEffect(() => {
    setIsLoading(!!isLoadingIndex || isLoadingNotes);
  }, [isLoadingIndex, isLoadingNotes]);

  useEffect(() => {
    if (orderType) {
      let newSort = null;
      if (orderType === orderTypes.title) {
        newSort = checkedTitle ? _sorts.sortByTitle : _sorts.sortByReverseTitle;
      } else if (orderType === orderTypes.createdDate) {
        newSort = checkedCreatedDate
          ? _sorts.sortByCreatedDate
          : _sorts.sortByReverseCreatedDate;
      } else if (orderType === orderTypes.publishDate) {
        newSort = checkedPublishDate
          ? _sorts.sortByPublishDate
          : _sorts.sortByReversePublishDate;
      }
      setSortFunc(() => newSort);
    }
  }, [orderType, checkedCreatedDate, checkedPublishDate, checkedTitle]);

  const collectTagList = useCallback(() => {
    const tags = generateTagsFromList(notes);
    setTagsAvailable(tags);
  }, [notes]);

  const isArticleDisplayable = (article = null) => {
    return !!article?.comments?.length > 0 || !!article?.quotes?.length > 0;
  };

  const filterFunction = (article) => {
    let isPassingFilter = !!article;
    if (
      !!isPassingFilter &&
      Array.isArray(tagsFilter) &&
      tagsFilter.length !== 0
    ) {
      if (Array.isArray(article.tags)) {
        const { length } = tagsFilter;
        for (let idx = 0; idx < length; idx++) {
          if (
            !!tagsFilter[idx] &&
            article.tags.indexOf(tagsFilter[idx]) === -1
          ) {
            isPassingFilter = false;
            break;
          }
        }
      } else {
        isPassingFilter = false;
      }
    }
    return isPassingFilter;
  };

  const handleChangeOrderType = (event = {}) => {
    const newType = event?.target?.value || "title";
    setOrderType(orderTypes[newType]);
  };

  const handleChangeChecked = (value = "") => {
    if (value === "checkedTitle") {
      setCheckedTitle(!checkedTitle);
    } else if (value === "checkedCreatedDate") {
      setCheckedCreatedDate(!checkedCreatedDate);
    } else if (value === "checkedPublishDate") {
      setCheckedPublishDate(!checkedPublishDate);
    }
  };

  const handleChangeAvailableFilter = (value) => {
    setFilterTagAvailable([value || ""]);
  };

  const handleChangeSelectFilter = (value) => {
    setFilterTagSelected([value || ""]);
  };

  const handleClickAddCurrentAvailableFilter = () => {
    if (!!filterTagAvailable && !!filterTagAvailable[0]) {
      const filters = [...tagsFilter, filterTagAvailable[0]];
      setTagsFilter([...new Set(filters)].sort());
      setFilterTagAvailable([]);
    }
  };

  const handleClickEditNote = (note) => {
    const id = note?.id || "";
    if (id) {
      const pathname = "/edit";
      const search = `id=${id}`;
      history.push({ pathname, search });
    } else {
      console.error("ERROR - UNABLE TO ENTER EDIT MODE");
    }
  };

  const handleClickCloneNote = (note) => {
    const id = note?.id || "";
    if (id) {
      const pathname = "/clone";
      const search = `id=${id}`;
      history.push({ pathname, search });
    } else {
      console.error("ERROR - UNABLE TO ENTER CLONE MODE");
    }
  };

  const handleClickRemoveCurrentSelectedFilter = () => {
    if (!!filterTagSelected && !!filterTagSelected[0]) {
      setTagsFilter([
        ...tagsFilter.filter((tag) => tag !== filterTagSelected[0]),
      ]);
      setFilterTagSelected([]);
    }
  };

  const renderData = () => {
    const isView = pageName === "view";
    const md = isView ? 12 : 6;
    const minHeight = isView ? "120px" : null;
    return (
      !isLoading &&
      Array.isArray(notes) &&
      notes
        .filter(filterFunction)
        .sort(sortFunc)
        .map((note, index) => {
          return (
            !!isArticleDisplayable(note) && (
              <Fragment key={note.id || index}>
                {
                  <Grid item sm={12} md={md}>
                    {note.journalType === journalTypes.BOOK && (
                      <BookCard
                        isClonable={isUserSecured}
                        isEditable={isUserSecured}
                        minHeight={minHeight}
                        noteData={note}
                        onClickClone={() => handleClickCloneNote(note)}
                        onClickEdit={() => handleClickEditNote(note)}
                      />
                    )}
                    {note.journalType !== journalTypes.BOOK && (
                      <ArticleCard
                        articleData={note}
                        isEditable={isUserSecured}
                        minHeight={minHeight}
                        onClickEdit={() => handleClickEditNote(note)}
                      />
                    )}
                  </Grid>
                }
              </Fragment>
            )
          );
        })
    );
  };

  const handleTagButtonClick = (name) => {
    if (name === "add") {
      handleClickAddCurrentAvailableFilter();
    } else if (name === "remove") {
      handleClickRemoveCurrentSelectedFilter();
    }
  };

  const handleTagSelectChange = (value, name) => {
    if (name === "add") {
      handleChangeAvailableFilter(value);
    } else if (name === "remove") {
      handleChangeSelectFilter(value);
    }
  };

  const loadingClass = isLoading
    ? classes.filterLoadingWrapper
    : classes.filterLoadedWrapper;
  return (
    <Fragment>
      <RouteTitle title={title} />
      <Grid container spacing={0}>
        {pageName !== "view" && (
          <Grid
            className={classNames(classes.filterGridWrapper, loadingClass)}
            item
            sm={12}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={5}>
                <FilterSortOrder
                  checkedCreatedDate={checkedCreatedDate}
                  checkedPublishDate={checkedPublishDate}
                  checkedTitle={checkedTitle}
                  isLoading={isLoading}
                  onOrderChange={handleChangeChecked}
                  onTypeChange={handleChangeOrderType}
                  orderType={orderType}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={7}>
                <FilterTagSelector
                  tagsAvailable={tagsAvailable}
                  filterTagAvailable={filterTagAvailable}
                  filterTagSelected={filterTagSelected}
                  tagsFilter={tagsFilter}
                  onButtonClick={handleTagButtonClick}
                  onSelectChange={handleTagSelectChange}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {renderData()}
      </Grid>
    </Fragment>
  );
};

DisplayAllSection.propTypes = propTypes;
const mapStateToProps = (state) => ({
  notes: state.notes.notes,
  isLoadingIndex: state.notes.isLoadingIndex,
  isLoadingNotes: state.notes.isLoadingNotes,
  isUserSecured: !!state.auth.token,
});
export default connect(mapStateToProps, null)(DisplayAllSection);
