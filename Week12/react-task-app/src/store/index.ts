import { configureStore } from "../../node_modules/@reduxjs/toolkit/dist/index";
import reducer from "./reducer/reducer";

const store = configureStore({
    reducer : reducer
})

export default store;