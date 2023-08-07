import React, {useEffect, useState} from 'react';
import s from './CreateForm.module.css'
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    projectInterns,
    projectsId,
    projectsList,
    tasksState,
    userState
} from "../../../store/atom";
import {createTask, getAllTask, getIdTask, getProjectInterns, getUserInfo} from "../../../services/task";
import Text from "../UI/Text";
import Select from "../UI/Select";
import {ReactComponent as Project} from  '../../../assets/img/projects.svg'
import {ReactComponent as Add} from  '../../../assets/img/addButtForm.svg'
import {ReactComponent as Del} from  '../../../assets/img/delButtForm.svg'
import InputDate1 from "../UI/InputDate1";
import ButtonForm from "../UI/Button";
import TextArea from "../UI/TextArea";
import {toast} from "react-toastify";
import { Right } from '../../GanttChart/GanttTable/TaskRow/UI/Right';
import {ReactComponent as Clock} from  '../../../assets/img/clock.svg'
import {useGetUserQuery} from "../../../redux/authApi";
import {useParams} from "react-router-dom";
import SelectUser from "../UI/SelectUser";

const CreateForm = ({parentId, setShowModal, typeTask, formType}) => {
    const projectList = useRecoilValue(projectsList)
    const internsList = useRecoilValue(projectInterns)
    const projectId= useRecoilValue(projectsId);

    const {userId} = useParams();
    const user = useGetUserQuery({id:userId});
    // const [teamId, setTeamId] = useState(0)
    // const [executorId, setExecutorId] = useState(0)
    // let executor
    const [performers, setPerformers] = useState([]);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [finalDate, setFinalDate] = useState('')
    const [deadline, setDeadline] = useState('')
    const [stages, setStages] = useState([])
    const setTasks = useSetRecoilState(tasksState);
    const setInterns = useSetRecoilState(projectInterns)

    useEffect(() => {
        getProjectInterns(projectId)
            .then((response) => {
                setInterns(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },[setInterns])

    const handleAddPerformer = () => {
        const newPerformer = {
            id: performers.length > 0 ? performers[performers.length - 1].id + 1 : 1,
            id_performers: 0
        };
        console.log(performers)
        setPerformers([...performers, newPerformer]);
    };

    // const handleAddExecutor = (event) =>{
    //     event.preventDefault()
    //     executor = parseInt(event.target.value)
    //     setExecutorId(executor)
    // }


    const handleDeletePerformer = (id) => {
        const newData = performers.filter(stage => stage.id !== id);
        setPerformers(newData);
    };

    const handleAddStages = () => {
        const newStage = {
            id: stages.length > 0 ? stages[stages.length - 1].id + 1 : 1,
            checked: false,
            description: ''
        };
        const updatedStages = [...stages, newStage];
        setStages(updatedStages);
    };



    const handleDeleteStages = (id) => {
        const newData = stages.filter(stage => stage.id !== id);
        setStages(newData);
    };

    const validateDates = () => {
        if (!parentId) {
            return true;
        }

        const parentStartDate = Date.parse(parentId.planned_start_date);
        const parentFinalDate = Date.parse(parentId.planned_final_date);

        if (Date.parse(startDate) === parentStartDate || Date.parse(finalDate) === parentFinalDate) {
            return true;
        } else if (Date.parse(startDate) < parentStartDate || Date.parse(finalDate) > parentFinalDate) {
            return false;
        } else  if (Date.parse(finalDate) > Date.parse(deadline)) {
            return false;
        }

        return true;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const missingData = [];

        if (!name) {
            missingData.push('Название задачи');
        }

        if (!startDate) {
            missingData.push('Дата начала');
        }

        if (!finalDate) {
            missingData.push('Дата окончания');
        }


        if(startDate > finalDate ){
            alert("Дата начала не может быть больше Даты окончания");
            return
        }

        if (!validateDates()) {
            alert("Подзадача не может выходить за отрезок времени базовой задачи");
            return
        }

        const parent = parentId ? parentId.id : null;
        const taskList = {
            parent,
            projectId: projectId,
            name,
            description,
            startDate,
            finalDate,
            deadline: deadline ? deadline : finalDate,
        }
        const stagesList = stages.map((stage) => (stage.description));

        const responsibleUsers = [];
        const performerIds = performers.map((performer) => {
            if (performer.id_intern !== user?.data?.id) {
                return performer.id_intern;
            }
        });
        responsibleUsers.push(...performerIds);

        if (responsibleUsers.length === 0 || responsibleUsers.includes(null)) {
            missingData.push("Исполнители не выбраны");
        }

        if (missingData.length > 0) {
            const message = `Вы не ввели следующие обязательные данные:\n${missingData.join('\n')}`;
            alert(message);
            return;
        }

        // if (executorId !== 0) {
        //     responsibleUsers.push(executorId);
        // }

        // if (performers.length > 0) {
        //     const performerIds = performers.map((performer) => performer.id_intern);
        //     responsibleUsers.push(...performerIds);
        // }

        try {
            await createTask(taskList, stagesList, responsibleUsers)
            setShowModal(false)
            const updatedTasks = await getAllTask(typeTask, projectId);
            setTasks(updatedTasks);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={s.container}>
            <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.title}>
                    <Text optional={true} width={"606px"} height={"36px"} padding={"10px"} border={"1px solid #ccc"} background={"#FFFFFF"} fontSize={"20px"} fontWeight={"700"} onChange={(event) => setName(event.target.value)}/>
                    <span style={{padding:'0px 4px'}}>
                        Базовая задача:
                        <span>&nbsp;</span>
                        <span style={{textDecoration:'underline'}}>
                            {parentId !== null ? parentId?.name : "Отсутствует"}
                        </span>
                    </span>
                </div>
                <div className={s.elements}>
                    <div className={s.project}>
                        <Select
                            label="Проект"
                            icon={<Project/>}
                            value={projectId}
                            options={projectList}
                            disabled
                        />
                    </div>
                    {/*<div className={s.element}>*/}
                    {/*    <Select*/}
                    {/*    label="Тег команды"*/}
                    {/*    icon={<Project/>}*/}
                    {/*    options={internsList.teams}*/}
                    {/*    value={internsList[0]?.title}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className={s.element}>*/}
                    {/*    <span>Дедлайн</span>*/}
                    {/*    <InputDate1*/}
                    {/*        onChange={(event) => setDeadline(event.target.value)}*/}
                    {/*        icon={<Clock/>}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
                <div className={s.elements}>
                    <div className={`${s.element} ${s.deadlines}`}>
                        <span>Планируемые сроки выполнения</span>
                        <div className={s.elements}>
                            <InputDate1
                                    value={startDate}
                                    defaultValue={parentId?.planned_start_date}
                                    onChange={(event) => setStartDate(event.target.value)}
                                    icon={<Clock/>}
                                />
                                <span style={{alignSelf:'center'}}>-</span>
                            <InputDate1
                                    value={finalDate}
                                    defaultValue={parentId?.planned_final_date}
                                    onChange={(event) => setFinalDate(event.target.value)}
                                    icon={<Clock/>}
                                />
                        </div>
                    </div>
                    <div className={s.element}>
                        <span>Дедлайн</span>
                        <InputDate1
                            defaultValue={parentId?.deadline}
                            onChange={(event) => setDeadline(event.target.value)}
                            icon={<Clock/>}
                        />
                    </div>
                </div>
                <div className={s.description}>
                    <TextArea
                        placeholder="Введите описание..."
                        width={"606px"}
                        height={"128px"}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div className={s.important}>
                    <SelectUser
                        label="Постановщик"
                    />
                    {/*<Select*/}
                    {/*    label="Ответственный"*/}
                    {/*    icon={<Project/>}*/}
                    {/*    options={internsList.interns}*/}
                    {/*    onChange={handleAddExecutor}*/}
                    {/*    dis={"Выберите"}*/}
                    {/*/>*/}
                </div>
                <div className={s.unimportant}>
                    <div className={s.unimportantTop}>
                        <span className={s.label}>Исполнители</span>
                        <button type="button"  onClick={handleAddPerformer}>
                            <Add />
                        </button>
                    </div>
                    <div className={s.unimportantLists}>
                        {performers.map((performer, index) => (
                            <div className={s.unimportantList} key={index}>
                                <Select
                                    options={internsList.interns}
                                    value={performer.id_intern}
                                    onChange={(event) => {
                                        const newData = [...performers];
                                        newData[index].id_intern = parseInt(event.target.value);
                                        setPerformers(newData);
                                        console.log(performers)
                                    }}
                                    dis={"Выберите"}
                                />
                                <button className={s.deleteButton} type="button" onClick={() => handleDeletePerformer(performer.id)}>
                                    <Del style={{width: "16px", height: "16px"}} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.checklist}>
                    <div className={s.checklistTop}>
                        <span className={s.label}>Чек-лист</span>
                        <button type="button"  onClick={handleAddStages}>
                            <Add />
                        </button>
                    </div>
                    <div className={s.checkLists}>
                        {stages.map((stage, index) => (
                            <div className={s.checkList} key={index}>
                                <Right>
                                    <input type="checkbox"/>
                                </Right>
                                <Text
                                    width={"60%"}
                                    height={"21px"}
                                    padding={"10px"}
                                    border={"1px solid #ccc"}
                                    background={"#FFFFFF"}
                                    value={stage.description}
                                    onChange={(event) => {
                                        const newData = [...stages];
                                        newData[index].description = event.target.value;
                                        setStages(newData);
                                    }}
                                />
                                <button className={s.deleteButton} type="button" onClick={() => handleDeleteStages(stage.id)}>
                                    <Del style={{width: "16px", height: "16px"}}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.buttons}>
                    <ButtonForm type="submit">Сохранить</ButtonForm>
                    <ButtonForm status='notActive' onClick={() => setShowModal(false)}>Отменить</ButtonForm>
                </div>
            </form>
        </div>
    );
};

export default CreateForm;
