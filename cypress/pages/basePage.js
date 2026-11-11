class BasePage {

    visit(url) {
        cy.visit(url);
    }
    getEnvironmentURL(key) {
        return cy.env([key]).then((env) => env[key]);
    }
    clickElement(locator) {
        cy.get(locator).should('be.visible').click();
    }
    clickOnElement(locator) {
        cy.contains(locator).should('be.visible').click();
    }
    enterText(locator, text) {
        cy.get(locator).should('be.visible').clear().type(text);
    }
    verifyText(locator, expectedText) {
        cy.get(locator).should('contain.text', expectedText);
    }
    verifyURL(expectedURL) {
        cy.url().should('include', expectedURL);
    }
    clickButton(buttonName) {
        cy.findByRole('button', { name: buttonName }).should('be.visible').click();
    }

}

export default BasePage;