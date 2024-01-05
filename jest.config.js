module.exports = {
  testEnvironment: "jsdom", // Use jsdom as the test environment for browser-like behavior
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  setupFilesAfterEnv: ["./jest.setup.js"], // Path to your Jest setup file
};
