const latestArticle = (articles) => {
  return (
    Array.isArray(articles) &&
    articles.length > 0 &&
    articles.reduce((prev, curr) => {
      let isPrevGreater = false;
      if (!!prev && !curr) {
        isPrevGreater = true;
      } else if (!prev && !!curr) {
        isPrevGreater = false;
      } else {
        if (!!prev.createdDate && !curr.createdDate) {
          isPrevGreater = true;
        } else if (!prev.createdDate && !!curr.createdDate) {
          isPrevGreater = false;
        } else {
          isPrevGreater =
            new Date(prev.createdDate) > new Date(curr.createdDate);
        }
      }
      return isPrevGreater ? prev : curr;
    })
  );
};

export { latestArticle };
