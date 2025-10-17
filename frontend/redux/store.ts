import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./repo/repoSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import domainReducer from "./domain/domainSlice";
import fieldReducer from "./field/fieldSlice";
import valueReducer from "./value/valueSlice";
import insightReducer from "./insight/insightSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    repos: repoReducer,
    domains: domainReducer,
    fields: fieldReducer,
    values: valueReducer,
    insights: insightReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
