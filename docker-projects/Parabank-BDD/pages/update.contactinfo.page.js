const { expect } = require('@playwright/test');

class UpdateContactInfo {
    constructor(page) {
        this.page = page;
        this.updateContactInfoLnk = this.page.getByRole('link', { name: 'Update Contact Info' });
        this.beforeHeading = this.page.getByRole('heading', { name: 'Update Profile' });
        this.firstNameTxt = '[name="customer.firstName"]';
        this.lastNameTxt = '[name="customer.lastName"]';
        this.addressTxt = '[name="customer.address.street"]';
        this.cityTxt = '[name="customer.address.city"]';
        this.stateTxt = '[name="customer.address.state"]';
        this.zipCodeTxt = '[name="customer.address.zipCode"]';
        this.phoneNumberTxt = '[name="customer.phoneNumber"]';
        this.updateProfileBtn = this.page.getByRole('button', { name: 'Update Profile' });
        this.afterHeading = this.page.getByRole('heading', { name: 'Profile Updated' });
        this.message = '#updateProfileResult p';
    }
    async gotoUpdateContactInfoPage() {
        await this.updateContactInfoLnk.click();
        await expect(this.beforeHeading).toBeVisible();
    }
    async updateProfile(firstName, lastName, address, city, state, zipCode, phoneNumber) {
        await expect(this.page.locator(this.firstNameTxt)).toBeVisible();
        await this.page.locator(this.firstNameTxt).clear();
        await this.page.locator(this.firstNameTxt).type(firstName);
        await this.page.locator(this.lastNameTxt).clear();
        await this.page.locator(this.lastNameTxt).type(lastName);
        await expect(this.page.locator(this.addressTxt)).toBeVisible();
        await this.page.locator(this.addressTxt).clear();
        await this.page.locator(this.addressTxt).type(address);
        await this.page.locator(this.cityTxt).clear();
        await this.page.locator(this.cityTxt).type(city);
        await this.page.locator(this.stateTxt).clear();
        await this.page.locator(this.stateTxt).type(state);
        await this.page.locator(this.zipCodeTxt).clear();
        await this.page.locator(this.zipCodeTxt).type(zipCode);
        await expect(this.page.locator(this.phoneNumberTxt)).toBeVisible();
        await this.page.locator(this.phoneNumberTxt).clear()
        await this.page.locator(this.phoneNumberTxt).type(phoneNumber);
        await this.page.locator(this.phoneNumberTxt).press('Tab');
        await expect(this.updateProfileBtn).toBeEnabled();
        await this.updateProfileBtn.click();
    }


}
module.exports = UpdateContactInfo;