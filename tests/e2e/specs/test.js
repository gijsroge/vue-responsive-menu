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
});
