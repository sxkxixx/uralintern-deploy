import React from 'react';
import classes from "../css/project.module.css"
import TeamProj from './TeamProj';
function ListTeams({teams, tutors, interns}) {



    return (
        <div>
            <h2 className={classes["team-list"]}>Список команд:</h2>
            <div className={classes["table"]}>
                <ul className={classes["main-ul"]}>
                        <li id="head" className={classes['command-info-person-head']}>
                            <div className={classes["team-head"]}>Команда</div>
                            <div className={classes["tutor-head"]}>Куратор</div>
                            <div className={classes["link-pen"]}></div>
                        </li>
                        {teams.map(team => <TeamProj tutors={tutors} interns={interns} team={team}/>)}
                </ul>
            </div>
        </div>
    );
}

export default ListTeams;