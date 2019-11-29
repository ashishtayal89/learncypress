describe("Footer", () => {
  describe("with a single todo", () => {
    beforeEach(() => {
      cy.seedAndVisit([{ id: 1, name: "learn Cypress", isComplete: false }]);
    });
    it("should display a singular todo in count", () => {
      cy.get(".todo-count").contains("1 todo left");
    });
  });
  describe("multiple todos", () => {
    beforeEach(() => {
      cy.seedAndVisit();
    });
    it("should display plural todos in count", () => {
      cy.get(".todo-count").contains("4 todos left");
    });
    it("should handle filter links", () => {
      const filters = [
        { link: "active", expectedLength: 4 },
        { link: "completed", expectedLength: 1 },
        { link: "all", expectedLength: 5 }
      ];
      cy.wrap(filters).each(({ link, expectedLength }) => {
        cy.get(`a.${link}`).click();
        cy.get(".todo-list li").should("have.length", expectedLength);
      });
    });
  });
});
