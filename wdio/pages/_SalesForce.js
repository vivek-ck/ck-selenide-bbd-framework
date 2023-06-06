import Page from "./_page.js";
import { Key } from "webdriverio";

export default class SalesForce extends Page{

    //Common Selectors
    getElementContainingExactText(text, tagName = '*') { return $(`//${tagName}[text() = '${text}']`) }
    getElementContainingPartialText(text, tagName = '*') { return $(`//${tagName}[contains(text(),'${text}')]`) }

    //Common methods
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
        this.jsClick(await element);
        await browser.pause(500);
        await browser.keys([Key.ArrowDown]);
        await browser.keys([Key.Enter]);
    }
}