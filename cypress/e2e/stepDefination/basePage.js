class BasePage {
    constructor() {
        this.baseUrl = 'https://parabank.parasoft.com/parabank';
    }
    getRequest(endpoint, alias = null) {
        return cy.request({
            method: 'GET',
            url: `${this.baseUrl}${endpoint}`,
            failOnStatusCode: false
        }).then((response) => {
            if (alias) {
                return cy.wrap(response).as(alias);
            }
            return response;
        });
    }
    postRequest(endpoint, payload, options = {}, alias = null) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}${endpoint}`,
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: payload,
            failOnStatusCode: false,
            ...options
        }).then((response) => {
            if (alias) {
                return cy.wrap(response).as(alias);
            }
            return response;
        });
    }
    validateApiResponse(alias, expected = {}) {
        cy.get(`@${alias}`).then((response) => {
            if (expected.status !== undefined) {
                expect(response.status).to.eq(expected.status);
            }
            if (expected.bodyText) {
                expected.bodyText.forEach((text) => {
                expect(response.body).to.include(text);
                });
            }
            if (expected.maxDuration !== undefined) {
                expect(response.duration).to.be.lessThan(expected.maxDuration);
            }
        });
    }
}
export default BasePage;