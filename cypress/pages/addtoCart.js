import BasePage from './basePage';
class addtoCart extends BasePage {
    addtoCartLink='[data-test="shopping-cart-link"]'
    firstName='#first-name'
    lastName='#last-name';
    postalCode='#postal-code'
    continue='#continue'
    clickonCart(){
        this.clickElement(this.addtoCartLink);
        this.verifyURL('/cart.html');
    }
    checkoutButton(buttonName,url){
        this.clickButton(buttonName);
        this.verifyURL(url);
    }
    enterCheckoutInformation(firstName,lastName,postalCode){
        this.enterText(this.firstName, firstName);
        this.enterText(this.lastName, lastName);
        this.enterText(this.postalCode, postalCode);
    }
    continuCheckout(){
        this.clickElement(this.continue);
        this.verifyURL('/checkout-step-two.html');
    }
   
};
export default addtoCart;