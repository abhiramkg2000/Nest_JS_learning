import React from "react";
// import { useSelector } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import TodoCard from "../../components/ui/TodoCard/TodoCard";
import "./Pending.css";

function Pending() {
  const todos = useAppSelector((state) => state.todos.todos);
  const pendingTodos = todos.filter((todo) => todo.todo_completed !== true);

  return (
    <div className="pending-page">
      {pendingTodos.map((todo, index) => (
        <TodoCard todo={todo} key={index} />
      ))}
    </div>
  );
}

export default Pending;
