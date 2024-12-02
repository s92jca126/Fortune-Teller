module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-markdown|rehype-highlight)", // Allow these packages to be transformed
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS modules
  },
};
