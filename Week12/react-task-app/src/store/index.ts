import { useDispatch, useSelector } from "react-redux";
import reducer from "./reducer/reducer";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;