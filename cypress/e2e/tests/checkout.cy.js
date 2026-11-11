import LoginPage from '../../pages/loginPage';
import AddToCartPage from '../../pages/addtoCart';
import BasePage from '../../pages/basePage';
const loginPage = new LoginPage();
const addtocart = new AddToCartPage();
const basePage = new BasePage();
const expectedProducts = [
    'Sauce Labs Bike Light',
    'Sauce Labs Onesie'
];
beforeEach(() => {
    basePage.getEnvironmentURL('urlweb').then((url) => {
    basePage.visit(url);
});
    loginPage.login('standard_user', 'secret_sauce');
    loginPage.verifyURL('/inventory.html');
});

describe('Add to Cart', () => {
    it('Verify items in the cart', () => {
        cy.addProductToCart('Sauce Labs Bike Light', 'Add to cart');
        cy.addProductToCart('Sauce Labs Onesie', 'Add to cart');
        addtocart.clickonCart();
        cy.productsOnCart(expectedProducts);
        addtocart.checkoutButton('Checkout','/checkout-step-one.html');
        addtocart.enterCheckoutInformation('Jhon','Tim','RG1 7RD')
        addtocart.continuCheckout();
        cy.productsOnCart(expectedProducts);
        addtocart.checkoutButton('Finish','/checkout-complete');
    });
});