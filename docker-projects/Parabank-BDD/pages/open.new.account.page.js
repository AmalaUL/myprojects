const { expect } = require('@playwright/test');

class OpenNewAccount {
    constructor(page) {
        this.page = page;
        this.openNewAccountLnk = this.page.getByRole('link', { name: 'Open New Account' });
        this.heading = this.page.getByRole('heading', { name: 'Open New Account' });
        this.typeOfAccountDrpdwn = 'select#type';
        this.fromAccountId = 'select#fromAccountId';
        this.openNewAccountBtn = this.page.getByRole('button', { name: 'Open New Account' });
        this.accountResultLbl = '#openAccountResult p';
        this.newAccountId = 'a#newAccountId';
    }
    async goToOpenNewAccount() {
        await this.openNewAccountLnk.click();
        await expect(this.heading).toBeVisible();
    }
    async accountCreation(fromAccountId) {
        await this.page.locator(this.typeOfAccountDrpdwn).selectOption({ label: 'SAVINGS' });
        await this.page.locator(this.fromAccountId).selectOption({ label: String(fromAccountId) });
        await this.openNewAccountBtn.click();
    }
    // async resultOfAccountCreation(message) {
    //     await expect(this.page.locator(this.accountResultLbl)).toHaveText(message);
    //     const accountId = this.page.locator(this.newAccountId).textContent();
    //     return accountId;
    // }
}
module.exports = OpenNewAccount;