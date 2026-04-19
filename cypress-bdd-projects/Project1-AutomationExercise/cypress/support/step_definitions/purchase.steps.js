import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Products from '../Pages/Products';
import Cart from '../Pages/Cart';
import CheckOut from '../Pages/CheckOut';
import Payment from "../Pages/Payment";
import testData from '../../fixtures/products.json';
import Login from '../Pages/Login';

const products = new Products();
const cart = new Cart();
const checkout = new CheckOut();
const payment = new Payment();
const login = new Login();

let finalPrice;
When('proceeds to checkout', () => {
    login.navLink().contains('Cart').click();
    let totalPrice = [];
    cart.cartDescription().should('be.visible');
    cart.cartPriceLable().each(($price) => {
        const value = $price.text();//Rs. 3493
        const numericValue = value.replace(/[^\d]/g, '');
        totalPrice.push(Number(numericValue));//3493

    }).then(() => {
        finalPrice = totalPrice.reduce((acc, num) => num + acc, 0);
        cy.log(finalPrice);
        cart.proceedtoCheckOutBtn().click();
    })

})

Then('the total price should be correct', () => {
    checkout.billingNameLabel().should('be.visible').and('contains.text', testData.billingName);
    checkout.totalPriceLabel().last().then($price => {
        const totalValue = $price.text();
        const totalPrice = Number(totalValue.replace(/[^\d]/g, ''));
        expect(totalPrice).to.eq(finalPrice);
    })

})

When('the user completes the payment', () => {
    login.navLink().contains('Cart').click();
    cart.proceedtoCheckOutBtn().click();
    checkout.placeOrderBtn().click();
    payment.heading().contains('Payment');
    payment.nameTextBox().should('be.visible').type(testData.name);
    payment.cardTextBox().should('be.visible').type(testData.cardNumber);
    payment.cvcTextBox().should('be.visible').type(testData.cvc);
    payment.expiryMonthTextBox().should('be.visible').type(testData.expiryMonth);
    payment.expiryYearTextBox().should('be.visible').type(testData.expiryYear);
    payment.payAndConfirmOrderBtn().click();
    payment.confirmationMessage().should('be.visible').contains('Congratulations! Your order has been confirmed!');
})

Then('the user should be able to download the invoice', () => {
    payment.downloadInvoiceBtn().click();
    cy.task('fileExists', 'cypress/downloads/invoice.txt').should('be.true');
})