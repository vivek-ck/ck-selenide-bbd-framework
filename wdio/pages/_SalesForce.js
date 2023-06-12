import Page from "./_page.js";
import { Key } from "webdriverio";

export default class SalesForce extends Page{

    //Common Selectors for text
    getElementContainingExactText(text, tagName = '*') { return $(`//${tagName}[text() = '${text}']`) }
    getElementContainingPartialText(text, tagName = '*') { return $(`//${tagName}[contains(text(),'${text}')]`) }

    //Common Selectors for elements
    getElementWithAttribute(attribute, attributeValue, tagName = '*') { return $(`//${tagName}[@${attribute} = '${attributeValue}']`)}

    //Common Selector for Iframes
    getIframeWithAttribute(attribute, attributeValue) { return this.getElementWithAttribute(attribute, attributeValue, 'iframe') }

    //Common methods
    async goTo(tabWithText) {
        await this.waitForPageLoad();
        var tab = await $(`//a[@title='${tabWithText}']`);
        await this.jsClick(tab);
        await browser.pause(1000);
    };

    async dropDownLazySelect(element) {
        this.jsClick(await element);
        await browser.pause(500);
        await browser.keys([Key.ArrowDown]);
        await browser.keys([Key.Enter]);
    }
}