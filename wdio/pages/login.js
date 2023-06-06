import Page from "./_page.js";

class LoginPage extends Page {

    get username() { return $('#username') }
    get password() { return $('#password') }
    get submitBtn() { return $('#Login') }

    async open() {
        await browser.url("https://kooyonggroup--kguat2.sandbox.my.salesforce.com/");
    }

    async login() {
        await this.username.setValue('niladri.acharya@cloudkaptan.com.kguat2.ra');
        await this.password.setValue('welcome@123');
        await this.submitBtn.click();
    }
}

export default new LoginPage();