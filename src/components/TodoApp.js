import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { saveTodo, getTodoList, deleteTodo, toggleTodo } from "../lib/service";
import { filterTodos } from "../lib/utils";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todoText: ""
    };
    this.onTodoChange = this.onTodoChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDeleteTodo = this.onDeleteTodo.bind(this);
    this.onToggleTodo = this.onToggleTodo.bind(this);
  }

  componentDidMount() {
    getTodoList().then(
      ({ data }) => {
        this.setState({ todos: data });
      },
      () => {
        this.setState({ error: "Failed to load todos" });
      }
    );
  }

  onTodoChange(e) {
    this.setState({ todoText: e.target.value });
  }

  onDeleteTodo(id) {
    deleteTodo(id).then(
      () => {
        const newTodos = this.state.todos.filter(todo => todo.id !== id);
        this.setState({ todos: newTodos });
      },
      () => {
        this.setState({ error: "Failed to delete record" });
      }
    );
  }

  onToggleTodo(id) {
    toggleTodo(id).then(
      ({ data }) => {
        const updatedTodos = this.state.todos.map(todo =>
          todo.id == data.id ? data : todo
        );
        this.setState({ todos: updatedTodos });
      },
      () => {
        this.setState({ error: "Failed to update record" });
      }
    );
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { todoText } = this.state;
    const newTodo = { name: todoText, isComplete: false };
    saveTodo(newTodo).then(
      ({ data }) => {
        this.setState({
          todos: this.state.todos.concat(data),
          todoText: ""
        });
      },
      () => {
        this.setState({ error: "Failed to add record" });
      }
    );
  }

  render() {
    const { todoText, error } = this.state;
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {error ? <span className="error">{error}</span> : null}
            <TodoForm
              todoText={todoText}
              onTodoChange={this.onTodoChange}
              onFormSubmit={this.onFormSubmit}
            />
          </header>
          <section className="main">
            <Route
              path="/:filter?"
              render={({ match }) => (
                <TodoList
                  todos={filterTodos(match.params.filter, this.state.todos)}
                  onDeleteTodo={this.onDeleteTodo}
                  onToggleTodo={this.onToggleTodo}
                />
              )}
            ></Route>
          </section>
          <Footer todos={this.state.todos} />
        </div>
      </Router>
    );
  }
}
