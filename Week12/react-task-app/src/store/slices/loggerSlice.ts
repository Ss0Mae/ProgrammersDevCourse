import { createSlice } from "../../../node_modules/@reduxjs/toolkit/dist/index";
import { ILogItem } from "../../types/index";

type loggerState = {
    logArray : ILogItem[]
}
const initialState : loggerState= {
    logArray : []
}
const loggerSlice = createSlice({
    name: 'logger',
    initialState,
    reducers: {
        
    }
})

export const loggerReducer = loggerSlice.reducer;