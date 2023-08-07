import React from 'react';
import classes from "../css/Team.module.css"
function TeamInfo({project, title, tutor, team_chat}) {
    return (
        <div className={classes["team-info"]}>
        <h2>Команда "{title}"</h2>
        <p className={`${classes["info"]} ${classes["command"]}`}>Проект: <span>{project.title}</span></p>
        <p className={`${classes["info"]} ${classes["command"]}`}>Куратор: <span>{ `${tutor.last_name} ${tutor.first_name} ${tutor?.patronymic ?? ""}`}</span></p>
        {team_chat && <p className={`${classes["info"]} ${classes["command"]}`}>Командный чат: <span>{team_chat}</span></p>}
    </div>
    );
}

export default TeamInfo;