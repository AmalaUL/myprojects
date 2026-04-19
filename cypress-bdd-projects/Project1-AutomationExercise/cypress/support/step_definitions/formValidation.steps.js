import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-file-upload';
import Contacts from "../Pages/Contacts";
import testData from '../../fixtures/contacts.json';
import Login from '../Pages/Login';


const contacts = new Contacts();
const login = new Login();

When('the user enters {string} in the email field', (email) => {
    login.navLink().contains('Contact us').click();
    contacts.nameTextBox().clear().type(testData.name);
    const emailInput = contacts.emailTextBox();
    emailInput.clear();
    if (email) {
        emailInput.type(email);
    }
    //contacts.emailTextBox().clear().type(`{backspace}` + `${email} `);
    contacts.subjectTextBox().clear().type(testData.subject);
    contacts.messageTextBox().clear().type(testData.message)
    contacts.chooseFileBtn().attachFile('./TestFiles/invoice.txt');
})
When('the user submits the form', () => {
    contacts.submitBtn().click();
})
Then('{string} should be displayed', (result) => {
    cy.checkToolTipMessage(contacts.emailTextBox(), result)
})