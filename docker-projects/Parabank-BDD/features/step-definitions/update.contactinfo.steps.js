const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const UpdateContactInfo = require('../../pages/update.contactinfo.page')

Given('I go to update contact info page', async function () {
    this.updateContactInfo = new UpdateContactInfo(this.page);
    await this.updateContactInfo.gotoUpdateContactInfoPage();
})
When('I update profile form with', async function (datatable) {
    const data = datatable.hashes()[0];
    await this.updateContactInfo.updateProfile(data.firstName, data.lastName, data.address, data.city, data.state, data.zipCode, data.phone);

})
Then('I should see sucessful message', async function (datatable) {
    const data = datatable.rowsHash();
    const heading = this.updateContactInfo.afterHeading;
    await heading.waitFor({ state: 'visible' });
    await expect(heading).toBeVisible();
    const messageLocator = this.page.locator(this.updateContactInfo.message);
    await expect(messageLocator).toBeVisible();

    const actualMessage = await messageLocator.innerText();
    await expect(actualMessage).toBe(data.message);
})