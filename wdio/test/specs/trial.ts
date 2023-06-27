import { faker } from '@faker-js/faker';

import Home from "../../pages/home";
import Leads from "../../pages/leads";
import Login from "../../pages/login";
import Accounts from '../../pages/accounts';
import Opportunities from '../../pages/opportunities';
import Applications from '../../pages/applications';
import DataStore from '../../utils/datastore';

describe("application_creation_v2", () => {
    it("tests application_creation_v2", async () => {

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        let fullName = `${firstName} ${lastName}`;
        await Login.open();
        await Login.login();

        await Home.goTo('Leads');

        await Leads.createNewLead({ firstName: firstName, lastName: lastName, email: email });
        await Leads.changeLeadStatus('Converted');
        await Leads.convertLead();
        await Leads.goToCreatedAccount(fullName);

        await browser.pause(4000);
        await Accounts.editBirthDate('01/01/2000');
        await Accounts.goTo('Opportunities');
        await Opportunities.openOpportunityWithName(fullName);
        await Opportunities.modifyNecessaryDetails();
        await Opportunities.createAndOpenApplication();

        // await Home.goTo('Applications');
        // let applicationId = 'APP-0000001543';
        // // let applicationId = await DataStore.getData('applicationId');
        // await Applications.openApplicationWithId(applicationId);
        
        await Applications.editLoan();
        await Applications.addNewCollateral(fullName);
        await Applications.addParties(fullName);
        await Applications.addCreditApprovalConditions();
        await Applications.addCreditSettlementConditions();
        await Applications.addTaskList();
        console.log('100');
    });
});

//APP-0000001499