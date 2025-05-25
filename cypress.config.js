import { defineConfig } from "cypress";
import mochawesome from "cypress-mochawesome-reporter/plugin.js";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    reportFilename: "report_",
    timestamp: "mmddyyyy_HHMMss",
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    },
  },
});
