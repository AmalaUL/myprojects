const { expect } = require('@playwright/test');

class RequestLoan {
    constructor(page) {
        this.page = page;
        this.requestLoanLink = this.page.getByRole('link', { name: 'Request Loan' });
        this.requestLoanTitle = this.page.getByRole('heading', { name: 'Apply for a Loan' });
        this.loanAmountTxt = 'input#amount';
        this.downPaymentTxt = 'input#downPayment';
        this.fromAccountDrpdwn = 'select#fromAccountId';
        this.applyNowBtn = this.page.getByRole('button', { name: 'Apply Now' });
        this.statusLbl = 'td:has-text("Approved")';
        this.successMessageLbl = 'div#loanRequestApproved p';
        this.accountIdLink = 'a#newAccountId';
        this.accountTypeLbl = 'td#accountType';
    }
    async gotoRequestLoanPage() {
        await this.requestLoanLink.click();
        await expect(this.requestLoanTitle).toBeVisible();
    }
    async applyLoan(loanAmount, downPaymentAmount, fromAccountNo) {
        await this.page.locator(this.loanAmountTxt).fill(String(loanAmount));
        await this.page.locator(this.downPaymentTxt).fill(String(downPaymentAmount));
        await this.page.locator(this.fromAccountDrpdwn).selectOption({ label: String(fromAccountNo) });
        await this.applyNowBtn.click();
    }

}
module.exports = RequestLoan;