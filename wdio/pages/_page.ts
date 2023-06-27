export default class Page {
  /**
   * Use this method if the WebdriverIO click is not working
   * @param element the web element that needs to be clicked, should be defined by $('xpath')
   */
  async scrollToView(element: WebdriverIO.Element) {
    const Element = element;
    await Element.waitForExist({ timeout: 15000, timeoutMsg: `${element} didn't exist after 15 seconds.` })

    await browser.execute(async (el: WebdriverIO.Element) => {
      await el.scrollIntoView()
    }, Element)
  }

  /**
   * Use this method if the WebdriverIO click is not working
   * @param element the web element that needs to be clicked, should be defined by $('xpath')
   */
  async jsClick(element: WebdriverIO.Element) {
    const clickElement = element;
    await clickElement.waitForExist({ timeout: 15000, timeoutMsg: `${clickElement} didn't exist after 15 seconds.` })

    await browser.execute(async (el: WebdriverIO.Element) => {
      await el.click()
    }, clickElement)
  }

  private async checkPageLoad(timeoutSec: number) {
    await browser.waitUntil(
      async () => await browser.execute(() => document.readyState === 'complete'),
      {
        timeout: timeoutSec * 1000,
        timeoutMsg: 'Page Failed To Load',
        interval: 2000
      }
    )
  }

  async waitForPageLoad(timeoutSec = 30, retries = 2) {
    let tries = 1;
    while (tries <= retries) {
      try {
        console.log(`---------------Waiting for the page to load | Attempt: ${tries}---------------`)
        await this.checkPageLoad(timeoutSec)
        console.log(`---------------Page loaded successfully---------------`)
        break;
      } catch (err) {
        if (tries === retries) {
          throw `Page Load failed after ${tries} attempts with timeout`;
        }
        console.log(err)
        console.log(`---------------Retrying: ${tries}---------------`)
      }
      console.log(`---------------Refreshing Page---------------`)
      await browser.refresh()
      tries++;
    }
  }

  async forceReload() {
    await browser.execute(async () => window.location.reload())
    await this.checkPageLoad(10)
  }

  private async reloadIfElementNotInState(element: WebdriverIO.Element,
    elementState: string,
    retryStrategy: { timeoutSec: number, retries: number }
  ) {
    let duration = retryStrategy.timeoutSec * 1000;
    const retries = retryStrategy.retries;
    const resolvedElement = element;
    let tries = 1;

    while (tries <= retries) {
      try {
        console.log(`---------------Waiting ${duration} sec for the element to ${elementState} | Attempt: ${tries} ---------------`)
        switch (elementState) {
          case 'exists':
            await resolvedElement.waitForExist({ timeout: duration })
            break;
          case 'clickable':
            await resolvedElement.waitForClickable({ timeout: duration })
            break;
          case 'displayed':
            await resolvedElement.waitForDisplayed({ timeout: duration })
            break;
        }
        break;
      } catch (err) {
        if (tries === retries) {
          throw `Element not found after ${tries} attempts.`;
        }
        console.log(err)
        console.log(`---------------Retrying: ${tries}---------------`)
      }

      console.log(`---------------Refreshing Page---------------`)
      await this.forceReload()

      // Kind of exponential backoff by adding 10s each iteration to the duration
      duration += 10000;

      tries++;
    }
  }

  async reloadIfElementNotClickable(element: WebdriverIO.Element,
    timeoutStrategy: { timeoutSec: number, retries: number } = { timeoutSec: 10, retries: 4 }
  ) {
    const elementState = 'clickable';
    await this.reloadIfElementNotInState(element, elementState, timeoutStrategy)
  }

  async reloadIfElementNotPresent(element: WebdriverIO.Element,
    timeoutStrategy: { timeoutSec: number, retries: number } = { timeoutSec: 10, retries: 4 }
  ) {
    const elementState = 'exists';
    await this.reloadIfElementNotInState(element, elementState, timeoutStrategy)
  }

  async reloadIfElementNotDisplayed(element: WebdriverIO.Element,
    timeoutStrategy: { timeoutSec: number, retries: number } = { timeoutSec: 10, retries: 4 }
  ) {
    const elementState = 'displayed';
    await this.reloadIfElementNotInState(element, elementState, timeoutStrategy)
  }
}