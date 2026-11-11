
const { defineConfig } = require("cypress");
const {
    addCucumberPreprocessorPlugin
} = require("@badeball/cypress-cucumber-preprocessor");
const {
    createEsbuildPlugin
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler =
    require("@bahmutov/cypress-esbuild-preprocessor");

module.exports = defineConfig({
    projectId: '7xkn1j',
    allowCypressEnv: false,
    env:{
        urlweb:"https://www.saucedemo.com/",
        urlApi: "https://parabank.parasoft.com/parabank"
    },

    e2e: {
        specPattern: [
            "cypress/e2e/**/*.feature",
            "cypress/e2e/**/*.cy.js"
        ],

        async setupNodeEvents(on, config) {
            await addCucumberPreprocessorPlugin(on, config);
            on(
                "file:preprocessor",
                createBundler({
                    plugins: [createEsbuildPlugin(config)]
                })
            );
            return config;
        }
    }
});
