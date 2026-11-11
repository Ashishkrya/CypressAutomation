import BasePage from './basePage';
class InventoryPage extends BasePage {
    filterByAZ = '[data-test="product-sort-container"]';
    filterByPrice = '[data-test="inventory-item-price"]'
    emptyCart='[data-test="shopping-cart-badge"]'
    verifyProductSorting(sortOption) {
        cy.get(this.filterByAZ).should('be.visible').select(sortOption);
        if (sortOption === 'az' || sortOption === 'za') {
            cy.get('[data-test="inventory-item-name"]').then(($names) => {
                const actualNames = [...$names].map(el => el.innerText.trim());
                const expectedNames = [...actualNames].sort((a, b) =>
                    sortOption === 'az'
                        ? a.localeCompare(b)
                        : b.localeCompare(a)
                );
                expect(actualNames).to.deep.equal(expectedNames);
            });
        } else {
            cy.get(this.filterByPrice).then(($prices) => {
                const actualPrices = [...$prices].map(el => Number(el.innerText.replace('$', '')));
                const expectedPrices = [...actualPrices].sort((a, b) =>
                    sortOption === 'lohi' ? a - b : b - a
                );
                expect(actualPrices).to.deep.equal(expectedPrices);
            });
        }
    }
    verifyEmptyCart(){
        cy.get(this.emptyCart).should('not.exist');
    }
}
export default InventoryPage;