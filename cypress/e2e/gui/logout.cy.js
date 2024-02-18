/// <reference types="cypress"/>
describe('Logout', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
    });

    it('successfully', () => {
        cy.logout();
        cy.contains('h1', ' GitLab Community Edition ');
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`);
    });
});