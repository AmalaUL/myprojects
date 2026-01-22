import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { defineConfig } from "cypress";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export default defineConfig({
  "cypress-cucumber-preprocessor": {
    stepDefinitions: "cypress/support/step_definitions/**/*.js"
  },

  e2e: {
    baseUrl: process.env.CYPRESS_APPLICATION_URL,
    env: {
      emailAddress: process.env.CYPRESS_APPLICATION_EMAIL_ADDRESS,
      password: process.env.CYPRESS_APPLICATION_PASSWORD,
    },

    specPattern: "cypress/e2e/**/*.feature",

    async setupNodeEvents(on, config) {
      on("task", {
        fileExists(filePath) {
          return fs.existsSync(path.join(__dirname, filePath));
        },
      });

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
