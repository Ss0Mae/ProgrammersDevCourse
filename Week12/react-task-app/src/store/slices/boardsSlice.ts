import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard } from "../../types/index";

type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[];
}

type TAddBoardAction = {
    board: IBoard;
}

type TDeleteListAction = {
    boardId: string;
    listId: string;
}
const initialState : TBoardsState = {
    modalActive: false,
    boardArray: [
        {
            boardId: 'board-0',
            boardName: "첫 번째 게시물",
            lists: [
                {
                    listId: "list-0",
                    listName: "List 1",
                    tasks: [
                        {
                            taskId: "task-0",
                            taskName : "Task 1",
                            taskDescription: "Description",
                            taskOwner: "ssomae",
                        },
                        {
                            taskId: "task-1",
                            taskName : "Task 2",
                            taskDescription: "Description",
                            taskOwner: "ssomae",
                        },
                        
                    ]
                },
                {
                    listId: "list-1",
                    listName: "List 2",
                    tasks: [
                        {
                            taskId: "task-3",
                            taskName : "Task 3",
                            taskDescription: "Description",
                            taskOwner: "ssomae",
                        },
                        
                    ]
                }
            ]
        }
    ]
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, {payload} : PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(payload.board);
        },

        deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map(
                board =>
                    board.boardId === payload.boardId
                        ?
                        {
                            ...board,
                            lists: board.lists.filter(
                                list=>list.listId !== payload.listId
                            )
                        }
                        :
                        board
            )
        },
        setModalActive: (state, { payload }: PayloadAction<boolean>) => {
            state.modalActive = payload
        }
    }
})

export const { addBoard, deleteList, setModalActive} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer; 