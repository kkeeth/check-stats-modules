export default {
  verbose: true,
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js"],
  modulePathIgnorePatterns: ["<rootDir>/bin/", "<rootDir>/lib/"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/test/**/*.js"],
  transform: {},
};
