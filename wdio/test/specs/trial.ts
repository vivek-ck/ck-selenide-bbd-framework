import { faker } from '@faker-js/faker'

import Home from "../../pages/home"
import Leads from "../../pages/leads"
import Login from "../../pages/login"
import Accounts from '../../pages/accounts'
import Opportunities from '../../pages/opportunities'
import Applications from '../../pages/applications'
import customerDataSchema from '../../utils/excelSchema/customerData.json'
import customerDataType from '../../utils/excelSchema/customerData'
import excelDataProvider from '../../utils/excelDataProvider'


describe("application_creation_v2", async () => {
    const excelData = excelDataProvider('automation.xlsx', customerDataSchema).map((row: any) => row as customerDataType)

    before('Login', async () => {
        await Login.open();
        await Login.login();
    })

    excelData.forEach(({
        scenarioNumber,
        product,
        guarantor,
        repaymentType,
        rateType,
        balloon,
        borrowerRating,
        securityTypes,
        loanPurpose,
        loanUse,
        termMonths,
        amount,
        approvalConditions,
        settlementConditions,
        fees,
        creditComments,
        opsComments,
    }) => {

        it(`Creates valid data for entry ${scenarioNumber}`, async () => {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email();
            const fullName = `${firstName} ${lastName}`;

            await Login.open();
            await Home.goTo('Leads');

            await Leads.createNewLead({ firstName: firstName, lastName: lastName, email: email });
            await Leads.changeLeadStatus('Converted');
            await Leads.convertLead();
            await Leads.goToCreatedAccount(fullName);

            await browser.pause(4000);
            await Accounts.editBirthDate('01/01/2000');
            await Accounts.goTo('Opportunities');
            await Opportunities.openOpportunityWithName(fullName);
            await Opportunities.modifyNecessaryDetails(product, amount, termMonths, loanUse);
            await Opportunities.createAndOpenApplication();

            await Applications.editLoan();
            await Applications.addNewCollateral(fullName);
            await Applications.addParties(fullName);
        });
    });


    // data.forEach(({ scenarioNumber, product, guarantor, repaymentType, rateType, balloon, borrowerRating, securityTypes, loanPurpose, loanUse, termMonths, amount, approvalConditions, settlementConditions, fees, creditComments, opsComments }) => {

    // 
    // })

    // it("tests application_creation_v2", async () => {
    //     const firstName = faker.person.firstName();
    //     const lastName = faker.person.lastName();
    //     const email = faker.internet.email();
    //     const fullName = `${firstName} ${lastName}`;
    //     await Login.open();
    //     await Login.login();
    //     await Home.goTo('Leads');

    //     await Leads.createNewLead({ firstName: firstName, lastName: lastName, email: email });
    //     await Leads.changeLeadStatus('Converted');
    //     await Leads.convertLead();
    //     await Leads.goToCreatedAccount(fullName);

    //     await browser.pause(4000);
    //     await Accounts.editBirthDate('01/01/2000');
    //     await Accounts.goTo('Opportunities');
    //     await Opportunities.openOpportunityWithName(fullName);
    //     await Opportunities.modifyNecessaryDetails();
    //     await Opportunities.createAndOpenApplication();

    //     await Applications.editLoan();
    //     await Applications.addNewCollateral(fullName);
    //     await Applications.addParties(fullName);
    //     await Applications.addCreditApprovalConditions();
    //     await Applications.addCreditSettlementConditions();
    //     await Applications.addTaskList();
    //     console.log('100');
    // });
});
