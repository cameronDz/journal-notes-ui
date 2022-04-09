module.exports = {
  collectCoverageFrom: ["**/*.{js,jsx}"],
  coverageDirectory: "<rootDir>/../coverage",
  moduleDirectories: ["node_modules"],
  rootDir: "src",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testEnvironment: "jsdom",
};
