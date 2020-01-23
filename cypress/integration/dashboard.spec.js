/// <reference types="Cypress" />
import * as helpers from '../support/helpers';

/**
 * @abstract: Dashboard
 *
 * @criteria
  - I can navigate to the "dashboard" page.

  - As a logged in user I can :
    - View my current list items
        - I can see the edit / delete buttons when I hover over the lists component
    - View the hot list items 
    - View all public lists
*/

describe(`User Story: Dashboard page`, function() {
  beforeEach(() => {
    cy.server()
      .route({
        method: 'GET',
        url: '/api/lists',
        status: 200,
        response: 'fixture:lists'
      })
      .as('listRequest');
  });

  beforeEach(() => {
    const loginToken = helpers.makeLoginToken();
    cy.server()
      .route({
        method: 'POST',
        url: '/api/auth/token',
        // server determins credentials are correct
        status: 200,
        response: {
          authToken: loginToken
        }
      })
      .as('loginRequest');

    cy.visit('/login');
    cy.get('input#login-username-input').type('admin');
    cy.get('input#login-password-input').type('pass');
    cy.get('.loginForm').submit();
  });

  it(`Has all the lists of the current user`, () => {
    cy.visit('/dashboard');
  });
});
