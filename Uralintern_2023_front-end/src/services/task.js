import api from "./api";
import {store} from "../redux/store";
import {setCredentials} from "../redux/authSlice";

export const refreshAccessToken = async () => {
    try {
        const response = await api.post(
            "/UralIntern/token/refresh/",
            { refresh: store.getState()?.auth?.refresh},
            {
                headers: {
                    Authorization: `Bearer ${store.getState()?.auth?.access}`
                }
            }
        );

        return store.dispatch(setCredentials(response.data));
    } catch (e) {
        console.log(e);
    }
};

export const getUserInfo = async() =>{
    try {
        const response = await api.get(`/scheduler/api/v1/user_projects`, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
        return response.data;
    }catch (e) {
        console.log(e);
    }
}


export const getUser = async(id) =>{
    try {
        const response = await api.get(`/UralIntern/user/${id}`, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
        return response.data;
    }catch (e) {
        console.log(e);
    }
}


export const getProjectInterns = async (id) =>{
    try {
        const response = await api.get(`/scheduler/api/v1/project_interns?project_id=${id}`, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


export const getAllTask = async (type, id) => {
    try {
        const response = await api.get(`/scheduler/api/v1/tasks?view_type=${type}&project_id=${id}`, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
};


export const createTask = async (task, stages, responsibleUsers) => {
    const createTask = {
        parent_id: task.parent || null,
        project_id: task.projectId,
        name: task.name,
        description: task.description,
        planned_start_date: task.startDate,
        planned_final_date: task.finalDate,
        deadline: task.deadline,
    };

    let stagesList = [];

    if (Array.isArray(stages)) {
        stagesList = stages.map((stage) => ({ description: stage }));
    }

    console.log(stagesList)

    const data = {
        task: createTask,
        task_stages: stagesList,
        responsible_users: responsibleUsers
    };

    try {
        await api.post('/scheduler/api/v1/tasks', data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        })
    } catch (e) {
        console.log(e);
    }
};


export const getIdTask = async (id) => {
    try {
        const response = await api.get(`/scheduler/api/v1/task/${id}`, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        })
        return response.data
    } catch (e) {
        console.log(e);
    }
}

export const updateIdTask = async (id, task) => {
    const data = {
        name: task.name,
        description: task.description,
        planned_start_date: task.startDate,
        planned_final_date: task.finalDate,
        deadline: task.deadline,
    };

    try {
        await api.put(`/scheduler/api/v1/task/${id}`, data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        })
    }catch (e){
        alert(`Задача не изменилась`);
    }
}

export const deleteIdTask = async (id) => {
    try {
        await api.delete(`/scheduler/api/v1/task/${id}`, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        })
    }catch (e){
        console.log(e);
    }
}

export const deleteCompletedTask = async (id) => {
    try {
        await api.delete(`/scheduler/api/v1/tasks/delete_completed?project_id=${id}`, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        })
    }catch (e){
        console.log(e);
    }
}

export const kanbanView = async (id) => {
    try {
        await api.put(`/scheduler/api/v1/task/${id}/is_on_kanban `, {}, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        })
    }catch (e){
        console.log(e);
    }
}


export const editDates = async (id, task) => {
    const data = {
        planned_start_date: task.planned_start_date,
        planned_final_date: task.planned_final_date
    };
    try {
        await api.put(`/scheduler/api/v1/task/${id}/dates`, data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
};

export const editStages = async(stage) => {
    const data = {
        description: stage.description,
        is_ready: !stage.is_ready,
    };
    try {
        await api.put(`/scheduler/api/v1/stage/${stage.id}`, data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export const editsStages = async(stage) => {
    const data = {
        description: stage.description,
        is_ready: stage.is_ready,
    };
    try {
        await api.put(`/scheduler/api/v1/stage/${stage.id}`, data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export const createStages = async(id, description) => {
    const data = {
        task_id: id,
        description: description,
    };
    try {
        await api.post(`/scheduler/api/v1/stage`, data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export const deleteStages = async(id) => {
    try {
        await api.delete(`/scheduler/api/v1/stage/${id}`, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}


export const timeSpent = async(id, time) => {
    const data = {
        time_spent: time
    };

    try {
        await api.put(`/scheduler/api/v1/task/${id}/save_timer`, data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export const editStatus = async(id, status) => {
    const data = {
        status: status
    };
    try {
        await api.put(`/scheduler/api/v1/task/${id}/status`, data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}


export const createComment = async(id, comment) => {
    const data = {
        task_id: id,
        message: comment
    };

    try {
        await api.post(`http://127.0.0.1:8000/scheduler/api/v1/comment`, data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export const editComments = async(id, comment) => {
    const data = {
        message: comment
    };
    try {
        await api.put(`http://127.0.0.1:8000/scheduler/api/v1/comment/${id}`, data, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}


export const deleteComments = async(id) => {
    try {
        await api.delete(`http://127.0.0.1:8000/scheduler/api/v1/comment/${id}`, {
            headers: {
                Authorization: `Bearer ${store.getState()?.auth?.access}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}
