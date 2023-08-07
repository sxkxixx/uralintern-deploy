import React, { useEffect, useState } from 'react';
import s from './KanbanChart.module.css';
import Column from './Column/Column';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {projectsId, tasksKanbanState, tasksState} from '../../store/atom';
import {deleteIdTask, editStatus, getAllTask} from "../../services/task";

const KanbanChart = () => {
    const projectId= useRecoilValue(projectsId);
    const tasks = useRecoilValue(tasksState);
    const setTasks = useSetRecoilState(tasksState);

    const [boards, setBoards] = useState([
        { id: 1, title: 'В РАБОТУ', status: 'inwork', idStatus: 'TO WORK', items: [] },
        { id: 2, title: 'ВЫПОЛНЯЮТСЯ', status: 'except', idStatus: 'IN PROGRESS', items: [] },
        { id: 3, title: 'ТЕСТИРОВАНИЕ', status: 'test', idStatus: 'TESTING', items: [] },
        { id: 4, title: 'ПРОВЕРКА', status: 'check', idStatus: 'CHECKING', items: [] },
        { id: 5, title: 'ЗАВЕРШЕННЫЕ', status: 'complete', idStatus: 'COMPLETED', items: [] },
    ]);

    useEffect(() => {
        if (tasks.tasks) {
            const updatedBoards = boards.map(board => ({ ...board, items: [] }));

            tasks.tasks.forEach(task => {
                const boardIndex = updatedBoards.findIndex(board => board.idStatus === task.status_id__name);
                if (boardIndex !== -1) {
                    updatedBoards[boardIndex].items.push(task);
                }
            });

            setBoards(updatedBoards);
        }
    }, [tasks]);


    const handleStatusChange = async (taskId, status) => {
        try {
            await editStatus(taskId, status);
            const updatedTasks = await getAllTask("kanban", projectId);
            setTasks(updatedTasks);
        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className={s.container}>
            <Column
                tasks={tasks}
                boards={boards}
                setBoards={setBoards}
                handleStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default KanbanChart;
