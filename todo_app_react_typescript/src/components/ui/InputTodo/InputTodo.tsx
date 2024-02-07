import React, { ChangeEvent } from "react";
import { useState } from "react";
// import { useSelector,useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  addTodo,
  createTodo,
  incrementId,
} from "../../../store/features/todosSlice/todosSlice";

import "./InputTodo.css";

function InputTodo() {
  const [todo, setTodo] = useState("");
  const todoId = useAppSelector((state) => state.todos.todosLength);
  const dispatch = useAppDispatch();

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (todo !== "" && todo.charAt(0)!=='') {
      dispatch(incrementId());
      dispatch(addTodo([todo, todoId + 1]));
      dispatch(createTodo(todo));
      setTodo("");
    }
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        data-testid="inputTodo"
        value={todo}
        autoComplete="off"
        onChange={handleTodoChange}
        name="inputTodo"
        placeholder="What do you need to do today?"
      />
      {/* <button >Add todo</button> */}
      <i
        data-testid="addTodo"
        className="fa-solid fa-plus"
        onClick={handleAddTodo}
      ></i>
    </div>
  );
}

export default InputTodo;
