import { faker } from '@faker-js/faker';

import Home from "../../pages/home";
import Leads from "../../pages/leads";
import Login from "../../pages/login";
import Accounts from '../../pages/accounts';
import Opportunities from '../../pages/opportunities';
import Applications from '../../pages/applications';

describe("application_creation_v2", () => {
    it("tests application_creation_v2", async () => {
        // const firstName = faker.person.firstName()
        // const lastName = faker.person.lastName()
        // const email = faker.internet.email()
        // const fullName = `${firstName} ${lastName}`;
        await Login.open()
        await Login.loginAsRaUser()

        // await Home.goTo('Leads')

        // await Leads.createNewLead({ firstName: firstName, lastName: lastName, email: email })
        // await Leads.changeLeadStatus('Converted')
        // await Leads.convertLead()
        // await Leads.goToCreatedAccount(fullName)

        // await browser.pause(4000)
        // await Accounts.editBirthDate('01/01/2000')
        // await Accounts.goTo('Opportunities')
        // await Opportunities.openOpportunityWithName(fullName)
        // await Opportunities.modifyNecessaryDetails()
        // await Opportunities.createAndOpenApplication()

        await Home.goTo('Applications')
        let applicationId = 'APP-0000001569';
        let fullName = 'Esperanza Graham';
        // let applicationId = await DataStore.getData('applicationId')
        await Applications.openApplicationWithId(applicationId)

        //await Applications.editLoan()
        // await Applications.addNewCollateral(fullName)
        // await Applications.addParties(fullName)
        await Applications.addCreditApprovalConditions()
        await Applications.addCreditSettlementConditions()
        // await Applications.addTaskListOrigination()
        await Applications.proceedToNext()
        await Applications.logout()
        console.log('100')
    })
})
// it("tests application_creation_v2", async () => {
//     await Login.open()
//     //await Login.loginAsRaUser()

//     //await Home.goTo('Applications')
//     //await Applications.openApplicationWithId('APP-0000001499')
//     // await Applications.addCreditApprovalConditions()
//     // await Applications.addCreditSettlementConditions()
//     // await Applications.addTaskListOrigination()
//     //save task step to be added
//     //proceed to next step to be added
//     //await Applications.logout()
//     await Login.loginAsCreditOfficer()
//     await Home.goTo('Applications')
//     await Applications.acceptAndOpenApplicationWithId('APP-0000001499')
//     // await Applications.openApplicationWithId('APP-0000001499')
//     // await Applications.newComment()
//     // await Applications.creditEvaluation()
//     //proceed to next to be added
//     // await Applications.creditApproval()
//     // await Applications.generateDoc()
//     await Applications.answerApprovalConditions()
    

//     console.log('mshdgvfs')

// })
// })
//APP-0000001499
//APP-0000001569
