import React, {useEffect, useState} from 'react';
import s from './GanttHeader.module.css'
import Select from "../UI/Select";
import Button from "../UI/Button";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {projectInterns, projectsId, projectsList, tasksState, teamsList, userState} from "../../store/atom";
import Modal from "../GanttTaskForm/Modal/Modal";
import { getAllTask, getProjectInterns, getUserInfo} from "../../services/task";
import ButtonForm from "../GanttTaskForm/UI/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useGetUserQuery} from "../../redux/authApi";
import {useSelector} from "react-redux";

const GanttHeader = () => {
    const navigate = useNavigate();
    const [formType, setFormType] = useState('')
    const [typeTask, setTypeTask] = useState('')
    const [showModal, setShowModal] = useState(false)
    const parentId = null
    const internsList = useRecoilValue(projectInterns)
    let {userId} = useParams();
    let user = useGetUserQuery({id: userId});


    const openForm = (type) => {
        setFormType(type);
        setShowModal(true);
        setTypeTask('gantt')
    };

    const handleCategoryClick = (category) => {
        if (category === 'start') {
            navigate(`/user/projects-lists`);
        }
    };


    return (
        <div className={s.container}>
            <div className={s.elements}>
                <div className={s.selects}>
                    <Button onClick={() => handleCategoryClick('start')} children={"Вернуться к списку"} width={250}/>
                </div>
                {internsList?.interns?.find((intern) => intern?.id_intern === user?.data?.id) &&
                    <>
                        <div className={s.buttons}>
                            <Button children={"Создать задачу"} onClick={()=>openForm('create')}/>
                        </div>
                    </>
                }
            </div>
            <Modal typeTask={typeTask} parentId={parentId} showModal={showModal} setShowModal={setShowModal} formType={formType} setFormType={setFormType}/>
        </div>
    );
};

export default GanttHeader;
