describe("App initialization", () => {
  it("should diplay a list of todo", () => {
    cy.seedAndVisit();
    cy.get(".todo-list li").should("have.length", 5);
  });
  it("should diplay an error on failure", () => {
    cy.server();
    cy.route({
      url: "/api/todo",
      method: "GET",
      response: {},
      status: 500
    });
    cy.visit("http://localhost:3031/");
    cy.get(".todo-list li").should("have.length", 0);
    cy.get(".error").should("have.length", 1);
  });
});
