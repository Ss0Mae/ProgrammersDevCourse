import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "../../node_modules/@reduxjs/toolkit/dist/index";
import reducer from "./reducer/reducer";

const store = configureStore({
    reducer : reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

const dispatch = useDispatch();
const logger = useSelector((state:RootState) => state.logger);


store.getState()
export default store;