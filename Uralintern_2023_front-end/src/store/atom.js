import {atom} from "recoil";
import {store} from "../redux/store";

const { access } = store.getState().auth

export const token = atom({
    key: 'token',
    default: access
})

export const taskIdState = atom({
    key: 'taskIdState',
    default: []
})

export const tasksState = atom({
    key: 'tasksState',
    default: []
})

export const tasksKanbanState = atom({
    key: 'tasksState',
    default: []
})


export const projectsList = atom({
    key: 'usersList',
    default: null
})


export const teamsList = atom({
    key: 'usersList',
    default: []
})

export const timerState = atom({
    key: 'timerState',
    default: {
        time: 0,
        isRunning: false,
        timerId: null,
        taskId: null,
        taskName: '',
    },
});


export const commentsState = atom({
    key: 'commentsState',
    default: [],
});

export const projectInterns = atom({
    key: 'projectInterns',
    default: []
})


export const userState = atom({
    key: 'userState',
    default: null
})

export const projectsId = atom({
    key: 'projectId',
    default: 1
})

