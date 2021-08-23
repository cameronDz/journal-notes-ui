import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import get from "lodash.get";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";

import Card from "../../card";
import { fetchArticles } from "./state/actions";
import * as _sorts from "../../../libs/articleSorts";

const propTypes = {
  articles: PropType.array,
  articlesLoading: PropType.number,
  fetchArticles: PropType.func,
  loadingIndex: PropType.bool,
};

const articles = ({
  articles,
  articlesLoading,
  fetchArticles,
  loadingIndex,
}) => {
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
    fetchArticles();
  }, []);

  useEffect(() => {
    if (!articlesLoading) {
      setFilterTags([]);
      collectTagList();
    }
  }, [articlesLoading]);

  useEffect(() => {
    setIsLoading(!!loadingIndex || articlesLoading > 0);
  }, [articlesLoading, loadingIndex]);

  useEffect(() => {
    detemineSortOrder();
  }, [orderType, checkedCreatedDate, checkedPublishDate, checkedTitle]);

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

  const collectTagList = () => {
    const tags = [];
    const length = Array.isArray(articles) ? articles.length : 0;
    for (let idx = 0; idx < length; idx++) {
      if (!!articles[idx] && Array.isArray(articles[idx].tags)) {
        tags.push(...articles[idx].tags);
      }
    }
    setAvailableTags([...new Set(tags)].sort());
  };

  const detemineSortOrder = () => {
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
    const newType = get(event, "target.value", "title");
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

  const handleChangeAvailableFilter = (event) => {
    const tag = get(event, "target.value", "");
    setCurrentAvailableFilterTag([tag]);
  };

  const handleChangeSelectFilter = (event) => {
    const tag = get(event, "target.value", "");
    setCurrentSelectedFilterTag([tag]);
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
    return (
      !isLoading &&
      Array.isArray(articles) &&
      articles
        .filter(filterFunction)
        .sort(sortFunction)
        .map((key, index) => {
          return (
            !!isArticleDisplayable(key) && (
              <Grid key={index} item sm={12} md={6}>
                <Card articleData={key} />
              </Grid>
            )
          );
        })
    );
  };

  const getSwitch = (keyName = "", checkName = "", checkValue = false) => {
    return (
      !!keyName &&
      !!checkName && (
        <Switch
          checked={orderType === keyName && checkValue}
          color={"primary"}
          disabled={orderType !== keyName}
          onChange={() => handleChangeChecked(checkName)}
          value={checkName}
        />
      )
    );
  };

  const displayTagOptions = () => {
    return (
      Array.isArray(availableTags) &&
      availableTags.map((tag) => {
        return (
          filterTags.indexOf(tag) === -1 && (
            <option key={tag} value={tag}>
              {tag}
            </option>
          )
        );
      })
    );
  };

  return (
    <Fragment>
      <Grid container spacing={0}>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            textAlign: "center",
            width: "100%",
          }}
        >
          Articles List
        </div>
        <Grid
          item
          style={{
            border: "3px solid " + (isLoading ? "#767676" : "#3f51b5"),
            borderRadius: "8px",
            margin: "8px 24px",
            padding: "12px",
          }}
          sm={12}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={5}>
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                Sort Order
              </div>
              <FormControl>
                <RadioGroup
                  name={"orderType"}
                  style={{ marginRight: "16px" }}
                  title={"Order Type"}
                  value={orderType}
                  onChange={handleChangeOrderType}
                >
                  <FormControlLabel
                    control={<Radio color={"primary"} />}
                    disabled={isLoading}
                    label={"Title"}
                    value={"title"}
                  />
                  <FormControlLabel
                    control={<Radio color={"primary"} />}
                    disabled={isLoading}
                    label={"Created Date"}
                    value={"createdDate"}
                  />
                  <FormControlLabel
                    control={<Radio color={"primary"} />}
                    disabled={isLoading}
                    label={"Publish Date"}
                    value={"publishDate"}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={getSwitch("title", "checkedTitle", checkedTitle)}
                  disabled={isLoading || orderType !== "title"}
                  label={
                    orderType !== "title"
                      ? ""
                      : checkedTitle
                      ? "Ascending"
                      : "Desending"
                  }
                  style={{ padding: "2px" }}
                />
                <FormControlLabel
                  control={getSwitch(
                    "createdDate",
                    "checkedCreatedDate",
                    checkedCreatedDate
                  )}
                  disabled={isLoading || orderType !== "createdDate"}
                  label={
                    orderType !== "createdDate"
                      ? ""
                      : checkedCreatedDate
                      ? "Ascending"
                      : "Desending"
                  }
                  style={{ padding: "2px" }}
                />
                <FormControlLabel
                  control={getSwitch(
                    "publishDate",
                    "checkedPublishDate",
                    checkedPublishDate
                  )}
                  disabled={isLoading || orderType !== "publishDate"}
                  label={
                    orderType !== "publishDate"
                      ? ""
                      : checkedPublishDate
                      ? "Ascending"
                      : "Desending"
                  }
                  style={{ padding: "2px" }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                Tag Filters
              </div>
              <FormControl style={{ minWidth: "224px", marginRight: "12px" }}>
                <InputLabel shrink htmlFor="available-tag-filters">
                  Available Tags
                </InputLabel>
                <Select
                  inputProps={{ id: "available-tag-filters" }}
                  multiple
                  native
                  onChange={handleChangeAvailableFilter}
                  style={{ maxHeight: "120px", minHeight: "120px" }}
                  value={currentAvailableFilterTag}
                >
                  {displayTagOptions()}
                </Select>
                <Button
                  color="primary"
                  disabled={
                    !currentAvailableFilterTag ||
                    currentAvailableFilterTag.length === 0
                  }
                  onClick={handleClickAddCurrentAvailableFilter}
                  style={{ marginTop: "8px", minWidth: "120px" }}
                  variant="outlined"
                >
                  Add Filter
                </Button>
              </FormControl>

              <FormControl style={{ minWidth: "224px" }}>
                <InputLabel shrink htmlFor="current-tag-filters">
                  Current Filters
                </InputLabel>
                <Select
                  inputProps={{ id: "current-tag-filters" }}
                  multiple
                  native
                  onChange={handleChangeSelectFilter}
                  style={{ maxHeight: "120px", minHeight: "120px" }}
                  value={currentSelectedFilterTag}
                >
                  {Array.isArray(filterTags) &&
                    filterTags.map((tag) => {
                      return (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      );
                    })}
                </Select>
                <Button
                  color="primary"
                  disabled={
                    !currentSelectedFilterTag ||
                    currentSelectedFilterTag.length === 0
                  }
                  onClick={handleClickRemoveCurrentSelectedFilter}
                  style={{ marginTop: "8px", minWidth: "120px" }}
                  variant="outlined"
                >
                  Remove Filter
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {renderData()}
      </Grid>
    </Fragment>
  );
};

articles.propTypes = propTypes;
const mapStateToProps = (state) => ({
  articles: state.articles.list,
  articlesLoading: state.articles.articlesLoading,
  loadingIndex: state.articles.isLoadingIndex,
});
export default connect(mapStateToProps, { fetchArticles })(articles);
