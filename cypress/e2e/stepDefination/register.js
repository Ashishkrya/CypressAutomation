import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import BasePage from '../stepDefination/basePage';
const basePage = new BasePage();

Given('I establish a session with ParaBank registration page', () => {
    basePage.getRequest('/register.htm');
});

When('I generate a dynamic username', function () {
    const randomNumber = Math.floor(Math.random() * 10000);
    this.userID = `Jhon${randomNumber}`;
});

When('I send a POST request with the following customer details', function (dataTable) {
    const data = dataTable.rowsHash();
    console.log(`Generated Username: ${this.userID}`);
    const payload = {
        "customer.firstName": data.firstName,
        "customer.lastName": data.lastName,
        "customer.address.street": data.street,
        "customer.address.city": data.city,
        "customer.address.state": data.state,
        "customer.address.zipCode": data.zipCode,
        "customer.phoneNumber": data.phone,
        "customer.ssn": data.ssn,
        "customer.username": this.userID,
        "customer.password": data.password,
        "repeatedPassword": data.password
    };
    cy.writeDataToFixture('userLoginData', {
        userID: this.userID,
        password: data.password
    });
     basePage.postRequest('/register.htm', payload,{},'registerResponse');
});

Then('the registration response status should be {int}', (statusCode) => {
    basePage.validateApiResponse('registerResponse', {status: statusCode });
});

//Login
Given('the user is on the login page', () => {
    basePage.getRequest('/index.htm');
});

When('the user enters username {string} and password {string} and send the request',
    (username, password) => {
        const sendLoginRequest = (user, pass) => {
            const payload = {
                username: user,
                password: pass
            };
           return basePage.postRequest('/login.htm',payload,{form: true},'loginResponse');
        };
        if (username === 'json' && password === 'json') {
            return cy.fixture('userLoginData').then((data) => {
              return  sendLoginRequest(data.userID, data.password);
            });
        } else {
            return sendLoginRequest(username, password);
        }
    });

Then('the login response status should be {int}', function (statusCode) {
   basePage.validateApiResponse('loginResponse', {status: statusCode });
});

When("the user fetches the accounts overview'", function () {
    basePage.getRequest('/overview.htm', 'accountsResponse')
});

Then('the accounts response should be valid', function () {
        basePage.validateApiResponse('accountsResponse', {status: 200,
        bodyText: ['<html>','Accounts Overview','accountTable']
    });
        cy.get('@accountsResponse').then((response) => {
        const matchCustomerId = response.body.match(/services_proxy\/bank\/customers\/"\s*\+\s*(\d+)\s*\+\s*"\/accounts/);
        expect(matchCustomerId).to.not.be.null;
        const customerId = matchCustomerId[1];
        cy.writeDataToFixture('userLoginData', {
            customerId: customerId
        });
        cy.log(`Customer ID: ${customerId}`);
    });

});