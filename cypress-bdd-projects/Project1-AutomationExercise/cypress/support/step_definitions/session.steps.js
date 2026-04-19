import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import Login from "../Pages/Login";
import Cart from "../Pages/Cart";
import testData from '../../fixtures/products.json';

const login = new Login();
const cart = new Cart();

Given('a logged-in user', () => {
    cy.login();
})

When('the user adds products to the cart', () => {
    cy.addProductsToCart(testData.brandName);
    login.navLink().contains('Cart').click();
    cart.cartDescription().should('be.visible');
})

//let beforeSessionId;
When('reloads the page', () => {
    // cy.getCookie('sessionid').should('exist').and('have.property', 'value')
    //     .then((cookie) => {
    //         cy.log('Before Cookie:', cookie); // This logs the string session id
    //         beforeSessionId = cookie;
    //         // no cookie.value here
    //         cy.reload();

    //     })
    cy.getCookie('sessionid').should('exist').its('value').as('beforeSessionId');
    cy.reload();
})

Then('the user should remain logged in', () => {
    // cy.getCookie('sessionid').should('exist').and('have.property', 'value')
    //     .then((cookie) => {
    //         cy.log('After Cookie:', cookie);
    //         const afterSessionId = cookie;

    //         expect(afterSessionId).to.eq(beforeSessionId);
    //     })
    cy.get('@beforeSessionId').then((beforeSessionId) => {
        cy.getCookie('sessionid').should('exist').its('value').should('eq', beforeSessionId)
    })
})

Then('the cart should retain the added products', () => {
    cart.cartDescription().should('be.visible');

})

