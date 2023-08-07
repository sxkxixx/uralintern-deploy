import React from 'react';
import classes from '../css/TeamForTutor.module.css'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetFormForTeamQuery } from '../../../redux/authApi';

function TeamInfoForTutor({project, team_chat, title}) {
    const {teamId} = useParams();
    const {user} = useSelector(state => state.auth);
    const {data, isLoading} = useGetFormForTeamQuery({user_id:user.user_id, team_id:teamId});


    return (
        <div className={classes["team-info"]}>
            <h2>Команда "{title}"</h2>
            <p className={`${classes["info"]} ${classes["command"]}`}>Проект: <span>{project.title}</span></p>
            <p className={`${classes["info"]} ${classes["command"]}`}>Командный чат: <span>{team_chat}</span></p>
            <p className={`${classes["info"]} ${classes["command"]}`}>количество оценок за текущие этапы:
                <span>
                {isLoading ? "...": `${data.estimated} из ${data.total}`}
                </span>
            </p>
        </div>
    );
}

export default TeamInfoForTutor;