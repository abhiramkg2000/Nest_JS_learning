import React, { useEffect } from "react";
import "./HomePage.css";

import TodosList from "../../components/ui/TodosList/TodosList";
import InputTodo from "../../components/ui/InputTodo/InputTodo";

function HomePage() {
  return (
    <div className="home-page" data-testid="homepage">
      <h2>Add Todos</h2>
      <InputTodo />
      <div className="todos-container">
        <TodosList />
      </div>
    </div>
  );
}

export default HomePage;
