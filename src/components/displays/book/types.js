import PropType from "prop-types";

const propTypesBookV1 = {
  note: PropType.shape({
    author: PropType.string,
    bookDescription: PropType.string,
    bookSource: PropType.string,
    comments: PropType.arrayOf(
      PropType.shape({
        createDate: PropType.instanceOf(Date),
        comment: PropType.string,
      })
    ),
    createdDate: PropType.string,
    endPage: PropType.string,
    id: PropType.string,
    pageCount: PropType.string,
    publishDate: PropType.string,
    publisher: PropType.string,
    quotes: PropType.arrayOf(
      PropType.shape({
        createDate: PropType.instanceOf(Date),
        quote: PropType.string,
      })
    ),
    readDate: PropType.string,
    readDescription: PropType.string,
    readTime: PropType.string,
    startPage: PropType.string,
    tags: PropType.arrayOf(PropType.string),
    title: PropType.string,
    updatedDate: PropType.string,
    _version: PropType.string,
  }),
};

export { propTypesBookV1 };
