import React, {useEffect, useState} from 'react';
import Select from "../UI/Select";
import Button from "../UI/Button";
import s from './KanbanHeader.module.css'
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {projectInterns, projectsId, projectsList, tasksKanbanState, tasksState} from "../../store/atom";
import {deleteCompletedTask, getAllTask, getProjectInterns} from "../../services/task";
import {useNavigate, useParams} from "react-router-dom";
import {useGetUserQuery} from "../../redux/authApi";
import {useSelector} from "react-redux";


const KanbanHeader = () => {
    const navigate = useNavigate();
    const [projectId, setProjectId] = useRecoilState(projectsId);
    const setTasks = useSetRecoilState(tasksKanbanState);
    const internsList = useRecoilValue(projectInterns)
    let {userId} = useParams();
    let user = useGetUserQuery({id: userId});
    const handleCategoryClick = (category) => {
        if (category === 'start') {
            navigate(`/user/projects-lists`);
        }
    };

    const Delete = async () => {
        try {
            await deleteCompletedTask(projectId)
            await getAllTask("kanban", projectId)
                .then((response) => {
                    setTasks(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className={s.container}>
            <div className={s.elements}>
                <div className={s.selects}>
                    <Button onClick={() => handleCategoryClick('start')} children={"Вернуться к списку"} width={250}/>
                </div>
                {internsList?.interns?.find((intern) => intern?.id_intern === user?.data?.id) &&
                    <>
                        <div className={s.buttons}>
                            <Button onClick={() => Delete()} children={"Убрать завершенные задачи"} width={250}/>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default KanbanHeader;
