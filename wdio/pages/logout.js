import SalesForce from "./_salesForce.js";

class Logout extends SalesForce {

    get userProfile() { return $("//img[@title='User']") }
    get logoutText() { return $("//a[text()='Log Out']") }


    async logout() {
        // await browser.refresh()
        await browser.switchToFrame(null)

        // const currentWindowHandle = await browser.getWindowHandle()
        // await browser.switchToWindow(currentWindowHandle)
        // const currentFrameName = await browser.getTitle()
        // console.log(`#############- ${currentFrameName}`)

        //await this.userProfile.waitForDisplayed()
        await browser.pause(5000)
        await this.jsClick(this.userProfile)
        await this.logoutText.waitForDisplayed()
        await this.jsClick(this.logoutText)
    }
}

export default new Logout()