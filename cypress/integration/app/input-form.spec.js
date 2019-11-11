import { isContext } from "vm";

beforeEach(() => {
  cy.seedAndVisit([]);
});
describe("Input Form", () => {
  it("should focus first input on load", () => {
    cy.focused().should("have.class", "new-todo");
  });
  it("should accept inputs", () => {
    const typedText = "Learn Cypress";
    cy.get(".new-todo")
      .type(typedText)
      .should("have.value", typedText);
  });
});

context("Form Submit", () => {
  it("should add a new todo on submit", () => {
    var todoText = "Learn cypress";
    cy.route("POST", "/api/todo", {
      name: todoText,
      id: 1,
      isComplete: false
    });
    cy.get(".new-todo")
      .type(todoText)
      .type("{enter}")
      .should("be.empty");
    cy.get(".todo-list li")
      .should("have.length", 1)
      .contains(todoText);
  });
  it("should show an error message on failed submission", () => {
    var todoText = "Learn cypress";
    cy.route({
      url: "/api/todo",
      method: "POST",
      status: 500,
      response: {}
    });
    cy.get(".new-todo")
      .type(todoText)
      .type("{enter}");
    cy.get(".error").should("have.length", 1);
  });
});
