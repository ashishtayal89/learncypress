describe("smoke test", () => {
  beforeEach(() => {
    cy.request("GET", "/api/todo")
      .its("body")
      .each(todo => cy.request("DELETE", `/api/todo/${todo.id}`));
  });
  describe("with no todos", () => {
    it("Saves new todos", () => {
      cy.visit("/");
      cy.server();
      cy.route("POST", "api/todo").as("postTodo");
      cy.wrap([
        { todoText: "learn cypress", expectedLength: 1 },
        { todoText: "learn node", expectedLength: 2 },
        { todoText: "learn electron", expectedLength: 3 }
      ]).each(({ todoText, expectedLength }) => {
        cy.focused()
          .type(todoText)
          .type("{enter}");
        cy.wait("@postTodo", { requestTimeout: 10000 });
        cy.get(".todo-list li").should("have.length", expectedLength);
      });
    });
  });
  describe("With active todos", () => {
    beforeEach(() => {
      cy.fixture("todos").each(todo => {
        cy.request("POST", `api/todo/`, {
          ...todo,
          isComplete: false
        });
      });
    });
    it("should display a list of todos", () => {
      cy.visit("/");
      cy.get(".todo-list li").should("have.length", 5);
    });
    it("should be able to delete 1 records", () => {
      cy.server();
      cy.route("DELETE", "api/todo/*").as("deleteTodo");
      cy.visit("/");
      cy.get(".todo-list li").as("todos");
      cy.get("@todos")
        .filter(":not(.completed)")
        .first()
        .find(".destroy")
        .invoke("show")
        .click();
      cy.wait("@deleteTodo");
      cy.get("@todos").should("have.length", 4);
    });
    it("should be able to delete all records", () => {
      cy.server();
      cy.route("DELETE", "api/todo/*").as("deleteTodo");
      cy.visit("/");
      cy.get(".todo-list li").as("todos");
      cy.get("@todos")
        .each($todoElement => {
          cy.wrap($todoElement)
            .find(".destroy")
            .invoke("show")
            .click();
          cy.wait("@deleteTodo");
        })
        .should("not.exist");
    });
    it("should be able to toggle all records", () => {
      const clickAndWait = $todoElement => {
        cy.wrap($todoElement)
          .as("item")
          .find(".toggle")
          .click();
        cy.wait("@toggleTodo");
      };
      cy.server();
      cy.route("PUT", "api/todo/*").as("toggleTodo");
      cy.visit("/");
      cy.get(".todo-list li").as("todos");
      cy.get("@todos").each($todoElement => {
        clickAndWait($todoElement);
        cy.get("@item").should("have.class", "completed");
        clickAndWait($todoElement);
        cy.get("@item").should("not.have.class", "completed");
      });
    });
  });
});
