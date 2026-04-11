const { Before, After } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000); // 60 seconds

Before(async function () {
    await this.launchBrowser();

})

After(async function (scenario) {
    console.log("AFTER HOOK START");
    console.log("STATUS:", scenario.result?.status);
    console.log("ATTACH TYPE:", typeof this.attach);
    try {
        if (scenario.result.status === 'FAILED') {
            console.log("Inside FAILED block");
            const filePath = `reports/screenshots/${Date.now()}.png`;

            const screenshot = await this.page.screenshot({ path: filePath });
            console.log("Screenshot captured");
            await this.attach(screenshot, 'image/png');
            console.log("Screenshot attached");
        }
    } catch (error) {
        console.log("Screenshot failed:", error);
    } finally {
        await this.closeBrowser();
    }


})