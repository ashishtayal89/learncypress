describe("smoke test", () => {
  describe("with no todos", () => {
    beforeEach(() => {
      debugger;
      cy.request("GET", "/api/todo")
        .its("body")
        .each(todo => cy.request("DELETE", `/api/todo/${todo.id}`));
    });
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
});
