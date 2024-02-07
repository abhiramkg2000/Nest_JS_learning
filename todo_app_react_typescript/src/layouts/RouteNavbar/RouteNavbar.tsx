import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "./RouteNavbar.css";
import { clearAccessToken } from "../../store/features/todosSlice/loginSlice";

function RouteNavbar() {
  const todos = useAppSelector((state) => state.todos.todos) || [];
  const dispatch = useAppDispatch();
  const completedTodos = todos
    ? todos.filter((todo) => todo.todo_completed === true)
    : 0;
  const pendingTodos = todos
    ? todos.filter((todo) => todo.todo_completed !== true)
    : 0;

  const handleClick = () => {
    dispatch(clearAccessToken());
    // localStorage.removeItem("access_token");
  };

  return (
    <>
      <nav>
        <h2>Welcome</h2>
        <div className="link-container">
          <Link className="link" to="/">
            Todos page {todos.length}
          </Link>
          <Link className="link" to="/completed">
            Completed Todos {completedTodos && completedTodos.length}
          </Link>
          <Link className="link" to="/pending">
            Pending Todos {pendingTodos && pendingTodos.length}
          </Link>
          <Link className="link" to="/login" onClick={handleClick}>
            Logout
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default RouteNavbar;
