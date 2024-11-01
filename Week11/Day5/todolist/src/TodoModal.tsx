import React from "react";
import { Modal } from "react-bootstrap";

type Todo = {
    id: number;
    text: string;
    isChecked: boolean;
};

type TodoModelProps = {
    show: boolean;
    todo: Todo | null;
    handleClose: () => void;
}
const TodoModal: React.FC<TodoModelProps> = ({show, todo, handleClose}) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Todo 상세 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>{todo?.text}</Modal.Body>
            </Modal>
        </div>
    )
}

export default TodoModal;