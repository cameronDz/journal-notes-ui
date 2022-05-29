import { generateTimeString } from "./time";

describe("# time tests", () => {
  describe("## generateTimeString", () => {
    it("#01 pass nothing, get back current time string", () => {
      const expected = new Date().toUTCString().split(" ")[4];
      const actual = generateTimeString();
      expect(actual).toEqual(expected);
    });

    it("#02 pass invalid datestring, get back current time string", () => {
      const expected = new Date().toUTCString().split(" ")[4];
      const actual = generateTimeString("dog");
      expect(actual).toEqual(expected);
    });

    it("#03 pass valid date-only string, get back expected time string", () => {
      const expected = "00:00:00";
      const actual = generateTimeString("01-01-2000");
      expect(actual).toEqual(expected);
    });

    it("#04 pass valid datetime string, get back expected time string", () => {
      const expected = "01:15:00";
      const actual = generateTimeString("01-01-2000 01:15:00");
      expect(actual).toEqual(expected);
    });
  });
});
