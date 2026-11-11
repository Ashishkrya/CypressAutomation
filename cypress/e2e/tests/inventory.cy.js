import InventoryPage from '../../pages/InventoryPage';
import LoginPage from '../../pages/loginPage';
import BasePage from '../../pages/basePage';
const basePage = new BasePage();
const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
beforeEach(() => {
     basePage.getEnvironmentURL('urlweb').then((url) => {
    basePage.visit(url);
});
    loginPage.login('standard_user', 'secret_sauce');
    loginPage.verifyURL('/inventory.html');
});

describe('Inventory Page Tests', () => {
    it('Add to Cart', () => {
        cy.addProductToCart('Sauce Labs Bike Light', 'Add to cart');
        cy.addProductToCart('Sauce Labs Onesie', 'Add to cart');
        cy.matchProductCountToCart();
        
    });
    it('Remove the Product', () => {
        cy.addProductToCart('Sauce Labs Bolt T-Shirt', 'Add to cart');
        cy.addProductToCart('Sauce Labs Bolt T-Shirt', 'Remove');
        inventoryPage.verifyEmptyCart();
    });
});

describe('Filter on the inventoryPage', () => {
    it('Verify A to Z sorting', () => {
        inventoryPage.verifyProductSorting('az');
    });
    it('Verify Z to A sorting', () => {
        inventoryPage.verifyProductSorting('za');
    });
    it('Verify price low to high', () => {
        inventoryPage.verifyProductSorting('lohi');
    });
    it('Verify price high to low', () => {
        inventoryPage.verifyProductSorting('hilo');
    });

});

