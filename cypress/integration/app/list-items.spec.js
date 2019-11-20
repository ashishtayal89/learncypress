beforeEach(() => {
  cy.seedAndVisit();
});

describe("Todo list", () => {
  it("should display completed items", () => {
    cy.get(".todo-list li")
      .filter(".completed")
      .should("have.length", 1)
      .find(".toggle")
      .should("be.checked");
  });
  it("should be able to deleted todo item", () => {
    cy.route({
      url: "http://localhost:3030/api/todo/1",
      method: "delete",
      response: {},
      status: 200
    });
    cy.get(".todo-list li").as("todos");
    cy.get("@todos")
      .first()
      .find(".destroy")
      .invoke("show")
      .click();
    cy.get("@todos")
      .should("have.length", 4)
      .and("not.contain", "Cypress");
  });
  it("should show error if issue with delete", () => {
    cy.route({
      url: "http://localhost:3030/api/todo/1",
      method: "delete",
      response: {},
      status: 500
    });
    cy.get(".todo-list li")
      .first()
      .find(".destroy")
      .invoke("show")
      .click();
    cy.get(".error").should("have.length", 1);
  });
  it("should mark an in-complete item complete", () => {
    cy.route({
      url: "http://localhost:3030/api/toggleTodo",
      method: "post",
      body: {
        id: 1,
        isChecked: true
      },
      response: {},
      status: 200
    });
    cy.get(".todo-list li").as("todos");
    cy.get("@todos")
      .filter(":not(.completed)")
      .first()
      .find(".toggle")
      .click();
    cy.get("@todos")
      .filter(".completed")
      .should("have.length", 2)
      .first()
      .should("contain", "Cypress");
  });
  it("should mark a complete item in-complete", () => {
    cy.route({
      url: "http://localhost:3030/api/toggleTodo",
      method: "post",
      body: {
        id: 1,
        isChecked: true
      },
      response: {},
      status: 200
    });
    cy.get(".todo-list li").as("todos");
    cy.get("@todos")
      .filter(".completed")
      .find(".toggle")
      .click()
      .should("not.be.checked");
  });
});

describe("The footer", () => {
  it("should display total number of todos left", () => {
    cy.get(".todo-count").should("contain", "4");
  });
});
