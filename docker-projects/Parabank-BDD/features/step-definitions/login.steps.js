require('dotenv').config();

const { Given, When, Then } = require('@cucumber/cucumber');
const Login = require('../../pages/login.page');
const loginTestData = require('../../test-data/login.json')
const { expect } = require('@playwright/test');

Given('I open the parabank login page', async function () {
    this.login = new Login(this.page);
    await this.login.goto();
})

When('I enter valid username and password', async function () {
    await this.login.enterCredentials(process.env.APP_USERNAME, process.env.APP_PASSWORD);
})

Then('I see account overview page', async function () {
    await this.login.isAccountOverviewVisible();
})

When('I enter invalid username and password', async function () {
    await this.login.enterCredentials(loginTestData.invalidUserName, loginTestData.invalidPassword);
})

Then('I see an error message', async function () {
    await this.login.isErrorMessageVisible();
})