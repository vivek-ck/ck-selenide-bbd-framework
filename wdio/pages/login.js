import Page from "./_page.js";

class LoginPage extends Page {

    get username() { return $('#username') }
    get password() { return $('#password') }
    get submitBtn() { return $('#Login') }

    async open() {
        await browser.url("https://kooyonggroup--kguat2.sandbox.my.salesforce.com/")
        await browser.maximizeWindow()
    }

    async login(username, password = 'welcome@123') {
        await this.username.setValue(username)
        await this.password.setValue(password)
        await this.submitBtn.click()
    }

    async loginAsRaUser() {
        await this.login('niladri.acharya@cloudkaptan.com.kguat2.ra')
    }
    async loginAsCreditOfficer() {
        await this.login('niladri.acharya@cloudkaptan.com.kguat2.credit')
    }
    
}

export default new LoginPage()