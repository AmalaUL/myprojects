require('dotenv').config();
const { expect } = require('@playwright/test');
class Login {
    constructor(page) {
        this.page = page;
        this.usernameTxt = 'input[name="username"]';
        this.passwordTxt = 'input[name="password"]';
        this.loginBtn = this.page.getByRole('button', { name: 'Log In' });
        this.accountOverviewLbl = this.page.getByRole('heading', { name: 'Accounts Overview' });
        this.loginErrorMessage = '#rightPanel p.error';
    }
    async goto() {
        await this.page.goto(process.env.APP_URL)
    }
    async enterCredentials(username, password) {
        await this.page.fill(this.usernameTxt, username);
        await this.page.fill(this.passwordTxt, password);
        await this.loginBtn.click();
    }
    async isAccountOverviewVisible() {
        await expect(this.accountOverviewLbl).toBeVisible();
    }
    async isErrorMessageVisible() {
        const error = this.page.locator(this.loginErrorMessage);
        await expect(error).toBeVisible();
        // await expect(error).toHaveText(errorMessage);
    }

}
module.exports = Login;