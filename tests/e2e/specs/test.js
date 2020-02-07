// https://docs.cypress.io/api/introduction/api.html

describe("Test core functionality", () => {
  it("Renders only 8 items", () => {
    cy.visit("/");
    cy.get('[data-cypress="mainnav"]')
      .children()
      .should("have.length", 8);
  });

  it("Renders only 4 items", () => {
    cy.viewport(550, 750);
    cy.visit("/");
    cy.get('[data-cypress="mainnav"]')
      .children()
      .should("have.length", 4);
  });
});
