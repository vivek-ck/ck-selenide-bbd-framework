export default class Page {

    /**
     * Use this method if the WebdriverIO click is not working
     * @param {*} element the web element that needs to be clicked, should be defined by $('xpath')
     */
    async scrollToView(element) {
        var Element = await element;
        await Element.waitForExist({ timeout: 15000, timeoutMsg: `${element} didn't exist after 15 seconds.` });

        await browser.execute(async (el) => {
            await el.scrollIntoView();
        }, await Element);
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

    async #checkPageLoad(timeoutSec) {
        await browser.waitUntil(
            async () => await browser.execute( 
                () => document.readyState === 'complete'
            ),
            {
                timeout: timeoutSec * 1000,
                timeoutMsg: 'Page Failed To Load',
                interval: 2000
            }
        );
    }

    async waitForPageLoad( timeoutSec = 30, retries = 2 ) {
        let tries = 1;
        while (tries <= retries) {
            try {
                console.log(`---------------Waiting for the page to load | Attempt: ${tries}---------------`);
                await this.#checkPageLoad(timeoutSec);
                console.log(`---------------Page loaded successfully---------------`);
                break;
            } catch (err) {
                if (tries == retries) {
                    throw `Page Load failed after ${tries} attempts with timeout`
                }
                console.log(err);
                console.log(`---------------Retrying: ${tries}---------------`);
            }
            console.log(`---------------Refreshing Page---------------`);
            await browser.refresh();
            tries++;
        }
    }

    async forceReload() {
        await browser.execute(
            async () => await window.location.reload(true)
        );
        await this.#checkPageLoad();
    }



    async #reloadIfElementNotInState(element, elementState, retryStrategy = {timeoutSec: 10, retries: 4}) {
        let duration = retryStrategy.timeoutSec * 1000;
        let resolvedElement = await element;
        let tries = 1;

        while (tries <= retryStrategy.retries) {
            try {
                console.log(`---------------Waiting for the element to be ${conditon} | Attempt: ${tries}---------------`);
                switch(elementState) {
                    case 'exists':
                        await resolvedElement.waitForExist({ timeout: duration });
                        break;
                    case 'clickable':
                        await resolvedElement.waitForClickable({ timeout: duration });
                        break;
                    case 'displayed':
                        await resolvedElement.waitForDisplayed({ timeout: duration });
                        break;
                }
                break;
            } catch (err) {
                if (tries == retries) {
                    throw `Element not found after ${tries} attempts.`
                }
                console.log(err);
                console.log(`---------------Retrying: ${tries}---------------`);
            }

            console.log(`---------------Refreshing Page---------------`);
            await this.forceReload();

            // Kind of exponential backoff
            duration += 15;

            tries++;
        }
    }

    async reloadIfElementNotClickable(element, timeoutStrategy = {timeoutSec: 20, retries: 4}) {
        let elementState = 'clickable';
        await this.#reloadIfElementNotInState(element, elementState, timeoutStrategy);
    }

    async reloadIfElementNotPresent(element, timeoutStrategy = {timeoutSec: 20, retries: 4}) {
        let elementState = 'exists';
        await this.#reloadIfElementNotInState(element, elementState, timeoutStrategy);
    }

    async reloadIfElementNotDisplayed(element, timeoutStrategy = {timeoutSec: 20, retries: 4}) {
        let elementState = 'displayed';
        await this.#reloadIfElementNotInState(element, elementState, timeoutStrategy);
    }

}