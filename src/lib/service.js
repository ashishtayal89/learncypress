import axios from "axios";

export const saveTodo = todoText =>
  axios.post("http://localhost:3030/api/todo", todoText);

export const getTodoList = () => axios.get("http://localhost:3030/api/todo");
