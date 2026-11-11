const payload = {
    "customer.firstName": "Ashish",
    "customer.lastName": "Yadav",
    "customer.address.street": "123 Main Street",
    "customer.address.city": "Mumbai",
    "customer.address.state": "Maharashtra",
    "customer.address.zipCode": "400001",
    "customer.phoneNumber": "9876543210",
    "customer.ssn": "123456789",
    "customer.username": "ashish_yadav_2026",
    "customer.password": "Test@12345",
    "repeatedPassword": "Test@12345"
};
describe('Login thorough API', () => {
    it('Regrister to Para Bank', () => {
        cy.request({
            method: 'GET',
            url: 'https://parabank.parasoft.com/parabank/register.htm'
        });
        cy.request({
            method: 'POST',
            url: 'https://parabank.parasoft.com/parabank/register.htm',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: true,
            body: payload
        })
            .its('status').should('equal', 200);
    })

})