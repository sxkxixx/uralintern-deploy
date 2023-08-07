import React, { useState } from 'react';
import s from './Column.module.css';
import Card from "../Card/Card";
import Modal from "../../GanttTaskForm/Modal/Modal";

const Column = ({ boards, setBoards, tasks, handleStatusChange }) => {
    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    function dragOverHandler(e) {
        e.preventDefault();
    }

    function dragStartHandler(e, board, items) {
        setCurrentBoard(board);
        setCurrentItem(items);
    }

    function dropHandler(e, board, items) {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(items);
        board.items.splice(dropIndex + 1, 0, currentItem);
        setBoards((prevBoards) =>
            prevBoards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            })
        );

        handleStatusChange(currentItem.task_id, board.idStatus);
    }

    function dropCardHandler(e, board) {
        board.items.push(currentItem);
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        setBoards((prevBoards) =>
            prevBoards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            })
        );

        handleStatusChange(currentItem.task_id, board.idStatus);
    }

    return (
        <>
            {boards.map(board => (
                <div
                    className={s.board}
                    key={board.id}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                >
                    <div className={`${s.boardTitle} ${s[board.status]}`}>{board.title}</div>
                    <div className={s.boardItems}>
                        <div className={s.itemsWrapper}>
                            {board.items.map(item => (
                                <Card
                                    tasks={tasks}
                                    items={item}
                                    key={item.id}
                                    board={board}
                                    dragOverHandler={dragOverHandler}
                                    dragStartHandler={dragStartHandler}
                                    dropHandler={dropHandler}
                                    className={s.item}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Column;
