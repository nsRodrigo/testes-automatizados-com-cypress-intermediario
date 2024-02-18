const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`;

Cypress.Commands.add('api_createProject', (proj) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/`,
        body: {
            name: proj.name,
            description: proj.description,
            initialize_with_readme: true
        },
        headers: { Authorization: accessToken }
    });
});

Cypress.Commands.add('api_createIssue', (issue) => {
    cy.api_createProject(issue.project)
        .then(res => {
            cy.request({
                method: 'POST',
                url: `/api/v4/projects/${res.body.id}/issues`,
                body: {
                    title: issue.title,
                    description: issue.description
                },
                headers: { Authorization: accessToken }
            });
        });
});

Cypress.Commands.add('api_createLabel', (projectId, label) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/labels`,
        body: {
            name: label.name,
            color: label.color
        },
        headers: { Authorization: accessToken },
    })
})

Cypress.Commands.add('api_createMilestone', (projectId, milestone) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/milestones`,
        body: { title: milestone.title },
        headers: { Authorization: accessToken },
    })
})

Cypress.Commands.add('api_getAllProjects', () => {
    cy.request({
        method: 'GET',
        url: `/api/v4/projects/`,
        headers: { Authorization: accessToken }
    });
});

Cypress.Commands.add('api_deleteProjects', () => {
    cy.api_getAllProjects().then(res => {
        res.body.forEach(proj =>
            cy.request({
                method: 'DELETE',
                url: `/api/v4/projects/${proj.id}`,
                headers: { Authorization: accessToken }
            })
        );
    });
});
