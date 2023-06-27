import DataStore from "../utils/datastore";
import Retry from "../utils/retry";
import Page from "./_page";
import { Key } from "webdriverio";

export default class SalesForce extends Page {
  
  // Retry strategy initialization
  private retrystrategy = new Retry(1, 2000)
  get retryStrategy() { return this.retrystrategy }

  // DataStorage initialization
  get dataStore() {return DataStore} 

  // Common Selectors for text
  getElementContainingExactText(
    text: string,
    tagName: string = "*"
  ): Promise<WebdriverIO.Element> {
    return $(`//${tagName}[text() = "${text}"]`)
  }

  getElementContainingPartialText(
    text: string,
    tagName: string = "*"
  ): Promise<WebdriverIO.Element> {
    return $(`//${tagName}[contains(text(),"${text}")]`)
  }

  // Common Selectors for elements
  getElementWithAttribute(
    attribute: string,
    attributeValue: string,
    tagName: string = "*"
  ): Promise<WebdriverIO.Element> {
    return $(`//${tagName}[@${attribute} = "${attributeValue}"]`)
  }

  // Common Selector for Iframes
  getIframeWithAttribute(
    attribute: string,
    attributeValue: string
  ): Promise<WebdriverIO.Element> {
    return this.getElementWithAttribute(attribute, attributeValue, "iframe")
  }

  // Common methods
  public async goTo(tabWithText: string): Promise<void> {
    await this.waitForPageLoad()
    await (await $(`//a[@title='${tabWithText}']`)).waitForExist()
    await this.jsClick(await $(`//a[@title='${tabWithText}']`))
    await browser.pause(1000)
  }

  public async dropDownLazySelect(element: WebdriverIO.Element): Promise<void> {
    await this.jsClick(await element)
    await browser.pause(200)
    await browser.keys([Key.ArrowDown])
    await browser.keys([Key.Enter])
    await browser.pause(200)
  }

  public async dropDownSelectByText(
    dropDownElement: WebdriverIO.Element,
    optionText: string
  ): Promise<void> {
    await this.jsClick(await dropDownElement)
    await browser.pause(500)
    const dropDownOption = await $(
      `//lightning-base-combobox-item//span[@title = '${optionText}']`
    )
    await dropDownOption.click()
  }

  public async waitUntilElementDisappears(
    element: WebdriverIO.Element,
    timeoutSec: number = 20
  ): Promise<void> {
    const readyElement = await element;
    await browser.waitUntil(async () => {
      return !(await readyElement.isDisplayed())
    }, {
      timeout: timeoutSec * 1000,
      timeoutMsg: `Element with selector ${readyElement.selector} didn't disappear in the given time: ${timeoutSec} sec`,
    })
  }
}
