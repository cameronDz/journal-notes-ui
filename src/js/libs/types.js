const inputTypes = {
  NONE: "",
  HIDDEN: "HIDDEN",
  TEXT_FIELD: "TEXT_FIELD",
  TEXT_FIELD_LIST: "TEXT_FIELD_LIST",
  PASSWORD_FIELD: "PASSWORD_FIELD",
  DATE_FIELD: "DATE_FIELD",
  TEXT_AREA: "TEXT_AREA",
  TEXT_AREA_LIST: "TEXT_AREA_LIST",
};

const journalTypes = {
  NONE: "",
  ARTICLE: "ARTICLE",
  AUDIO_BOOK: "AUDIO_BOOK",
  BOOK: "BOOK",
  PODCAST: "PODCAST",
  VIDEO_GAME: "VIDEO_GAME",
  YOUTUBE_VIDEO: "YOUTUBE_VIDEO",
};

const journalForms = {
  NONE: {},
  ARTICLE: {
    inputs: [
      {
        name: "id",
        title: "ID",
        type: inputTypes.HIDDEN,
      },
      {
        name: "title",
        title: "Title",
        type: inputTypes.TEXT_FIELD,
      },
      {
        name: "author",
        title: "Author",
        type: inputTypes.TEXT_FIELD,
      },
      {
        name: "publishDate",
        title: "Publish Date",
        type: inputTypes.DATE_FIELD,
      },
      {
        name: "url",
        title: "URL",
        type: inputTypes.TEXT_FIELD,
      },
      {
        name: "tags",
        title: "Tag",
        type: inputTypes.TEXT_FIELD_LIST,
      },
      {
        name: "description",
        title: "Description",
        type: inputTypes.TEXT_AREA,
      },
      {
        name: "comments",
        title: "Comment",
        type: inputTypes.TEXT_AREA_LIST,
        elementName: "comment",
      },
      {
        name: "quotes",
        title: "Quotes",
        type: inputTypes.TEXT_AREA_LIST,
        elementName: "quote",
      },
    ],
    name: "Article Note",
  },
  AUDIO_BOOK: {},
  BOOK: {},
  PODCAST: {},
  VIDEO_GAME: {},
  YOUTUBE_VIDEO: {},
};

export { inputTypes, journalForms, journalTypes };
