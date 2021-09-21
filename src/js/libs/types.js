const inputType = {
  NONE: "",
  HIDDEN: "HIDDEN",
  TEXT_FIELD: "TEXT_FIELD",
  TEXT_FIELD_LIST: "TEXT_FIELD_LIST",
  PASSWORD_FIELD: "PASSWORD_FIELD",
  DATE_FIELD: "DATE_FIELD",
  TEXT_AREA: "TEXT_AREA",
  TEXT_AREA_LIST: "TEXT_AREA_LIST",
};

const journalType = {
  NONE: "",
  ARTICLE: "ARTICLE",
  AUDIO_BOOK: "AUDIO_BOOK",
  BOOK: "BOOK",
  PODCAST: "PODCAST",
  VIDEO_GAME: "VIDEO_GAME",
  YOUTUBE_VIDEO: "YOUTUBE_VIDEO",
};

const journalForm = {
  NONE: {},
  ARTICLE: {
    inputs: [
      {
        name: "title",
        title: "Title",
        type: inputType.TEXT_FIELD,
      },
      {
        name: "author",
        title: "Author",
        type: inputType.TEXT_FIELD,
      },
      {
        name: "publishDate",
        title: "Publish Date",
        type: inputType.DATE_FIELD,
      },
      {
        name: "url",
        title: "URL",
        type: inputType.TEXT_FIELD,
      },
      {
        name: "tags",
        title: "Tag",
        type: inputType.TEXT_FIELD_LIST,
      },
      {
        name: "description",
        title: "Description",
        type: inputType.TEXT_AREA,
      },
      {
        name: "comments",
        title: "Comment",
        type: inputType.TEXT_AREA_LIST,
      },
      {
        name: "quotes",
        title: "Quotes",
        type: inputType.TEXT_AREA_LIST,
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

export { inputType, journalForm, journalType };
