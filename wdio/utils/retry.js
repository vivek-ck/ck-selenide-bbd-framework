export default class Retry {

    constructor(retryCount = 1, retryingAfterDuration = 5000) {
        this.retryCount = retryCount;
        this.retryingAfterDuration = retryingAfterDuration;
    }

    async retry(mainMethod, before = () => { }, after = () => { }, retries = this.retryCount, retryingAfterDuration = this.retryingAfterDuration) {
        let tries = 1;
        while (tries <= retries) {
            try {
                console.log(`---------------Executing Method | Attempt: ${tries}---------------`);
                await mainMethod();
                break;
            } catch (err) {
                if (tries == retries) {
                    throw `Execution Failed with ${tries} attempts.`
                }
                console.log(err);

                console.log(`\n---------------After Method---------------`);
                await after();
                console.log(`---------------Retrying after ${retryingAfterDuration} sec: ${tries}---------------`);
                await new Promise(resolve => setTimeout(resolve, retryingAfterDuration));
                console.log(`---------------Before Method---------------`);
                await before();
            }

            tries++;
        }
    }
}