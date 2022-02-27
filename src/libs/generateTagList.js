const generateTagsFromList = (notes = []) => {
  const tags = [];
  const length = Array.isArray(notes) ? notes.length : 0;
  for (let idx = 0; idx < length; idx++) {
    if (!!notes[idx] && Array.isArray(notes[idx].tags)) {
      tags.push(...notes[idx].tags);
    }
  }
  return [...new Set(tags)].sort();
};

export { generateTagsFromList };
