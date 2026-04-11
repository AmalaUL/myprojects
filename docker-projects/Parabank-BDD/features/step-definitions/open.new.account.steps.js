const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const openNewAccount = require('../../pages/open.new.account.page');
const testData = require('../../test-data/open.new.account.json');
const shared = require('../../test-data/shared.testdata');

Given('I go to Open new account page', async function () {
    this.openNewAccount = new openNewAccount(this.page);
    await this.openNewAccount.goToOpenNewAccount();
})
When('I select account type and open new account', async function () {
    await this.openNewAccount.accountCreation(testData.fromAccountId);
})
Then('I should see success message', async function () {
    await expect(this.page.locator(this.openNewAccount.accountResultLbl).first()).toHaveText(testData.message);
    const idLocator = this.page.locator(this.openNewAccount.newAccountId);
    await idLocator.waitFor({ state: 'visible' });
    const accountId = await idLocator.innerText();
    shared.accountId = accountId;
    console.log('Stored account ID:', shared.accountId);
})
