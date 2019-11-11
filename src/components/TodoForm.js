import React from "react";

export default props => {
  const { todoText, onTodoChange, onFormSubmit } = props;
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onTodoChange}
        value={todoText}
        autoFocus
      />
    </form>
  );
};
