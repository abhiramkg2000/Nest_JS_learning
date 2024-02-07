import { TypedUseSelectorHook,useSelector,useDispatch } from "react-redux";
import type { RootState } from "./store";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "@reduxjs/toolkit";

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector
// export const useAppDispatch=()=>useDispatch<>=useDispatch
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();