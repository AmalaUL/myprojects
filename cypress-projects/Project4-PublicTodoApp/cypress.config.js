require('dotenv').config();
const { defineConfig } = require("cypress");


module.exports = defineConfig({
  screenshotOnRunFailure: true,
  video: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'TodoApp Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: process.env.CYPRESS_APPLICATION_URL,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)

    },

  },
});
