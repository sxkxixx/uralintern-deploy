import React from 'react';
import classes from '../css/Team.module.css'
import TeamInfo from './TeamInfo';
import ListInterns from './ListInterns';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProjectQuery, useGetUserQuery } from '../../../redux/authApi';

function TeamCommon({team}) {
    const {teamId} = useParams();
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const tutor = useGetUserQuery({id:team.id_tutor});

    const project = useGetProjectQuery({id:team.id_project})

    if (project.isLoading || tutor.isLoading){
        return<div></div>
    }
    const flag = !!team.interns.map(intern => intern.id_intern).find((id) => id === user.user_id);
    return (
        <div className={classes["team"]}>
            <TeamInfo
                title={team.title} 
                team_chat={flag && team.team_chat}
                tutor={tutor.data}
                project={project.data}
            />
            <ListInterns interns={team.interns}/>
 { flag&&  <div className={classes["buttons"]}>
                <Link to={`/form/${teamId}`}><button className={classes["give-a-mark"]}>Оценка по этапам</button></Link>
                <Link to={`/report/${user.user_id}/${teamId}`}><button className={classes["get-report"]} >Моя статистика</button></Link>
            </div>}
        </div>
    );
}

export default TeamCommon;