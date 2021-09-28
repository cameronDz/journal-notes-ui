import React, { useCallback, useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropType from "prop-types";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FilterSortOrder, FilterTagSelector } from "../../components/filters";
import ArticleCard from "../../components/displays/articleCard";
import RouteTitle from "../../components/routeTitle";
import { articleGridStyles } from "./styles";
import * as _sorts from "../../../libs/articleSorts";

const propTypes = {
  articles: PropType.array,
  articlesLoading: PropType.number,
  loadingIndex: PropType.bool,
  pageName: PropType.string,
  title: PropType.string,
};
const useStyles = makeStyles(() => articleGridStyles);
const ArticleSection = ({
  articles,
  articlesLoading,
  loadingIndex,
  pageName,
  title,
}) => {
  const classes = useStyles();
  const [sortFunction, setSortFunction] = useState(() => _sorts.sortByTitle);
  const [isLoading, setIsLoading] = useState(false);

  const [availableTags, setAvailableTags] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [currentAvailableFilterTag, setCurrentAvailableFilterTag] = useState(
    []
  );
  const [currentSelectedFilterTag, setCurrentSelectedFilterTag] = useState([]);

  const [orderType, setOrderType] = useState("title");
  const [checkedTitle, setCheckedTitle] = useState(true);
  const [checkedPublishDate, setCheckedPublishDate] = useState(true);
  const [checkedCreatedDate, setCheckedCreatedDate] = useState(true);

  useEffect(() => {
    if (!articlesLoading) {
      setFilterTags([]);
      collectTagList();
    }
  }, [articlesLoading, collectTagList]);

  useEffect(() => {
    setIsLoading(!!loadingIndex || articlesLoading > 0);
  }, [articlesLoading, loadingIndex]);

  useEffect(() => {
    if (orderType) {
      let newSort = null;
      if (orderType === "title") {
        newSort = checkedTitle ? _sorts.sortByTitle : _sorts.sortByReverseTitle;
      } else if (orderType === "createdDate") {
        newSort = checkedCreatedDate
          ? _sorts.sortByCreatedDate
          : _sorts.sortByReverseCreatedDate;
      } else if (orderType === "publishDate") {
        newSort = checkedPublishDate
          ? _sorts.sortByPublishDate
          : _sorts.sortByReversePublishDate;
      }
      setSortFunction(() => newSort);
    }
  }, [orderType, checkedCreatedDate, checkedPublishDate, checkedTitle]);

  const collectTagList = useCallback(() => {
    const tags = [];
    const length = Array.isArray(articles) ? articles.length : 0;
    for (let idx = 0; idx < length; idx++) {
      if (!!articles[idx] && Array.isArray(articles[idx].tags)) {
        tags.push(...articles[idx].tags);
      }
    }
    setAvailableTags([...new Set(tags)].sort());
  }, [articles]);

  const isArticleDisplayable = (article = null) => {
    return (
      !!article &&
      !!article.title &&
      !!(
        (!!article.comments && !!article.comments.length) ||
        (!!article.quotes && !!article.quotes.length)
      )
    );
  };

  const filterFunction = (article) => {
    let isPassingFilter = !!article;
    if (
      !!isPassingFilter &&
      Array.isArray(filterTags) &&
      filterTags.length !== 0
    ) {
      if (Array.isArray(article.tags)) {
        const { length } = filterTags;
        for (let idx = 0; idx < length; idx++) {
          if (
            !!filterTags[idx] &&
            article.tags.indexOf(filterTags[idx]) === -1
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
    setOrderType(newType);
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
    setCurrentAvailableFilterTag([value || ""]);
  };

  const handleChangeSelectFilter = (value) => {
    setCurrentSelectedFilterTag([value || ""]);
  };

  const handleClickAddCurrentAvailableFilter = () => {
    if (!!currentAvailableFilterTag && !!currentAvailableFilterTag[0]) {
      const filters = [...filterTags, currentAvailableFilterTag[0]];
      setFilterTags([...new Set(filters)].sort());
      setCurrentAvailableFilterTag([]);
    }
  };

  const handleClickRemoveCurrentSelectedFilter = () => {
    if (!!currentSelectedFilterTag && !!currentSelectedFilterTag[0]) {
      setFilterTags([
        ...filterTags.filter((tag) => tag !== currentSelectedFilterTag[0]),
      ]);
      setCurrentSelectedFilterTag([]);
    }
  };

  const renderData = () => {
    const isView = pageName === "view";
    const md = isView ? 12 : 6;
    const minHeight = isView ? "120px" : null;
    return (
      !isLoading &&
      Array.isArray(articles) &&
      articles
        .filter(filterFunction)
        .sort(sortFunction)
        .map((key, index) => {
          return (
            !!isArticleDisplayable(key) && (
              <Fragment key={key.id || index}>
                {
                  <Grid item sm={12} md={md}>
                    <ArticleCard articleData={key} minHeight={minHeight} />
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
    ? classes?.filterLoadingWrapper
    : classes?.filterLoadedWrapper;
  return (
    <Fragment>
      <RouteTitle title={title} />
      <Grid container spacing={0}>
        {pageName !== "view" && (
          <Grid
            className={classNames(classes?.filterGridWrapper, loadingClass)}
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
                  availableTags={availableTags}
                  currentAvailableFilterTag={currentAvailableFilterTag}
                  currentSelectedFilterTag={currentSelectedFilterTag}
                  filterTags={filterTags}
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

ArticleSection.propTypes = propTypes;
const mapStateToProps = (state) => ({
  articles: state.articles.list,
  articlesLoading: state.articles.articlesLoading,
  loadingIndex: state.articles.isLoadingIndex,
});
export default connect(mapStateToProps, null)(ArticleSection);
