import React, {useEffect, useState} from 'react';
import KanbanHeader from "../../Components/KanbanHeader/KanbanHeader";
import s from './kanban.module.css'
import KanbanChart from "../../Components/KanbanChart/KanbanChart";
import GlobalStyles from "../../styles/GlobalStyles";
import theme from "../../styles/theme";
import {useRecoilState, useSetRecoilState} from "recoil";
import {ThemeProvider} from "@mui/material";
import {projectInterns, projectsId, projectsList, tasksKanbanState, tasksState, userState} from "../../store/atom";
import {getAllTask, getProjectInterns, getUserInfo, refreshAccessToken} from "../../services/task";

const Kanban = () => {
    const setUser = useSetRecoilState(userState);
    const [projectId, setProjectId] = useRecoilState(projectsId);
    const setProjectList = useSetRecoilState(projectsList);
    const setTasks = useSetRecoilState(tasksState);
    const setInterns = useSetRecoilState(projectInterns);
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки данных
    const [hasError, setHasError] = useState(false); // Состояние ошибки

    useEffect(() => {
        const storedProjectId = parseInt(localStorage.getItem('projectIds'));
        if (storedProjectId) {
            setProjectId(storedProjectId);
        }
    }, [setProjectId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userInfo, tasks, interns] = await Promise.all([
                    getUserInfo(),
                    getAllTask('kanban', projectId),
                    getProjectInterns(projectId)
                ]);

                setUser(userInfo);
                setProjectList(userInfo);
                setTasks(tasks);
                setInterns(interns);
                setIsLoading(false); // Устанавливаем состояние загрузки данных после получения данных
                setHasError(false); // Сбрасываем состояние ошибки
            } catch (error) {
                console.log(error);
                setIsLoading(false); // Устанавливаем состояние загрузки данных после получения ошибки
                setHasError(true); // Устанавливаем состояние ошибки
            }
        };

        fetchData();
    }, [setUser, setProjectList, setTasks, setInterns, setProjectId, projectId]);

    if (isLoading) {
        return <div></div>;
    }

    if (hasError) {
        return <div>Error 404</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <div className={s.container}>
                <KanbanHeader/>
                <div className={s.kanban}>
                    <KanbanChart/>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Kanban;
