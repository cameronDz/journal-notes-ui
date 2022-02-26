import {
  defaultEmptyObject,
  defaultEmptyString,
  defaultEventEmptyString,
  defaultUniqueArray,
} from "./defaults";

describe("default lib", () => {
  describe("defaultEmptyObject", () => {
    it("#01 pass nothing, return empty object", () => {
      const expected = {};
      const actual = defaultEmptyObject();
      expect(actual).toEqual(expected);
    });

    it("#02 pass null, return empty object", () => {
      const value = null;
      const expected = {};
      const actual = defaultEmptyObject(value);
      expect(actual).toEqual(expected);
    });

    it("#03 pass string, return empty object", () => {
      const value = "dog";
      const expected = {};
      const actual = defaultEmptyObject(value);
      expect(actual).toEqual(expected);
    });

    it("#04 pass empty object, return empty object", () => {
      const expected = {};
      const actual = defaultEmptyObject(expected);
      expect(actual).toEqual(expected);
    });

    it("#05 pass single tier object, return empty object", () => {
      const expected = { val: "dog" };
      const actual = defaultEmptyObject(expected);
      expect(actual).toEqual(expected);
    });

    it("#06 pass multi tier object, return empty object", () => {
      const expected = { val: "dog", tier: { dog: "good " } };
      const actual = defaultEmptyObject(expected);
      expect(actual).toEqual(expected);
    });
  });

  describe("defaultEmptyString", () => {
    it("#01 pass nothing, return empty string", () => {
      const expected = "";
      const actual = defaultEmptyString();
      expect(actual).toBe(expected);
    });

    it("#02 pass null, return empty string", () => {
      const value = null;
      const expected = "";
      const actual = defaultEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#03 pass number, return empty string", () => {
      const value = 1234;
      const expected = "";
      const actual = defaultEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#04 pass NaN, return empty string", () => {
      const value = NaN;
      const expected = "";
      const actual = defaultEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#05 pass empty string, return empty string", () => {
      const value = "";
      const expected = "";
      const actual = defaultEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#06 pass valid string, return string", () => {
      const expected = "good dog";
      const actual = defaultEmptyString(expected);
      expect(actual).toBe(expected);
    });
  });

  describe("defaultEventEmptyString", () => {
    it("#01 pass nothing, return empty string", () => {
      const expected = "";
      const actual = defaultEventEmptyString();
      expect(actual).toBe(expected);
    });

    it("#02 pass null, return empty string", () => {
      const value = null;
      const expected = "";
      const actual = defaultEventEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#03 pass empty obj, return empty string", () => {
      const value = {};
      const expected = "";
      const actual = defaultEventEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#04 pass obj with empty target, return empty string", () => {
      const value = { target: {} };
      const expected = "";
      const actual = defaultEventEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#05 pass obj with array target value, return empty string", () => {
      const value = { target: { value: ["dog"] } };
      const expected = "";
      const actual = defaultEventEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#06 pass obj with number target value, return empty string", () => {
      const value = { target: { value: 89 } };
      const expected = "";
      const actual = defaultEventEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#07 pass obj with empty string target value, return empty string", () => {
      const value = { target: { value: "" } };
      const expected = "";
      const actual = defaultEventEmptyString(value);
      expect(actual).toBe(expected);
    });

    it("#08 pass valid value, return string", () => {
      const expected = "doggo";
      const value = { target: { value: expected } };
      const actual = defaultEventEmptyString(value);
      expect(actual).toBe(expected);
    });
  });

  describe("defaultUniqueArray", () => {
    it("#01 pass nothing, return empty array", () => {
      const expected = [];
      const actual = defaultUniqueArray();
      expect(actual).toEqual(expected);
    });

    it("#02 pass null, return empty array", () => {
      const value = null;
      const expected = [];
      const actual = defaultUniqueArray(value);
      expect(actual).toEqual(expected);
    });

    it("#03 pass NaN, return empty array", () => {
      const value = NaN;
      const expected = [];
      const actual = defaultUniqueArray(value);
      expect(actual).toEqual(expected);
    });

    it("#04 pass empty string, return empty array", () => {
      const value = "";
      const expected = [];
      const actual = defaultUniqueArray(value);
      expect(actual).toEqual(expected);
    });

    it("#05 pass number, return empty array", () => {
      const value = 9873;
      const expected = [];
      const actual = defaultUniqueArray(value);
      expect(actual).toEqual(expected);
    });

    it("#06 pass empty array, return empty array", () => {
      const expected = [];
      const actual = defaultUniqueArray(expected);
      expect(actual).toEqual(expected);
    });

    it("#07 pass array, return array", () => {
      const expected = ["abc", 123, {}];
      const actual = defaultUniqueArray(expected);
      expect(actual).toEqual(expected);
    });

    it("#08 pass non-unique arry, return unique array", () => {
      const value = ["abc", 123, {}, 123];
      const expected = ["abc", 123, {}];
      const actual = defaultUniqueArray(value);
      expect(actual).toEqual(expected);
    });

    it("#09 pass multip-non-unique array, return unique array", () => {
      const value = ["abc", 123, {}, 123, "dog", "abc", 123];
      const expected = ["abc", 123, {}, "dog"];
      const actual = defaultUniqueArray(value);
      expect(actual).toEqual(expected);
    });
  });
});
