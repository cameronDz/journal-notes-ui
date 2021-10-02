const generationTypes = {
  NONE: "",
  CURRENT_DATE: "CURRENT_DATE",
  EMPTY_ARRAY: "EMPTY_ARRAY",
  EMPTY_DATE: "EMPTY_DATE",
  EMPTY_STRING: "EMPTY_STRING",
  NULL: "NULL",
  UUID: "UUID",
};

const generateOnTypes = {
  NONE: "",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
};

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

const defaultInputs = [
  {
    generateOn: generateOnTypes.CREATE,
    generationType: generationTypes.UUID,
    inputType: inputTypes.HIDDEN,
    name: "id",
    title: "ID",
  },
  {
    generateOn: generateOnTypes.CREATE,
    generationType: generationTypes.CURRENT_DATE,
    inputType: inputTypes.DATE_FIELD,
    isHidden: true,
    name: "createdDate",
    title: "Created Date",
  },
  {
    generateOn: generateOnTypes.UPDATE,
    generationType: generationTypes.CURRENT_DATE,
    inputType: inputTypes.DATE_FIELD,
    isHidden: true,
    name: "updatedDate",
    title: "Updated Date",
  },
];

const journalForms = {
  NONE: {},
  ARTICLE: {
    inputs: [
      {
        defaultValue: journalTypes.ARTICLE,
        generationType: generationTypes.NONE,
        inputType: inputTypes.HIDDEN,
        name: "journalType",
        title: "Journal Type",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "title",
        title: "Title",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "author",
        title: "Author",
      },
      {
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "publishDate",
        title: "Publish Date",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "url",
        title: "URL",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "description",
        title: "Description",
      },
      {
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_FIELD_LIST,
        name: "tags",
        title: "Tag",
      },
      {
        elementName: "comment",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "comments",
        title: "Comment",
      },
      {
        elementName: "quote",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "quotes",
        title: "Quotes",
      },
      ...defaultInputs,
    ],
    name: "Article Note",
  },
  AUDIO_BOOK: {},
  BOOK: {},
  PODCAST: {
    inputs: [
      {
        defaultValue: journalTypes.PODCAST,
        generationType: generationTypes.NONE,
        inputType: inputTypes.HIDDEN,
        name: "journalType",
        title: "Journal Type",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "title",
        title: "Title",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "subtitle",
        title: "Subtitle/Version",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "host",
        title: "Host",
      },
      {
        elementName: "guest",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "guests",
        title: "Guest",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "description",
        title: "Description",
      },
      {
        elementName: "comment",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "comments",
        title: "Comment",
      },
      {
        elementName: "timestamp",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "timestamps",
        title: "Timestamp",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "url",
        title: "Source URL",
      },
      {
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "broadcastDate",
        title: "Broadcast Date",
      },
      {
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "watchDate",
        title: "Watch Date",
      },
      {
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_FIELD_LIST,
        name: "tags",
        title: "Tag",
      },
      ...defaultInputs,
    ],
    name: "Podcast Notes",
  },
  VIDEO_GAME: {},
  YOUTUBE_VIDEO: {},
};

export { generationTypes, inputTypes, journalForms, journalTypes };
