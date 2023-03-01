/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.fixture('user-location.json').as('userLocation');
    cy.visit('/').then((window) => {
      cy.get('@userLocation').then((fakePosition) => {
        cy.stub(window.navigator.geolocation, 'getCurrentPosition')
          .as('getUserPosition')
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });
      });
      cy.stub(window.navigator.clipboard, 'writeText')
        .as('saveToClipboard')
        .resolves();
      cy.spy(window.localStorage, 'setItem').as('storeLocation');
      cy.spy(window.localStorage, 'getItem').as('getStoredLocation');
    });
  });
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched'); // contains()
  });

  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('Eduardo Muchak');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@saveToClipboard').should('have.been.called');
    cy.get('@userLocation').then((fakePosition) => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get('@saveToClipboard').should(
        'have.been.calledWithMatch',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('Eduardo Muchak')}`),
      );
      cy.get('@storeLocation').should(
        'have.been.calledWithMatch',
        /Eduardo Muchak/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('Eduardo Muchak')}`),
      );
    });
    cy.get('@storeLocation').should('have.been.called');
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getStoredLocation').should('have.been.called');
  });
});
