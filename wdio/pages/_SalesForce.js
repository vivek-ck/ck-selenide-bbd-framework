import DataStore from "../utils/datastore.js";
import Page from "./_page.js";
import { Key } from "webdriverio";

export default class SalesForce extends Page{

    //DataStorage initialization
    dataStore = DataStore;

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
        await (await $(`//a[@title='${tabWithText}']`)).waitForExist();
        await this.jsClick(await $(`//a[@title='${tabWithText}']`));
        await browser.pause(1000);
    };

    async dropDownLazySelect(element) {
        await this.jsClick(await element);
        await browser.pause(700);
        await browser.keys([Key.ArrowDown]);
        await browser.keys([Key.Enter]);
        await browser.pause(700);
    }

    async dropDownSelectByText(dropDownElement, optionText) {
        await this.jsClick(await dropDownElement);
        await browser.pause(500);
        
        let dropDownOption = await $(`//lightning-base-combobox-item//span[@title = '${optionText}']`);
        await dropDownOption.click();
    }
}