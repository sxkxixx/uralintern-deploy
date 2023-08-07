import React from 'react';
import classes from '../css/TeamForTutor.module.css'
import TeamInfoForTutor from './TeamInfoForTutor';
import ListIntertsForTutor from './ListIntertsForTutor';
import { useNavigate } from 'react-router-dom';
import { useGetProjectQuery } from '../../../redux/authApi';

function TeamForTutor({team}) {
    const navigate = useNavigate();
    const project = useGetProjectQuery({id:team.id_project})

    if (project.isLoading){
        return<div></div>
    }


    return (
        <div className={classes["team"]}>
            <TeamInfoForTutor project={project.data} team_chat={team.team_chat} title={team.title}/>
        <div className={classes["command-info"]}>
            <ListIntertsForTutor interns={team.interns}/>
            <div className={classes["buttons"]}>
                <button className={classes["give-a-mark"]} onClick={() =>navigate(`/form/${team.id}`)} >Оценка по этапам</button>
                <button className={classes["get-stages"]} onClick={() =>navigate(`/stages/${team.id}`)} >Этапы</button>
            </div>           
        </div>
    </div>
    );
}

export default TeamForTutor;