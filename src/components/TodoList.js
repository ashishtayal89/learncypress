import React from "react";

const TodoItem = ({ todo, sNo }) => (
  <li>
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>{`${sNo}. ${todo.name}`}</label>
      <button className="destroy" />
    </div>
  </li>
);

export default props => (
  <ul className="todo-list">
    {props.todos.map((todo, index) => (
      <TodoItem key={todo.id} todo={todo} sNo={index + 1} />
    ))}
  </ul>
);
