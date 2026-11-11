import LoginPage from '../../pages/loginPage';
const loginPage = new LoginPage();
import BasePage from '../../pages/basePage';
const basePage = new BasePage();
describe('Login Page', () => {
    it('Invalid Login to Swag Labs', () => {
        basePage.getEnvironmentURL('urlweb').then((url) => {
            basePage.visit(url);
        });
        loginPage.login('locked_out_user', 'secret_sauce');
        loginPage.verifyLockedOutError();
        loginPage.dismissError();
    })

    it('Verify successful login', () => {
        basePage.getEnvironmentURL('urlweb').then((url) => {
            basePage.visit(url);
        });
        loginPage.login('standard_user', 'secret_sauce');
    })
})

