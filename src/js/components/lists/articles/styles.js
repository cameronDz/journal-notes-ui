import { basicColorPalette } from "../../../libs/colors";

const articleGridStyles = {
  filterGridWrapper: {
    borderRadius: "8px",
    margin: "8px 24px",
    padding: "12px",
  },
  filterLoadingWrapper: {
    border: `3px solid ${basicColorPalette?.grey?.hex}`,
  },
  filterLoadedWrapper: {
    border: `3px solid ${basicColorPalette?.blue?.hex}`,
  },
};

const filterTagListStyles = {
  tagButton: { marginTop: "8px", minWidth: "120px" },
  tagFormControl: { marginRight: "12px", minWidth: "224px" },
  tagSelect: { maxHeight: "120px", minHeight: "120px" },
};

const filterTitleStyles = {
  filterTitleHeader: { fontSize: "20px", fontWeight: "700" },
};

export { articleGridStyles, filterTagListStyles, filterTitleStyles };
