import DataStore from "../utils/datastore.js";
import Retry from "../utils/retry.js";
import Page from "./_page.js";
import { Key } from "webdriverio";

export default class SalesForce extends Page {

    //DataStorage initialization
    dataStore = DataStore;

    //Retry strategy initialization
    retryStrategy = new Retry(1, 2000)

    //Common Selectors for text
    getElementContainingExactText(text, tagName = '*') { return $(`//${tagName}[text() = "${text}"]`) }
    getElementContainingPartialText(text, tagName = '*') { return $(`//${tagName}[contains(text(),"${text}")]`) }

    //Common Selectors for elements
    getElementWithAttribute(attribute, attributeValue, tagName = '*') { return $(`//${tagName}[@${attribute} = "${attributeValue}"]`) }

    //Common Selector for Iframes
    getIframeWithAttribute(attribute, attributeValue) { return this.getElementWithAttribute(attribute, attributeValue, 'iframe') }

    //Common methods
    async goTo(tabWithText) {
        await this.waitForPageLoad()
        await (await $(`//a[@title='${tabWithText}']`)).waitForExist()
        await this.jsClick(await $(`//a[@title='${tabWithText}']`))
        await browser.pause(1000)
    };

    async dropDownLazySelect(element) {
        await this.jsClick(await element)
        await browser.pause(200)
        await browser.keys([Key.ArrowDown])
        await browser.keys([Key.Enter])
        await browser.pause(200)
    }

    async dropDownSelectByText(dropDownElement, optionText) {
        await this.jsClick(await dropDownElement)
        await browser.pause(500)
        let dropDownOption = await $(`//lightning-base-combobox-item//span[@title = '${optionText}']`)
        await dropDownOption.click()
    }

    async waitUntilElementDisappears(element, timeoutSec = 20) {
        let readyElement = await element;
        await browser.waitUntil(async () => {
            return !(await readyElement.isDisplayed())
        }, {
            timeout: timeoutSec * 1000,
            timeoutMsg: `Element with selector ${readyElement.selector} didn't disappear in the given time: ${timeoutSec} sec`
        })
    }
}