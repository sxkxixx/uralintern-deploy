export const baseURL = "http://127.0.0.1:8000";
//http://studprzi.beget.tech
//http://127.0.0.1:8000

export const END_POINTS = {
    API: {
        GET_USER: "UralIntern/user/",
        GET_TEAMS: "UralIntern/get-user-teams/",
        GET_TEAM: "UralIntern/get-team/",
        CHANGE_INFO: "UralIntern/user-change/",
        GET_STAGE: "UralIntern/get-stages/",
        GET_ESTIMATIONS: "UralIntern/get-estimations/",
        ESTIMATE: "UralIntern/estimate/",
        GET_ESTIMATION: "UralIntern/get-estimation/",
        GET_FORMS: "UralIntern/get-forms/",
        CHANGE_IMAGE: "UralIntern/user-change-image/",
        GET_IMAGE: "/media/",
    },
    AUTH: {
        REGISTER: "/UralIntern/register/",
        LOGIN: "/UralIntern/token/",
        REFRESH: "/UralIntern/token/refresh/",
        LOGOUT: "#",
    },
};
