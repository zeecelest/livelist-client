/// <reference types="Cypress" />

/**
 * @abstract: Create an account
 *
 * @criteria
  As first time visiting user:
  - I'm directed to a registration page.
  - On that page, I can enter my name, username, and password.
  - If all my information is correct, upon clicking the submit button, I'm taken to a login page.
  - If any of my information is incorrect, I'm given proper error messages and the option to correct my information
*/
describe(`User story: Register an account`, function() {
  it('on first load, directs me to the registration page', () => {
    cy.visit('/register');
    cy.url().should('eq', `${Cypress.config().baseUrl}/register`);

    cy.get('main section').within(($section) => {
      cy.get('h2').should('have.text', 'Sign Up');
    });
  });

  it(`displays the name, username and password fields`, () => {
    cy.visit('/register');

    cy.get('section form').within(() => {
      cy.get('label[for=registration-name-input]').should(
        'include.text',
        'name'
      );
      cy.get('input#registration-name-input')
        .should('have.attr', 'type', 'text')
        .and('have.attr', 'required', 'required');

      cy.get('label[for=registration-username-input]').should(
        'include.text',
        'username'
      );
      cy.get('input#registration-username-input')
        .should('have.attr', 'type', 'text')
        .and('have.attr', 'required', 'required');

      cy.get('label[for=registration-password-input]').should(
        'include.text',
        'password'
      );
      cy.get('input#registration-password-input')
        .should('have.attr', 'type', 'password')
        .and('have.attr', 'required', 'required');

      cy.get('label[for=registration-location-city-input]').should(
        'include.text',
        'City'
      );
      cy.get('input[name="locationCity"]').should(
        'have.attr',
        'type',
        'hidden'
      );

      cy.get('label[for=registration-location-state-select]').should(
        'include.text',
        'State'
      );
      cy.get('input[name="locationState"]').and('have.attr', 'type', 'hidden');
      cy.get('button[type=submit]').should('include.text', 'Sign up');
    });
  });

  context(`Given invalid information`, () => {
    const serverError = 'Some error from the server';

    beforeEach(() => {
      cy.server()
        .route({
          method: 'POST',
          url: '/api/user',
          // server determines the information is incorrect
          status: 400,
          response: {
            error: serverError
          }
        })
        .as('postRegister');
    });

    it(`displays error from POSTS /api/users`, () => {
      const newUser = {
        name: 'Test name',
        username: 'invalid-username',
        password: 'invalid-password',
        city: 'Los Angeles',
        state: 'California'
      };
      cy.visit('/register');

      cy.get('main form').within(($form) => {
        cy.get('#registration-name-input').type(newUser.name);
        cy.get('#registration-username-input').type(newUser.username);
        cy.get('#registration-location-state-select')
          .click()
          .find('[data-value="California"]');
        cy.get('#registration-password-input').type(newUser.password);
        cy.root().submit();

        cy.wait('@postRegister')
          .get('[role=alert]')
          .should('have.text', serverError);
      });
    });
  });

  context(`Given valid information`, () => {
    beforeEach(() => {
      cy.server()
        .route({
          method: 'POST',
          url: '/api/user',
          // server determines the information is correct
          status: 200,
          response: {
            'not sure': 'what goes here'
          }
        })
        .as('postRegister');
    });

    it(`redirects to /login`, () => {
      const newUser = {
        name: 'Test name',
        username: 'test-username',
        password: 'test-password',
        city: 'Los Angeles',
        state: 'California'
      };
      cy.visit('/register');

      cy.get('section form').within(($form) => {
        cy.get('#registration-name-input').type(newUser.name);
        cy.get('#registration-username-input').type(newUser.username);
        cy.get('#registration-location-city-input').type(newUser.city);
        cy.get('#registration-location-state-select').select(newUser.state);
        cy.get('#registration-password-input').type(newUser.password);
        cy.root().submit();
        cy.wait('@postRegister')
          .url()
          .should('eq', `${Cypress.config().baseUrl}/login`);
      });
    });
  });
});
