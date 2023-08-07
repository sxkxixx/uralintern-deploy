import React, { useState} from 'react';
import s from './GanttChart.module.css';
import GanttTable from './GanttTable/GanttTable';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import { tasksState} from '../../store/atom';
import TasksZero from "./TasksZero/TasksZero";

const GanttChart = () => {
    const [collapsedTasks, setCollapsedTasks] = useState([]);

    const tasks = useRecoilValue(tasksState);

    const toggleTaskCollapse = (taskId) => {
        setCollapsedTasks((prevCollapsedTasks) =>
            prevCollapsedTasks.includes(taskId)
                ? prevCollapsedTasks.filter((id) => id !== taskId)
                : [...prevCollapsedTasks, taskId]
        );
    };

    if (tasks?.tasks?.length === 0) {
        return <TasksZero />
    }

    return (
        <div className={s.container}>
            <GanttTable
                tasks={tasks.tasks}
                collapsedTasks={collapsedTasks}
                toggleTaskCollapse={toggleTaskCollapse}
            />
        </div>
    );
};

export default GanttChart;
