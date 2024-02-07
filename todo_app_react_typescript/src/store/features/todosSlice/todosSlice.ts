import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
type TodoType = {
  todo_id: number;
  todo_desc: string;
  todo_completed: boolean;
};

type TodosType = TodoType[];

const todos: TodosType = [];

// const user_login=useAppSelector((state)=>state.login.user_login);
const getTodoList = createAsyncThunk(
  "todos/getTodoList",
  async (token: string) => {
    try {
      const response = await fetch("http://localhost:3000", {
        // headers: {
        //   "Content-type": "application/json",
        // },
        headers: {
          // "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", response);
      if (response.status === 200) {
        const formattedResponse = await response.json();
        // console.log(formattedResponse);
        return formattedResponse;
      } else if (response.status === 401) {
        console.log("unauthorized");
      }
    } catch (error) {
      console.log("Error");
    }
  }
);

const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todo_desc: string) => {
    // console.log(todo_desc);
    fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify({ todo_desc: todo_desc }),
      headers: {
        "Content-type": "application/json",
        // "ngrok-skip-browser-warning": "true",
      },
    }).then((response) => console.log(response));
    // .then((json) => console.log(json));
  }
);

const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: {
    todo_id: number;
    todo_desc: string;
    todo_completed: boolean;
  }) => {
    // console.log(todo);
    fetch(`http://localhost:3000/${todo.todo_id}`, {
      method: "PATCH",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    }).then((response) => console.log(response));
    // .then((json) => console.log(json));
  }
);

const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (todo_id: number) => {
    // console.log(todo);
    fetch(`http://localhost:3000/${todo_id}`, {
      method: "DELETE",
      // headers: {
      //   "ngrok-skip-browser-warning": "true",
      // },
    }).then((response) => console.log(response));
    // .then((json) => console.log(json));
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos,
    todosLength: 0,
    loading: false,
    isSuccess: false,
  },
  reducers: {
    incrementId: (state) => {
      state.todosLength += 1;
    },
    addTodo: (
      state,
      action: PayloadAction<[todoName: string, todoId: number]>
    ) => {
      const [todoName, todoId] = action.payload;
      state.todos = [
        ...state.todos,
        { todo_id: todoId, todo_desc: todoName, todo_completed: false },
      ];
    },
    todoStatus: (
      state,
      action: PayloadAction<[todoId: number, status: boolean]>
    ) => {
      const [todoId, status] = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.todo_id === todoId) {
          todo.todo_completed = status;
        }
        return todo;
      });
    },
    editTodo: (
      state,
      action: PayloadAction<[todoId: number, value: string]>
    ) => {
      const [todoId, value] = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.todo_id === todoId) {
          todo.todo_desc = value;
        }
        return todo;
      });
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(
        (todo) => todo.todo_id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodoList.pending, (state) => {
      // console.log("pending")
      state.loading = true;
    });
    builder.addCase(
      getTodoList.fulfilled,
      (state, action: PayloadAction<TodosType>) => {
        state.loading = false;
        // console.log("fulfilled", action.payload);
        state.todos = action.payload;
        state.todosLength = action.payload?.length;
        state.isSuccess = true;
      }
    );
    builder.addCase(getTodoList.rejected, (state) => {
      const navigate = useNavigate();
      navigate("/login");
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export { getTodoList, createTodo, updateTodo, removeTodo };
export const { addTodo, todoStatus, editTodo, deleteTodo, incrementId } =
  todosSlice.actions;
export default todosSlice;
