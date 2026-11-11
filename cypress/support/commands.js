/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import '@testing-library/cypress/add-commands';
import './commands'
// Add to cart:
let expectedCount = 0;
Cypress.Commands.add('addProductToCart', (productName,button) => {
    cy.get('[data-test="inventory-item"]')
        .contains('[data-test="inventory-item-name"]', productName)
        .parents('[data-test="inventory-item"]')
        .within(() => {
            cy.get('button').should('contain.text', button).click();
        });
        expectedCount++;
});

Cypress.Commands.add('matchProductCountToCart',()=>{
    cy.get('[data-test="shopping-cart-badge"]')
        .should('have.text', expectedCount.toString())

})
Cypress.Commands.add('itemOnCart',(itemName)=>{
    cy.get('[data-test="cart-list"]')
      .find(itemName)
      .then(($products) => {
          const actualProductsorPrice = [...$products].map(el =>
              el.innerText.trim()
          );

          expect(actualProductsorPrice).to.have.members(expectedProducts);
      });
    
})
//products on cart:
Cypress.Commands.add('productsOnCart',(expectedProducts)=>{
     cy.get('[data-test="cart-list"]')
      .find('[data-test="inventory-item-name"]')
      .then(($products) => {
          const actualProducts = [...$products].map(el =>
              el.innerText.trim()
          );
          expect(actualProducts).to.have.members(expectedProducts);
      });
})

Cypress.Commands.add('writeDataToFixture', (fileName, data) => {
    const filePath = `cypress/fixtures/${fileName}.json`;
    cy.readDataFromFixture(fileName).then((existingData) => {
        const updatedData = {
            ...existingData,
            ...data
        };
        cy.writeFile(filePath, updatedData);
    });
});

Cypress.Commands.add('readDataFromFixture',(fileName) => {
    return cy.readFile(`cypress/fixtures/${fileName}.json`);
})

