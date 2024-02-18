import { faker } from '@faker-js/faker'

describe('Create Issue API', () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    };

    beforeEach(() => {
        cy.api_deleteProjects();
        cy.login();
    });

    it('successfuly', () => {
        cy.api_createIssue(issue).then(res => {
            expect(res.status).to.equal(201)
        });
    });
});