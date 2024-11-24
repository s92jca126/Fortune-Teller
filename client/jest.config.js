module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleFileExtensions: ["js", "jsx"],
};
