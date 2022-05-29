const dateTypes = {
  NONE: "",
  FREE: "FREE",
  MM_DD_YYYY: "MM_DD_YYYY",
  MM_YYYY: "MM_YYYY",
  MMMM_YYYY: "MMMM_YYYY",
  YYYY: "YYYY",
};

const generationTypes = {
  NONE: "",
  CURRENT_DATE: "CURRENT_DATE",
  CURRENT_TIME: "CURRENT_TIME",
  EMPTY_ARRAY: "EMPTY_ARRAY",
  EMPTY_DATE: "EMPTY_DATE",
  EMPTY_STRING: "EMPTY_STRING",
  NULL: "NULL",
  PRESET: "PRESET",
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
  TIME_FIELD: "TIME_FIELD",
};

const journalTypes = {
  NONE: "",
  ARTICLE: "ARTICLE",
  AUDIO_BOOK: "AUDIO_BOOK",
  BOOK: "BOOK",
  PAPER: "PAPER",
  PERSONAL_INTERVIEW: "PERSONAL_INTERVIEW",
  PODCAST: "PODCAST",
  VIDEO_GAME: "VIDEO_GAME",
  ONLINE_VIDEO: "ONLINE_VIDEO",
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
    generateOn: generateOnTypes.CREATE,
    generationType: generationTypes.CURRENT_DATE,
    inputType: inputTypes.DATE_FIELD,
    isHidden: true,
    name: "createdTime",
    title: "Created Time",
  },
  {
    generateOn: generateOnTypes.UPDATE,
    generationType: generationTypes.CURRENT_DATE,
    inputType: inputTypes.DATE_FIELD,
    isHidden: true,
    name: "updatedDate",
    title: "Updated Date",
  },
  {
    generateOn: generateOnTypes.UPDATE,
    generationType: generationTypes.CURRENT_DATE,
    inputType: inputTypes.DATE_FIELD,
    isHidden: true,
    name: "updatedTime",
    title: "Updated Time",
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
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "publisher",
        title: "Publisher",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "volumePages",
        title: "Volume/Pages",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "publishDate",
        title: "Publish Date",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "readDate",
        title: "Read Date",
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
        options: {
          isTrimmed: true,
          isUniqueSimpleList: true,
          isWhitespaceReplaced: true,
        },
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
        title: "Quote",
      },
      {
        elementName: "definition",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "definitions",
        title: "Definition",
      },
      {
        defaultValue: "1.1.1",
        generateOn: generateOnTypes.CREATE,
        generationType: generationTypes.PRESET,
        inputType: inputTypes.HIDDEN,
        name: "_version",
        title: "VERSION",
      },
      ...defaultInputs,
    ],
    name: "Article Note",
  },
  AUDIO_BOOK: {
    inputs: [
      {
        defaultValue: journalTypes.AUDIO_BOOK,
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
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "chapterCount",
        title: "Chapters",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "totalTime",
        title: "Total Listen Time",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "bookDescription",
        title: "Book Description",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "publisher",
        title: "Publisher",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "publishDate",
        title: "Publish Date",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "readDate",
        title: "Read Date",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "readTime",
        title: "Read Time",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "startChapter",
        title: "Start Chapter",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "startTimestamp",
        title: "Start Timestamp",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "endChapter",
        title: "End Chapter",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "endTimestamp",
        title: "End Timestamp",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "readDescription",
        title: "Read Description",
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
        title: "Quote",
      },
      {
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_FIELD_LIST,
        name: "tags",
        options: {
          isTrimmed: true,
          isUniqueSimpleList: true,
          isWhitespaceReplaced: true,
        },
        title: "Tag",
      },
      {
        defaultValue: "1.0.1",
        generateOn: generateOnTypes.CREATE,
        generationType: generationTypes.PRESET,
        inputType: inputTypes.HIDDEN,
        name: "_version",
        title: "VERSION",
      },
      ...defaultInputs,
    ],
    name: "Audio Book Notes",
  },
  BOOK: {
    inputs: [
      {
        defaultValue: journalTypes.BOOK,
        generationType: generationTypes.NONE,
        inputType: inputTypes.HIDDEN,
        name: "journalType",
        title: "Journal Type",
      },
      {
        generateOn: generateOnTypes.CREATE,
        generationType: generationTypes.UUID,
        inputType: inputTypes.HIDDEN,
        name: "bookId",
        title: "BOOK_ID",
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
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "pageCount",
        title: "Pages",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "bookDescription",
        title: "Book Description",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "publisher",
        title: "Publisher",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "publishDate",
        title: "Publish Date",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "bookSource",
        title: "Book Source",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "readDate",
        title: "Read Date",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "readTime",
        title: "Read Time",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "startPage",
        title: "Start Page",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "endPage",
        title: "End Page",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "readDescription",
        title: "Read Description",
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
        title: "Quote",
      },
      {
        elementName: "definition",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "definitions",
        title: "Definition",
      },
      {
        elementName: "resource",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "resources",
        title: "Resource",
      },
      {
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_FIELD_LIST,
        name: "tags",
        options: {
          isTrimmed: true,
          isUniqueSimpleList: true,
          isWhitespaceReplaced: true,
        },
        title: "Tag",
      },
      {
        defaultValue: "1.2.0",
        generateOn: generateOnTypes.CREATE,
        generationType: generationTypes.PRESET,
        inputType: inputTypes.HIDDEN,
        name: "_version",
        title: "VERSION",
      },
      ...defaultInputs,
    ],
    name: "Book Notes",
  },
  ONLINE_VIDEO: {
    inputs: [
      {
        defaultValue: journalTypes.ONLINE_VIDEO,
        generationType: generationTypes.NONE,
        inputType: inputTypes.HIDDEN,
        name: "journalType",
        title: "Journal Type",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "name",
        title: "Video Name",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "sourceName",
        title: "Source Name",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "sourceUrl",
        title: "Source URL",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "personalSource",
        title: "Personal Source",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "broadcastDate",
        title: "Broadcast Date",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "watchDate",
        title: "Watch Date",
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
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_FIELD_LIST,
        name: "tags",
        options: {
          isTrimmed: true,
          isUniqueSimpleList: true,
          isWhitespaceReplaced: true,
        },
        title: "Tag",
      },
      {
        defaultValue: "1.0.1",
        generateOn: generateOnTypes.CREATE,
        generationType: generationTypes.PRESET,
        inputType: inputTypes.HIDDEN,
        name: "_version",
        title: "VERSION",
      },
      ...defaultInputs,
    ],
    name: "Online Video",
  },
  PAPER: {
    inputs: [
      {
        defaultValue: journalTypes.PAPER,
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
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "publisher",
        title: "Publisher",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "volumePages",
        title: "Volume/Pages",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "publishDate",
        title: "Publish Date",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "readDate",
        title: "Read Date",
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
        options: {
          isTrimmed: true,
          isUniqueSimpleList: true,
          isWhitespaceReplaced: true,
        },
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
        title: "Quote",
      },
      {
        elementName: "resource",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "resource",
        title: "Resource",
      },
      {
        elementName: "definition",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "definitions",
        title: "Definition",
      },
      {
        elementName: "term",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "terms",
        title: "Term",
      },
      {
        defaultValue: "1.0.0",
        generateOn: generateOnTypes.CREATE,
        generationType: generationTypes.PRESET,
        inputType: inputTypes.HIDDEN,
        name: "_version",
        title: "VERSION",
      },
      ...defaultInputs,
    ],
    name: "Paper Note",
  },
  PERSONAL_INTERVIEW: {
    inputs: [
      {
        defaultValue: journalTypes.PERSONAL_INTERVIEW,
        generationType: generationTypes.NONE,
        inputType: inputTypes.HIDDEN,
        name: "journalType",
        title: "Journal Type",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "interviewee",
        title: "Interviewee",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "context",
        title: "Context",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "interviewDate",
        title: "Interview Date",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "interviewTimeframe",
        title: "Interview Timeframe",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_AREA,
        name: "interviewer",
        title: "Interviewer",
      },
      {
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_FIELD_LIST,
        name: "tags",
        options: {
          isTrimmed: true,
          isUniqueSimpleList: true,
          isWhitespaceReplaced: true,
        },
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
        title: "Quote",
      },
      {
        elementName: "resources",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "suggestedResources",
        title: "Suggested Resource",
      },
      {
        defaultValue: "1.0.1",
        generateOn: generateOnTypes.CREATE,
        generationType: generationTypes.PRESET,
        inputType: inputTypes.HIDDEN,
        name: "_version",
        title: "VERSION",
      },
      ...defaultInputs,
    ],
    name: "Online Video",
  },
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
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "personalSource",
        title: "Personal Source",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "broadcastDate",
        title: "Broadcast Date",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "watchDate",
        title: "Watch Date",
      },
      {
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_FIELD_LIST,
        name: "tags",
        options: {
          isTrimmed: true,
          isUniqueSimpleList: true,
          isWhitespaceReplaced: true,
        },
        title: "Tag",
      },
      {
        defaultValue: "1.0.1",
        generateOn: generateOnTypes.CREATE,
        generationType: generationTypes.PRESET,
        inputType: inputTypes.HIDDEN,
        name: "_version",
        title: "VERSION",
      },
      ...defaultInputs,
    ],
    name: "Podcast Notes",
  },
  VIDEO_GAME: {
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
        name: "name",
        title: "Name",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "description",
        title: "Game Description",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "system",
        title: "System",
      },
      {
        format: dateTypes.MM_DD_YYYY,
        generationType: generationTypes.EMPTY_DATE,
        inputType: inputTypes.DATE_FIELD,
        name: "playedDate",
        title: "Played Date",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "timePlayed",
        title: "Time Played",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "playDuration",
        title: "Play Duration",
      },
      {
        generationType: generationTypes.EMPTY_STRING,
        inputType: inputTypes.TEXT_FIELD,
        name: "plotSynopsis",
        title: "Plot Synopsis",
      },
      {
        elementName: "comment",
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_AREA_LIST,
        name: "plotComments",
        title: "Plot Comment",
      },
      {
        generationType: generationTypes.EMPTY_ARRAY,
        inputType: inputTypes.TEXT_FIELD_LIST,
        name: "tags",
        options: {
          isTrimmed: true,
          isUniqueSimpleList: true,
          isWhitespaceReplaced: true,
        },
        title: "Tag",
      },
      {
        defaultValue: "1.0.1",
        generateOn: generateOnTypes.CREATE,
        generationType: generationTypes.PRESET,
        inputType: inputTypes.HIDDEN,
        name: "_version",
        title: "VERSION",
      },
      ...defaultInputs,
    ],
    name: "Video Game Notes",
  },
};

export { generationTypes, inputTypes, journalForms, journalTypes };
