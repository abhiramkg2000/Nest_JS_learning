import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import todosSlice from "./features/todosSlice/todosSlice";
import loginSlice from "./features/todosSlice/loginSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";


const persistConfig = {
  key: "user",
  storage,
  whitelist: ["login"],
};

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
  login: loginSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch=typeof store.dispatch
