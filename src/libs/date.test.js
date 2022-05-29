import { getDateDisplay } from "./date";

describe("# date tests", () => {
  describe("## getDateDisplay", () => {
    it("#01 pass nothing, get back empty string", () => {
      const expected = "";
      const actual = getDateDisplay();
      expect(actual).toEqual(expected);
    });

    it("#02 pass invalid date, get back empty string", () => {
      const expected = "";
      const actual = getDateDisplay("dog");
      expect(actual).toEqual(expected);
    });

    it("#03 pass MMMM_DD_YYYY date, get back expected string", () => {
      const expected = "December 15, 2004";
      const actual = getDateDisplay(expected);
      expect(actual).toEqual(expected);
    });

    it("#04 pass MM_DD_YY date, get back expected string", () => {
      const expected = "June 5, 2014";
      const actual = getDateDisplay("06/05/2014");
      expect(actual).toEqual(expected);
    });

    it("#05 pass full date, get back expected string", () => {
      const expected = "September 28, 2000";
      const actual = getDateDisplay("Sat September 28 2000 21:55:09 GMT-0000");
      expect(actual).toEqual(expected);
    });
  });
});
