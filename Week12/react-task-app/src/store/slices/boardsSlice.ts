import { createSlice } from "../../../node_modules/@reduxjs/toolkit/dist/index";

const initialState = {
    modalActive: false,
    boardArray : []
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        
    }
})
export const boardsReducer = boardsSlice.reducer; 