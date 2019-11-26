export const filterTodos = (filter, todos) =>
  filter
    ? todos.filter(todo =>
        filter === "completed" ? todo.isComplete : !todo.isComplete
      )
    : todos;
