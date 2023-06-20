
/**
 * This class is to configure the retry strategy. 
 * @param {Function} mainMethod   this is the method which will be retried if it fails.
 * @param {Function} beforeMethod this is used to setup the stage for the re-execution of the main method after it fails.
 * @param {Function} afterMethod  this is used to exit from the failed state gracefully to a recoverable state upon which the @param beforeMethod will setup/
 * 
 * Usage:
   ```
    retryStrategy = new Retry(2, 4000);
    await retryStrategy.retry(
        async () => {
            await Login.open();
            await Login.login();
        },
        async () => { 
            await console.log("Executing Before Method");
            await Login.open();
        },
        async () => {
            await console.log("Executing After Method");
            await browser.reloadSession();
        }
    );
  ```
 */


export default class Retry {

    constructor(retryCount = 1, retryingAfterDuration = 5000) {
        this.retryCount = retryCount;
        this.retryingAfterDuration = retryingAfterDuration;
    }

    /**
     * Asynchronously retries the main method for a specified number of attempts.
     * 
     * @param {Function} mainMethod - The main method to be retried.
     * @param {Function} [before] - An optional function to be executed before each retry attempt.
     * @param {Function} [after] - An optional function to be executed after each failed attempt.
     * @param {number} [retries=this.retryCount] - The maximum number of retry attempts allowed.
     * @param {number} [retryingAfterDuration=this.retryingAfterDuration] - The duration to wait between retry attempts in milliseconds.
     * @throws {string} - Throws an error if the main method fails after all retry attempts.
     */
    async retry(mainMethod, before = () => { }, after = () => { }, retries = this.retryCount, retryingAfterDuration = this.retryingAfterDuration) {
        let tries = 0;
        while (tries <= retries) {
            try {
                console.log(`---------------Executing Method | Attempt: ${tries + 1}---------------`);
                await mainMethod();
                break;
            } catch (err) {
                if (tries == retries) {
                    throw `Execution Failed with ${tries + 1} attempts.`
                }
                console.log(err);

                console.log(`\n---------------After Method---------------`);
                await after();
                console.log(`---------------Retrying after ${retryingAfterDuration} sec | Retries: ${tries}---------------`);
                await new Promise(resolve => setTimeout(resolve, retryingAfterDuration));
                console.log(`---------------Before Method---------------`);
                await before();
            }
            tries++;
        }
    }
}