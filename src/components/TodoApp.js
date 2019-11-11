import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { saveTodo, getTodoList } from "../lib/service";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todoText: ""
    };
    this.onTodoChange = this.onTodoChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    getTodoList().then(
      ({ data }) => {
        this.setState({ todos: data });
      },
      () => {
        this.setState({ error: true });
      }
    );
  }

  onTodoChange(e) {
    this.setState({ todoText: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { todoText } = this.state;
    const newTodo = { name: todoText, isComplete: false };
    saveTodo(newTodo).then(
      ({ data }) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(data),
          todoText: ""
        });
      },
      () => {
        this.setState({ error: true });
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
            {error ? <span className="error">Error occured</span> : null}
            <TodoForm
              todoText={todoText}
              onTodoChange={this.onTodoChange}
              onFormSubmit={this.onFormSubmit}
            />
          </header>
          <section className="main">
            <TodoList todos={this.state.todos} />
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}
