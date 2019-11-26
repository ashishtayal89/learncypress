import axios from "axios";

export const saveTodo = todo => axios.post("/api/todo", todo);

export const getTodoList = () => axios.get("/api/todo");

export const deleteTodo = id => axios.delete(`/api/todo/${id}`);

export const toggleTodo = todo =>
  axios.put(`/api/todo/${todo.id}`, { ...todo, isComplete: !todo.isComplete });
