import React, { useState } from 'react';
import classes from "../css/project.module.css"
import { Link } from 'react-router-dom';
import EdtiTeam from './EdtiTeam';
import { useGetUserQuery } from '../../../redux/authApi';
function TeamProj({team, tutors, interns}) {
    const tutor = useGetUserQuery({id:team.id_tutor});

    const [open, setOpen] = useState(false);
    
    if(tutor.isLoading){
        return <div></div>
    }


    return (
        <li key={Date.now()} className={classes['command-info-person']}>
        <Link to={`/team/${team.id}`}  className={classes["team-head"]}>{team.title}</Link>
        <div className={classes["tutor-head"]}>{`${tutor.data.last_name} ${tutor.data.first_name} ${tutor.data?.patronymic ?? ""}`}</div>
        <div className={classes["pen"]}>
            <img className={classes["link-pen"]} src={require("../../../images/pen.svg").default} onClick={() => setOpen(true)}  width="16" height="16" alt="Карандаш"/>
        </div>
        {open && <EdtiTeam tutors={tutors} interns={interns} open={open} onClose={() => setOpen(false)} team={team}/>}
</li>
    );
}

export default TeamProj;