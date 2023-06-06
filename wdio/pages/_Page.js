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
        await browser.waitUntil(
            async () => await clickElement.isDisplayed() === true,
            {
                timeout: 10000,
                timeoutMsg: `${clickElement} is not displayed.`
            }
        );

        await browser.execute(async (el) => {
            await el.click();
          }, await clickElement);
    }
}