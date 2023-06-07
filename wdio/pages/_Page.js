export default class Page {
    async scrollTo(element) {
        await browser.execute("arguments[0].scrollIntoView({ block: 'center', inline: 'nearest' })", await element);
    }

    /**
     * Use this method if the WebdriverIO click is not working
     * @param {*} element the web element that needs to be clicked, should be defined by $('xpath')
     */
    async jsClick(element) {
        var clickElement = await element;
        await clickElement.waitForExist({ timeout: 15000, timeoutMsg: `${clickElement} didn't exist after 15 seconds.` });

        await browser.execute(async (el) => {
            await el.click();
        }, await clickElement);
    }
      
}