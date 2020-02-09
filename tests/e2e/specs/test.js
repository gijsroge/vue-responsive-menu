// https://docs.cypress.io/api/introduction/api.html

describe("Test core functionality", () => {
  it("Renders only 9 items", () => {
    cy.viewport(1140, 660);
    cy.visit("/");
    cy.get('[data-cypress="mainnav1"]')
      .children()
      .should("have.length", 9);
  });

  it("Renders only 6 items", () => {
    cy.viewport(1140, 660);
    cy.visit("/");
    cy.get('[data-cypress="mainnav2"]')
      .children()
      .should("have.length", 6);
  });

  it("Renders only 2 items", () => {
    cy.viewport(1140, 660);
    cy.visit("/");
    cy.get('[data-cypress="mainnav3"]')
      .children()
      .should("have.length", 2);
  });

  it("Should render all items because of incompatible root element.", () => {
    cy.viewport(1140, 660);
    cy.visit("/");
    cy.get('[data-cypress="mainnav4"] ul')
      .children()
      .should("have.length", 10);
  });

  it("Renders 9 items with a nested menu marked with a data attribute 'data-vue-responsive-menu'", () => {
    cy.viewport(1140, 660);
    cy.visit("/");
    cy.get('[data-cypress="mainnav5"] [data-vue-responsive-menu]')
      .children()
      .should("have.length", 9);
  });
});
