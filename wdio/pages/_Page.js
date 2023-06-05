// _Page.js
export default class Page {
    async scrollTo(element) {
        await browser.execute("arguments[0].scrollIntoView({ block: 'center', inline: 'nearest' })", await element);
    }

    async executeClick(element) {
        await browser.execute(async (el) => {
            await el.click();
          }, await element);
    }
}