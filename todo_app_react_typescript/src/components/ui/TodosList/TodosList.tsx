import { useEffect, useMemo } from "react";
// import {useSelector} from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import TodoCard from "../TodoCard/TodoCard";
import { getTodoList } from "../../../store/features/todosSlice/todosSlice";

function TodosList() {
  const todos = useAppSelector((state) => state.todos.todos);
  const access_token = useAppSelector(
    (state) => state.login.user_login.access_token
  );
  // console.log("todos", todos);
  const dispatch = useAppDispatch();

  // const timeId = useMemo(()=>setTimeout(() => dispatch(getTodoList()), 2000),[]);
  // console.log(...todos);
  useEffect(() => {
    // const timeId = setTimeout(() => dispatch(getTodoList(user_login.access_token)), 10000)
    // return () => {
    //   clearTimeout(timeId);
    //   console.log("cleanup called",timeId);
    // };
    if (access_token) {
      console.log("list called");
      dispatch(getTodoList(access_token));
    }
  }, [access_token]);

  return (
    <>
      {todos ? (
        todos.map((todo, index) => {
          return <TodoCard todo={todo} key={index} />;
        })
      ) : (
        <p className="api_error">Check the api call,not able to get todos...</p>
      )}
    </>
  );
}

export default TodosList;
