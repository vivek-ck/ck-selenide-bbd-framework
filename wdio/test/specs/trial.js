
import { faker } from '@faker-js/faker';

import home from "../../pages/home.js";
import leads from "../../pages/leads.js";
import login from "../../pages/login.js";

describe("application_creation_v2", () => {
    it("tests application_creation_v2", async () => {

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();

        await login.open();
        await login.login();
        await home.goTo('Leads');
        await leads.createNewLead({firstName: firstName, lastName: lastName, email: email});
        await browser.$(`//lightning-formatted-name[contains(text(), '${firstName} ${lastName}')]`).waitForExist({timeout: 20000});
    })
})