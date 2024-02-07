import React from "react";
// import { useSelector } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import TodoCard from "../../components/ui/TodoCard/TodoCard";
import "./Completed.css";

function Completed() {
  const todos = useAppSelector((state) => state.todos.todos);
  const completedTodos = todos.filter((todo) => todo.todo_completed === true);

  return (
    <div className="completed-page">
      {completedTodos.map((todo, index) => (
        <TodoCard todo={todo} key={index} />
      ))}
    </div>
  );
}

export default Completed;
