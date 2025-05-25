module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/superwstest/**/*.test.js'],
  testTimeout: 30000, // 30 seconds
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Backend & WebSocket Test Report',
        outputPath: './reports/jest-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        // optional: you can add more options here as needed
      }
    ]
  ]
};
