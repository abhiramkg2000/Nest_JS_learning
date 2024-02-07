import { ChangeEvent, useEffect } from "react";

import "./TodoCard.css";
import {
  deleteTodo,
  editTodo,
  todoStatus,
  removeTodo,
  updateTodo,
  getTodoList,
} from "../../../store/features/todosSlice/todosSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

type TodoCardProps = {
  todo: { todo_id: number; todo_desc: string; todo_completed: boolean };
};

function TodoCard({ todo }: TodoCardProps) {
  const click = todo.todo_completed;
  // const dispatch = useDispatch<any>();
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    (state) => state.login.user_login.access_token
  );

  const handleTodoComplete = () => {
    // setClick((prevClick) => !prevClick);
    const newTodo = {
      ...todo,
      todo_completed: !click,
    };
    dispatch(todoStatus([todo.todo_id, !click]));
    dispatch(updateTodo(newTodo));
    // dispatch(getTodoList());
  };

  const handleTodoDelete = () => {
    dispatch(deleteTodo(todo.todo_id));
    dispatch(removeTodo(todo.todo_id));
    // dispatch(getTodoList());
  };

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editTodo([todo.todo_id, e.target.value]));
    const newTodo = {
      ...todo,
      todo_desc: e.target.value,
    };
    // if (newTodo.todo_desc === "") {
    //   dispatch(removeTodo(todo.todo_id));
    //   dispatch(deleteTodo(todo.todo_id));
    // } else {
    dispatch(updateTodo(newTodo));
    // }
    // dispatch(getTodoList());
  };

  useEffect(() => {
    // const timeId = setTimeout(() => dispatch(getTodoList(access_token)), 3000);
    // return () => {
    //   clearTimeout(timeId);
    //   console.log("cleanup called", timeId);
    // };
    if (access_token) {
      console.log("card called");
      dispatch(getTodoList(access_token));
    }
  }, []);

  return (
    <div data-testid="todoCard" className="todo-card">
      {/* <div className="date-container">{todo.date}</div> */}
      <input
        data-testid="editTodo"
        className={"todo-list" + (click ? " strike-through" : "")}
        value={todo.todo_desc || ""}
        onChange={handleTodoChange}
      />
      <div className="icon-container">
        <i
          data-testid="todoComplete"
          className={
            click ? "fa-solid fa-circle-check" : "fa-regular fa-circle"
          }
          onClick={handleTodoComplete}
        ></i>
        <i
          data-testid="todoDelete"
          className="fa-regular fa-trash-can"
          onClick={handleTodoDelete}
        ></i>
      </div>
    </div>
  );
}

export default TodoCard;
