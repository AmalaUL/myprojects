const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const requestLoan = require('../../pages/request.loan.page');
const testData = require('../../test-data/request.loan.json');
const shared = require('../../test-data/shared.testdata');

Given('I go to Request Loan page', async function () {
  this.requestLoan = new requestLoan(this.page);
  await this.requestLoan.gotoRequestLoanPage();
})
When('I apply loan with {int} and {int}', async function (loanAmount, downPaymentAmount) {
  await this.requestLoan.applyLoan(loanAmount, downPaymentAmount, shared.accountId);
})
Then('I should see the loan {word}', async function (result) {
  const status = this.page.locator(this.requestLoan.statusLbl);
  //await status.waitFor({ status: 'visible' });
  await expect(status).toBeVisible();
  const actualStatus = await status.innerText();
  await expect(actualStatus).toContain(result);

  await expect(this.page.locator(this.requestLoan.successMessageLbl).first()).toContainText(testData.statusMessage);
  const accountIdLocator = this.page.locator(this.requestLoan.accountIdLink);
  await expect(accountIdLocator).toBeVisible();
  await accountIdLocator.click();
  const accountTypeLocator = this.page.locator(this.requestLoan.accountTypeLbl);
  await accountTypeLocator.waitFor({ state: 'visible' });
  await expect(accountTypeLocator).toHaveText('LOAN');
})
