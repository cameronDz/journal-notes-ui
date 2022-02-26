import {
  sortByPublishDate,
  sortByReverseCreatedDate,
  sortByReverseTitle,
  sortByTitle,
} from "./sorts";

describe("sort lib", () => {
  describe("sortByPublishDate", () => {
    it("#01 - all valid dates, sort expectedly", () => {
      const actual = [
        { entry: "#0", expected: "2", publishDate: new Date(1) },
        { entry: "#1", expected: "0", publishDate: new Date(3) },
        { entry: "#2", expected: "1", publishDate: new Date(2) },
        { entry: "#3", expected: "3", publishDate: new Date(0) },
      ];
      const expected = [
        { entry: "#1", expected: "0", publishDate: new Date(3) },
        { entry: "#2", expected: "1", publishDate: new Date(2) },
        { entry: "#0", expected: "2", publishDate: new Date(1) },
        { entry: "#3", expected: "3", publishDate: new Date(0) },
      ];
      actual.sort(sortByPublishDate);
      expect(actual).toEqual(expected);
    });

    it("#02 - missing date, sorted to back", () => {
      const actual = [
        { entry: "#0", expected: "1", publishDate: new Date(1) },
        { entry: "#1", expected: "0", publishDate: new Date(3) },
        { entry: "#2", expected: "3" },
        { entry: "#3", expected: "2", publishDate: new Date(0) },
      ];
      const expected = [
        { entry: "#1", expected: "0", publishDate: new Date(3) },
        { entry: "#0", expected: "1", publishDate: new Date(1) },
        { entry: "#3", expected: "2", publishDate: new Date(0) },
        { entry: "#2", expected: "3" },
      ];
      actual.sort(sortByPublishDate);
      expect(actual).toEqual(expected);
    });
  });

  describe("sortByReverseCreatedDate", () => {
    it("#01 - some missing dates, sort expectedly", () => {
      const actual = [
        { entry: "#0", expected: "2", createdDate: new Date(1) },
        { entry: "#1", expected: "3", createdDate: new Date(3) },
        { entry: "#2", expected: "0" },
        { entry: "#3", expected: "1", createdDate: new Date(0) },
      ];
      const expected = [
        { entry: "#2", expected: "0" },
        { entry: "#3", expected: "1", createdDate: new Date(0) },
        { entry: "#0", expected: "2", createdDate: new Date(1) },
        { entry: "#1", expected: "3", createdDate: new Date(3) },
      ];
      actual.sort(sortByReverseCreatedDate);
      expect(actual).toEqual(expected);
    });
  });

  describe("sortByReverseTitle", () => {
    it("#01 - all valid titles, sort in reverse", () => {
      const actual = [
        { entry: "#0", expected: "3" },
        { entry: "#1", expected: "2", title: "apple" },
        { entry: "#2", expected: "0", title: "12 spin" },
        { entry: "#3", expected: "1", title: "Dog" },
      ];
      const expected = [
        { entry: "#0", expected: "3" },
        { entry: "#1", expected: "2", title: "apple" },
        { entry: "#3", expected: "1", title: "Dog" },
        { entry: "#2", expected: "0", title: "12 spin" },
      ];
      actual.sort(sortByReverseTitle);
      expect(actual).toEqual(expected);
    });
  });

  describe("sortByTitle", () => {
    it("#01 - some missing titles, sort expectedly", () => {
      const actual = [
        { entry: "#0", expected: "3" },
        { entry: "#1", expected: "2", title: "apple" },
        { entry: "#2", expected: "0", title: "12 spin" },
        { entry: "#3", expected: "1", title: "Dog" },
      ];
      const expected = [
        { entry: "#2", expected: "0", title: "12 spin" },
        { entry: "#3", expected: "1", title: "Dog" },
        { entry: "#1", expected: "2", title: "apple" },
        { entry: "#0", expected: "3" },
      ];
      actual.sort(sortByTitle);
      expect(actual).toEqual(expected);
    });
  });
});
