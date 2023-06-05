import Page from "./_Page.js";
import { Key } from "webdriverio";

export default class SalesForce extends Page{

    async goTo(tabWithText) {
        var tab = await $(`//a[@title='${tabWithText}']`);
        
        await browser.waitUntil(
            async () => await tab.isDisplayed() === true,
            {
                timeout: 10000,
                timeoutMsg: `${tab} is not displayed.`
            }
        );

        await browser.execute(async (el) => {
            await el.click();
        },tab);
    };

    async dropDownLazySelect(element) {
        this.executeClick(await element);
        await browser.pause(500);
        await browser.keys([Key.ArrowDown]);
        await browser.keys([Key.Enter]);
    }
}