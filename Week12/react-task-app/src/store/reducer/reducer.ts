// Rudex

import { boardsReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";
import { userReducer } from "../slices/userSlice";

// 상태 관리 라이브러리(선택사항)

// State, props 상태를 여러 컴포넌트와 공유

// 앱이 커지면 -> 관리가 힘들고, 소스코드 지저분

// ===> import { connect } from 'react-redux'

// Flow

// Action(객체) Dispatch(함수) => Reducer 함수로 전달 type return => Redux Store State에 업데이트 => React Component ReRender

// Toolkit     Reducer     Slice

const reducer = {
    logger: loggerReducer,
    boards: boardsReducer,
    modal: modalReducer,
    user : userReducer
}
export default reducer;