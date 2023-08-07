import React, {useEffect, useState} from 'react';
import s from './ViewForm.module.css'
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    commentsState,
    projectInterns, projectsId,
    projectsList,
    taskIdState,
    tasksState,
    teamsList,
    timer,
    timerState
} from "../../../store/atom";
import {
    editStages,
    deleteIdTask,
    getAllTask,
    getIdTask,
    timeSpent,
    createComment,
    editComment, deleteComment, editComments, deleteComments
} from "../../../services/task";
import Text from "../UI/Text";
import Select from "../UI/Select";
import {ReactComponent as Project} from '../../../assets/img/projects.svg'
import InputDate1 from "../UI/InputDate1";
import ButtonForm from "../UI/Button";
import TextArea from "../UI/TextArea";
import {toast} from "react-toastify";
import {Right} from '../../GanttChart/GanttTable/TaskRow/UI/Right';
import {ReactComponent as Clock} from '../../../assets/img/clock.svg';
import {ReactComponent as Timer} from '../../../assets/img/timer.svg';
import {ReactComponent as StartTimerButton} from '../../../assets/img/startTimerButton.svg';
import {ReactComponent as TrashTimerButton} from '../../../assets/img/trashButton.svg';
import {ReactComponent as PauseTimerButton} from '../../../assets/img/pauseTimerButton.svg';
import {useParams} from "react-router-dom";
import {useGetUserQuery} from "../../../redux/authApi";


