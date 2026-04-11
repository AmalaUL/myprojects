const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

class CustomWorld extends World {
    constructor(options) {
        super(options);//keep cucumber features
        this.browser = null;
        this.context = null;
        this.page = null;
    }
    async launchBrowser() {
        this.browser = await chromium.launch();
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }
    async closeBrowser() {
        if (this.page) await this.page.close();
        if (this.context) await this.context.close();
        if (this.browser) await this.browser.close();
    }
}
setWorldConstructor(CustomWorld);