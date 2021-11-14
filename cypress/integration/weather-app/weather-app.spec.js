/* eslint-disable no-undef */
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("example weather app", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("Change forecast to 8 days", () => {
    cy.get("button").contains("To 8 days").click();
  });

  it("Change forecast to 3 days", () => {
    cy.get("button").contains("To 3 days").click();
  });

  it("Change city to Moscow", () => {
    cy.get("a").contains("Moscow").click();
  });

  it("Change city to Bratislava", () => {
    cy.get("a").contains("Bratislava").click();
  });

  it("Change city to Minsk", () => {
    cy.get("a").contains("Minsk").click();
  });

  it("Enter city", () => {
    cy.get("button").contains("To 8 days").click();
    cy.get("input[name='search-city']").type("Berlin").type("{enter}");
  });

  it("Reload page", () => {
    cy.get("button").contains("To 8 days").click();
    cy.get("input[name='search-city']").type("Berlin").type("{enter}");
    cy.reload();
  });
});
