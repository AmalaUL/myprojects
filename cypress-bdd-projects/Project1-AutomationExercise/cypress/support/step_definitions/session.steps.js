import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import Login from "../Pages/Login";
import Cart from "../Pages/Cart";
import testData from '../../fixtures/products.json';

const login = new Login();
const cart = new Cart();

Given('I login as valid user', () => {
    cy.login();
})

When('I add some products', () => {
    cy.addProductsToCart(testData.brandName);
    login.navLink().contains('Cart').click();
    cart.cartDescription().should('be.visible');
})

Then('I reload and cookies remain the same', () => {
    cy.getCookie('sessionid').should('exist').and('have.property', 'value')
        .then((cookie) => {
            cy.log('Before Cookie:', cookie); // This logs the string session id
            const beforeSessionId = cookie;
            // no cookie.value here
            cy.reload();
            cy.getCookie('sessionid').should('exist').and('have.property', 'value')
                .then((cookie) => {
                    cy.log('After Cookie:', cookie);
                    const afterSessionId = cookie;

                    expect(afterSessionId).to.eq(beforeSessionId);
                    cart.cartDescription().should('be.visible');
                })
        });
})