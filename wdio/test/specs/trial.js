
import { faker } from '@faker-js/faker';

import Home from "../../pages/home.js";
import Leads from "../../pages/leads.js";
import Login from "../../pages/login.js";
import Accounts from '../../pages/accounts.js';
import Opportunities from '../../pages/opportunities.js';
import Applications from '../../pages/applications.js';
import DataStore from '../../utils/datastore.js';

describe("application_creation_v2", () => {
    it("tests application_creation_v2", async () => {

        await retry(
            async () => {
                await Login.open();
                await retry(
                    async () => {await Login.login()},
                    async () => {await Login.open()}
                );
            },
            async () => { await console.log("Executing Before Method") },
            async () => {
                await console.log("Executing After Method");
                await browser.reloadSession();
            }
        );

        // const firstName = faker.person.firstName();
        // const lastName = faker.person.lastName();
        // const email = faker.internet.email();
        // let fullName = `${firstName} ${lastName}`

        // await Login.open();
        // await Login.login();

        // await Home.goTo('Leads');

        // await Leads.createNewLead({firstName: firstName, lastName: lastName, email: email});
        // await Leads.changeLeadStatus('Converted');
        // await Leads.convertLead();
        // await Leads.goToCreatedAccount(fullName);

        // await browser.pause(4000);
        // await Accounts.editBirthDate('01/01/2000');
        // await Accounts.goTo('Opportunities');
        // await Opportunities.openOpportunityWithName(fullName);
        // await Opportunities.modifyNecessaryDetails();
        // await Opportunities.createAndOpenApplication();

        // await Home.goTo('Applications');
        // //let applicationId = 'APP-0000001429';
        // let applicationId = await DataStore.getData('applicationId');
        // await Applications.openApplicationWithId(applicationId);
        // await Applications.editLoan();
        // await Applications.addNewCollateral(fullName);
        // await Applications.addParties(fullName);
        console.log('100');
    })
})

async function retry(mainMethod, before = () => { }, after = () => { }, retries = 1) {
    let tries = 0;
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

            console.log(`---------------Retrying: ${tries}---------------`);

            console.log(`---------------Before Method---------------`);
            await before();
        }

        tries++;
    }
}