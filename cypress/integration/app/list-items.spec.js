describe("Todo list", () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });
  it("should display completed items", () => {
    cy.get(".todo-list li")
      .filter(".completed")
      .should("have.length", 1)
      .find(".toggle")
      .should("be.checked");
  });
  it("should be able to deleted todo item", () => {
    cy.route({
      url: "/api/todo/1",
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
      url: "api/todo/1",
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
    cy.fixture("todos").then(todos => {
      const target = Cypress._.find(todos, todo => !todo.isComplete);
      cy.route({
        url: `/api/todo/${target.id}`,
        method: "put",
        body: Cypress._.merge({ ...target, isComplete: true }),
        response: Cypress._.merge({ ...target, isComplete: true }),
        status: 200
      });
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
    cy.fixture("todos").then(todos => {
      const target = Cypress._.find(todos, todo => todo.isComplete);
      cy.route({
        url: `/api/todo/${target.id}`,
        method: "put",
        body: Cypress._.merge({ ...target, isComplete: false }),
        response: Cypress._.merge({ ...target, isComplete: false }),
        status: 200
      });
    });
    cy.get(".todo-list li").as("todos");
    cy.get("@todos")
      .filter(".completed")
      .first()
      .find(".toggle")
      .click()
      .should("not.be.checked");
  });
  it("should display error if issue with update", () => {
    cy.fixture("todos").then(todos => {
      const target = Cypress._.find(todos, todo => !todo.isComplete);
      cy.route({
        url: `api/todo/${target.id}`,
        method: "put",
        body: Cypress._.merge({ ...target, isComplete: true }),
        response: {},
        status: 500
      });
    });
    cy.get(".todo-list li")
      .filter(":not(.completed)")
      .first()
      .find(".toggle")
      .click();
    cy.get(".error").should("have.length", 1);
  });
});
