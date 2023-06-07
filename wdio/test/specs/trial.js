
import { faker } from '@faker-js/faker';

import home from "../../pages/home.js";
import leads from "../../pages/leads.js";
import login from "../../pages/login.js";
import accounts from '../../pages/accounts.js';
import opportunities from '../../pages/opportunities.js';

describe("application_creation_v2", () => {
    it("tests application_creation_v2", async () => {

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const fullName = `${firstName} ${lastName}`

        await login.open();
        await login.login();
        
        await home.goTo('Leads');

        await leads.createNewLead({firstName: firstName, lastName: lastName, email: email});
        await leads.changeLeadStatus('Converted');
        await leads.convertLead();
        await leads.goToCreatedAccount(fullName);

        await browser.pause(2000);
        await accounts.editBirthDate('01/01/2000');
        await accounts.goTo('Opportunities');
        await opportunities.openOpportunityWithName(fullName);
        await opportunities.modifyNecessaryDetails();
        await opportunities.createApplication();
        console.log('100');
    })
})