const ViewForm = ({id, setFormType, setShowModal, typeTask , parentName}) => {
    const projectList = useRecoilValue(projectsList)
    const internsList = useRecoilValue(projectInterns)
    const projectId = useRecoilValue(projectsId);
    let {userId} = useParams();
    let user = useGetUserQuery({id: userId});
    const taskId = useRecoilValue(taskIdState)
    const setTaskId = useSetRecoilState(taskIdState)
    const setTasks = useSetRecoilState(tasksState)
    const tasks = useRecoilValue(tasksState)
    const [timer, setTimer] = useRecoilState(timerState)
    const [completedAt, setCompletedAt] = useState(null);

    const [comments, setComments] = useState('')
    const [newComments, setNewComments] = useState('')
    const [editingCommentId, setEditingCommentId] = useState(null);

    useEffect(() => {
        getIdTask(id)
            .then((response) => {
                setTaskId(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const addComments = async () => {
        try {
            await createComment(taskId.task.id, comments);
            setComments('')
            setNewComments('')
            const updatedTaskId = await getIdTask(taskId.task.id);
            setTaskId(updatedTaskId);
        } catch (e) {
            console.log(e)
        }
    };

    const editComment = async (id, comm) => {
        try {
            await editComments(id, comm);
            setEditingCommentId('');
            const updatedTaskId = await getIdTask(taskId.task.id);
            setTaskId(updatedTaskId);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteComment = async (id) => {
        try {
            await deleteComments(id);
            const updatedTaskId = await getIdTask(taskId.task.id);
            setTaskId(updatedTaskId);
        } catch (e) {
            console.log(e);
        }
    };

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    const startTimer = () => {
        if (taskId.executors.find((executor) => executor.user_id === user?.data?.id)) {
            if (!timer.isRunning && timer.taskId === null || !timer.isRunning && timer.taskId === taskId.task.id || !timer.isRunning && timer.taskId !== taskId.task.id && timer.timerId === null) {
                const timerId = setInterval(() => {
                    setTimer((prevTimer) => ({
                        ...prevTimer,
                        time: prevTimer.time + 1,
                        taskId: taskId.task.id
                    }));
                }, 1000);

                setTimer((prevTimer) => ({
                    ...prevTimer,
                    isRunning: true,
                    timerId,
                    taskId: taskId.task.id,
                    taskName: taskId.task.name,
                    time: taskId.executors.find((executor) => executor.user_id === user?.data?.id)?.time_spent !== null ?
                            taskId.executors.find((executor) => executor.user_id === user?.data?.id)?.time_spent
                            : 0,
                    // time: prevTimer.time !== null ?
                    //     prevTimer.time :
                    //     taskId.executors.find((executor) => executor.user_id === user?.data?.id)?.time_spent !== null ?
                    //     taskId.executors.find((executor) => executor.user_id === user?.data?.id)?.time_spent
                    //     : 0,
                }));
            }else{
                alert('Таймер запущен у другой задачи')
            }
        }
    };


    const stopTimer = async() => {
        if (taskId.executors.find((executor) => executor.user_id === user?.data?.id)) {
            if (timer.isRunning && timer.taskId === taskId.task.id) {
                clearInterval(timer.timerId);
                setTimer((prevTimer) => ({
                    ...prevTimer,
                    isRunning: false,
                    taskId: taskId.task.id,
                    taskName: taskId.task.name,
                    time: prevTimer.time,
                }));
                try {
                    await timeSpent(taskId.task.id, timer.time);
                    const updatedTaskId = await getIdTask(taskId.task.id);
                    setTaskId(updatedTaskId);
                    setTimer((prevTimer) => ({
                        ...prevTimer,
                        time: 0,
                        isRunning: false,
                        timerId: null,
                        taskId: null,
                        taskName: '',
                    }));
                } catch (error) {
                    console.log(error)
                }
            }else{
                alert('Таймер запущен у другой задачи')
            }
        }
    };

    const handleCheckboxChange = async (stage) => {
        try {
            await editStages(stage);
            const updatedTaskId = await getIdTask(taskId.task.id);
            setTaskId(updatedTaskId);
        } catch (error) {
            console.log(error);
        }
    };

    const Delete = async () => {
        try {
            await deleteIdTask(taskId.task.id);
            setShowModal(false);
            const updatedTasks = await getAllTask(typeTask, projectId);
            setTasks(updatedTasks);
            // toast.success('Задача удалена!', {
            //     position: "top-right",
            //     autoClose: 1000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
        } catch (e) {
            console.log(e);
        }
    }

    const findTaskById = (tasks, taskId) => {
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if (task.id === taskId) {
                return task;
            }
            if (task.children && task.children.length > 0) {
                const foundTask = findTaskById(task.children, taskId);
                if (foundTask) {
                    return foundTask;
                }
            }
        }
        return null;
    }

    return (
        <div className={s.container}>
            <form className={s.form}>
                <div className={s.title}>
                    <Text width={"606px"} height={"36px"} fontSize={"20px"} fontWeight={"700"}
                          value={taskId.task && taskId.task.name} disabled/>
                    <span style={{padding: '0px 4px'}}>
                        Базовая задача:
                        <span>&nbsp;</span>
                        <span style={{textDecoration: 'underline'}}>
                        {taskId.task && taskId.task.parent_id !== null ?
                            findTaskById(tasks.tasks, taskId.task.parent_id)?.name :
                            parentName ?
                                '' :
                            "Отсутствует"}
                            {parentName && parentName}
                        </span>
                    </span>
                    <span style={{padding:'0px 4px'}}>
                        Статус:
                        <span>&nbsp;</span>
                        <span style={{textDecoration: 'underline'}}>
                        {taskId?.task?.status_id === 1? "В РАБОТУ" :
                            taskId?.task?.status_id === 2? "ВЫПОЛНЯЕТСЯ" :
                                taskId?.task?.status_id === 3? "ТЕСТИРОВАНИЕ" :
                                    taskId?.task?.status_id === 4? "ПРОВЕРКА" :
                                        taskId?.task?.status_id === 5? "ЗАВЕРШЕНА" :
                                            taskId?.task?.status_id === 6? "ПРОСРОЧЕНА" : ''
                        }
                        </span>
                    </span>
                </div>
                <div className={s.info}>
                    <div className={s.elements}>
                        <div className={s.project}>
                            <Select
                                label="Проект"
                                // icon={<Project/>}
                                options={projectList}
                                value={taskId.task && taskId.task.project_id}
                                disabled
                            />
                        </div>
                        <div className={s.element}>
                            <Select
                                label="Тег команды"
                                // icon={<Project/>}
                                options={internsList.teams}
                                value={taskId.task && taskId.task.team_id}
                                disabled
                            />
                        </div>
                    </div>
                    <div className={s.elements}>
                        <div className={`${s.element} ${s.deadlines}`}>
                            <span>Планируемые сроки выполнения</span>
                            <div className={s.elements}>
                                <InputDate1
                                    value={taskId.task && taskId.task.planned_start_date}
                                    disabled
                                    icon={<Clock/>}
                                />
                                <span style={{alignSelf: 'center'}}>-</span>
                                <InputDate1
                                    value={taskId.task && taskId.task.planned_final_date}
                                    disabled
                                    icon={<Clock/>}
                                />
                            </div>
                        </div>
                        <div className={s.element}>
                            <span>Дедлайн</span>
                            <InputDate1
                                value={taskId.task && taskId.task.deadline}
                                disabled
                                icon={<Clock/>}
                            />
                        </div>
                    </div>
                    <div className={s.description}>
                        <TextArea
                            value={taskId.task && taskId.task.description}
                            placeholder="Введите комментарий..."
                            width={"606px"}
                            height={"128px"}
                            disabled
                        />
                    </div>
                    <div className={s.important}>
                        <Select
                            label="Постановщик"
                            options={internsList.interns}
                            value={taskId.executors && taskId.executors[0]?.user_id}
                            disabled
                        />
                        {/*<Select*/}
                        {/*    label="Ответственный"*/}
                        {/*    icon={<Project/>}*/}
                        {/*    options={internsList.interns}*/}
                        {/*    value={taskId.executors && taskId.executors[1]?.user_id}*/}
                        {/*    disabled*/}
                        {/*/>*/}
                    </div>
                    {taskId.executors?.length > 1 &&
                        <>
                            <div className={s.unimportant}>
                                <div className={s.unimportantTop}>
                                    <span className={s.label}>Исполнители</span>
                                </div>
                                <div className={s.unimportantLists}>
                                    {taskId.executors &&
                                        taskId.executors.map((performer, index) => (
                                            performer?.role_id__name === "RESPONSIBLE" && (
                                                <div className={s.unimportantList} key={index}>
                                                    <Select
                                                        disabled
                                                        options={internsList.interns}
                                                        value={taskId.executors && taskId.executors[index]?.user_id}
                                                    />
                                                </div>
                                            )
                                        ))}
                                </div>
                            </div>
                        </>
                    }
                    {taskId.stages?.length === 0 ? null :
                        <div className={s.checklist}>
                            <div className={s.checklistTop}>
                                <span className={s.label}>Чек-лист</span>
                            </div>
                            <div className={s.checkLists}>
                                {taskId.stages && taskId.stages.map((stage, index) => (
                                    <div className={s.checkList} key={index}>
                                        <Right>
                                            <input type="checkbox"
                                                   checked={stage.is_ready}
                                                   onChange={() => handleCheckboxChange(stage)}
                                            />
                                        </Right>
                                        <Text
                                            width={"60%"}
                                            height={"21px"}
                                            padding={"10px"}
                                            value={stage.description}
                                            disabled/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <div className={s.time}>
                        <div className={s.timer}>
                            {taskId?.executors?.find((executor) => executor.user_id === user?.data?.id) &&
                                <>
                                    <span className={s.label}>Таймер</span>
                                    <div className={s.timerElements}>
                                        <div className={s.timeElements}>
                                            <div className={s.timeContainer}>
                                                <span className={s.timerIcon}><Timer/></span>
                                                <span
                                                    className={s.timeValue}>{ timer.taskId === id ? formatTime(timer.time) : formatTime(taskId.executors.find((executor) => executor.user_id === user?.data?.id)?.time_spent)}</span>
                                            </div>
                                            <div className={s.timerButtonsContainer}>
                                                <ButtonForm onClick={timer.isRunning ? stopTimer : startTimer} padding={'0 8px'}
                                                            width={'32px'}>
                                                    {timer.isRunning && timer.taskId === id ? <PauseTimerButton/> :
                                                        <StartTimerButton/>}
                                                </ButtonForm>
                                                {/*<ButtonForm onClick={saveTimer}>Сохранить</ButtonForm>*/}
                                                {/*<ButtonForm onClick={resetTimer} status='notActive'*/}
                                                {/*            padding={'0 8px'}><TrashTimerButton/></ButtonForm>*/}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className={s.timeSpent}>
                            <span className={s.label}>Затраченное время</span>
                            {taskId.executors && taskId.executors.map((val, index) => (
                                <div className={s.timeSpentElements} key={index}>
                                    <span>{val.time_spent !== null ? formatTime(val.time_spent) : "00:00:00"}</span>
                                    <Text
                                        width={"fit-content"}
                                        height={"32px"}
                                        padding={"4px 8px"}
                                        border={"1px solid #ccc"}
                                        background={"#FFFFFF"}
                                        value={`${val.user_id__last_name} ${val.user_id__first_name}`} disabled/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={s.buttons}>
                        {taskId?.executors?.find((executor) => executor.user_id === user?.data?.id)?.role_id__name === "AUTHOR" &&
                        <>
                            <ButtonForm
                                onClick={() => setFormType('edit')}>Редактировать</ButtonForm>
                        </>
                        }
                        {typeTask !== 'kanban' && internsList?.interns?.find((intern) => intern?.id_intern === user?.data?.id) &&
                            <>
                                <ButtonForm onClick={() => setFormType('create')}>Создать
                                    подзадачу</ButtonForm>
                            </>
                        }
                        {taskId?.executors?.find((executor) => executor.user_id === user?.data?.id)?.role_id__name === "AUTHOR" &&
                            <>
                                <ButtonForm status='deleteTask' onClick={Delete}>Удалить
                                    задачу</ButtonForm>
                            </>
                        }
                    </div>
                    <div className={s.comments}>
                        <div className={s.commentsInput}>
                            <span className={s.label}>Комментарии</span>
                            <div className={s.commentsInputElements}>
                                <TextArea
                                    value={comments}
                                    onChange={(event) => setComments(event.target.value)}
                                    placeholder="Введите комментарий..."
                                    height={"40px"}
                                />
                                <ButtonForm height={"40px"} onClick={addComments}>Отправить</ButtonForm>
                            </div>
                        </div>
                        <div className={s.commentsOutput}>
                            {taskId.comments &&
                                taskId.comments.map((comment, index) => (
                                    <div className={s.commentsOutputItem} key={index}>
                                        <div className={s.commentsOutputTitle}>
                                            <p className={s.commentsOutputName}>
                                                {comment.user_id__last_name} {comment.user_id__first_name}
                                            </p>
                                        </div>
                                        <div className={s.commentsOutputComment}>
                                            {editingCommentId === comment.id ? (
                                                <>
                                                    <TextArea
                                                        value={newComments}
                                                        onChange={(event) => setNewComments(event.target.value)}
                                                        height={'auto'}
                                                        width={'450px'}
                                                    />
                                                    <ButtonForm
                                                        height={'40px'}
                                                        width={'100px'}
                                                        onClick={() => editComment(comment.id, newComments)}
                                                    >
                                                        Сохранить
                                                    </ButtonForm>
                                                    <ButtonForm
                                                        height={'40px'}
                                                        width={'100px'}
                                                        onClick={() => setEditingCommentId(null)}
                                                    >
                                                        Отменить
                                                    </ButtonForm>
                                                </>
                                            ) : (
                                                <>
                                                    <TextArea
                                                        value={comment.message}
                                                        readOnly
                                                        height={'auto'}
                                                        width={'450px'}
                                                        disabled
                                                    />
                                                    {comment.user_id_id === user?.data?.id &&
                                                        <>
                                                            <ButtonForm
                                                                height={'40px'}
                                                                width={'100px'}
                                                                onClick={() => setEditingCommentId(comment.id)}
                                                            >
                                                                Изменить
                                                            </ButtonForm>
                                                            <ButtonForm
                                                                height={'40px'}
                                                                width={'100px'}
                                                                onClick={() => deleteComment(comment.id)}
                                                            >
                                                                Удалить
                                                            </ButtonForm>
                                                        </>
                                                    }
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
        ;
};

export default ViewForm;
