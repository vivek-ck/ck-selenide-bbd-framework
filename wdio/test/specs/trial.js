
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

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const fullName = `${firstName} ${lastName}`

        await Login.open();
        await Login.login();
        
        // await Home.goTo('Leads');

        // await Leads.createNewLead({firstName: firstName, lastName: lastName, email: email});
        // await Leads.changeLeadStatus('Converted');
        // await Leads.convertLead();
        // await Leads.goToCreatedAccount(fullName);

        // await browser.pause(4000);
        // await Accounts.editBirthDate('01/01/2000');
        await Accounts.goTo('Opportunities');
        await Opportunities.openOpportunityWithName('Vivianne Fay');
        await Opportunities.modifyNecessaryDetails();
        await Opportunities.createAndOpenApplication();
        
        await Home.goTo('Applications');
        await Applications.openApplicationWithId(await DataStore.getData('applicationId'));
        await Applications.editLoan();
        await Applications.addNewCollateral();
        await Applications.addParties('Vivianne Fay');
        console.log('100');
    })
})