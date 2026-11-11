import BasePage from './basePage';

class LoginPage extends BasePage {
    username = '#user-name';
    password = '#password';
    loginButton = '#login-button';
    errorMessage = '[data-test="error"]';

    login(user, pass) {
        this.enterText(this.username, user);
        this.enterText(this.password, pass);
        this.clickElement(this.loginButton);
    }
    verifyLockedOutError() {
        this.verifyText(this.errorMessage,'Epic sadface: Sorry, this user has been locked out.');
    }
    dismissError() {
        this.clickButton('Dismiss error');
    }
    loginWithSession(user, pass) {
    cy.session([user, pass], () => {
        this.visit('https://www.saucedemo.com/');
        this.login(user, pass);
        this.verifyURL('/inventory.html');
    });
}

}

export default LoginPage;