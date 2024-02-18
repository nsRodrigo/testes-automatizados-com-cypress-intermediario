import { faker } from '@faker-js/faker'
describe('Create Project API', () => {

    beforeEach(() => cy.api_deleteProjects());

    it('successfuly', () => {
        const proj = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.api_createProject(proj).then(res => {
            expect(res.status).to.equal(201);
            expect(res.body.name).to.equal(proj.name);
            expect(res.body.description).to.equal(proj.description);
        });
    });
});